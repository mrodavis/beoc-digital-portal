"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { WinWindow } from "./types";
import { AppIcon, FileArt, G, kindForName } from "./icons";
import { Btn, Modal, Select, T, useWin, type SaveOpts } from "./ui";
import { TitleBar } from "./frame";
import { NOW, appInfo } from "./data";
import { HW_CATS, hardwareRows, net, printers, processes, specs, startupApps, userName } from "./model";
import { baseOf, extOf, getItem, isFolder, realPath, splitPath } from "./fs";

/* ------------------------------------------------------------------ */
/* Save As dialog                                                      */
/* ------------------------------------------------------------------ */

export function SaveDialog({ o }: { o: SaveOpts }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const places = doc.fs.filter((r) => r.root !== "gdrive");
  const [dir, setDir] = useState(getItem(doc, o.dir) ? realPath(doc, o.dir) : places[0]?.name ?? "");
  const [name, setName] = useState(o.name);
  const [type, setType] = useState(o.types?.[0] ?? "All files (*.*)");
  const items = (getItem(doc, dir)?.children ?? []).slice().sort((a, b) => (isFolder(a) === isFolder(b) ? a.name.localeCompare(b.name) : isFolder(a) ? -1 : 1));
  const ext = /\(\*(\.[a-z0-9]+)\)/i.exec(type)?.[1] ?? "";
  const save = () => {
    let n = name.trim();
    if (!n) return;
    if (ext && !extOf(n)) n += ext;
    ctx.modal(null);
    o.onSave(`${dir}/${n}`);
  };
  const segs = splitPath(dir);
  return (
    <Modal
      title={o.title ?? "Save as"}
      width={620}
      onClose={() => ctx.modal(null)}
      footer={
        <>
          <Btn primary label="Save" onClick={save}>Save</Btn>
          <Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn>
        </>
      }
    >
      <div className="mb-2 flex items-center gap-1 rounded px-2 py-1 text-[12px]" style={{ background: T.input, border: `1px solid ${T.line}` }}>
        <G n="up" s={13} />
        {segs.map((s, i) => (
          <span key={i} className="flex items-center gap-1">
            <G n="chevR" s={9} />
            <button type="button" aria-label={s} onClick={() => setDir(segs.slice(0, i + 1).join("/"))} className="rounded px-1 hover:bg-[var(--w-hover)]">{doc.fs.find((r) => r.name === s)?.label ?? s}</button>
          </span>
        ))}
      </div>
      <div className="mb-3 flex h-56 gap-2">
        <div className="w-36 shrink-0 overflow-auto">
          {places.map((r) => (
            <button key={r.name} type="button" aria-label={r.label ?? r.name} onClick={() => setDir(r.name)} className="flex h-7 w-full items-center gap-2 rounded px-2 text-left text-[12px] hover:bg-[var(--w-hover)]" style={{ background: segs[0] === r.name ? T.press : undefined }}>
              <FileArt kind={r.root === "drive" ? "drive" : r.root} s={14} /> <span className="truncate">{r.label ?? r.name}</span>
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-auto rounded" style={{ border: `1px solid ${T.line}`, background: T.panel }}>
          {items.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              onClick={() => (isFolder(c) ? undefined : setName(c.name))}
              onDoubleClick={() => isFolder(c) && setDir(`${dir}/${c.name}`)}
              className="flex h-7 w-full items-center gap-2 px-2 text-left text-[12px] hover:bg-[var(--w-hover)]"
              style={{ opacity: isFolder(c) || !ext || extOf(c.name) === ext ? 1 : 0.45 }}
            >
              <FileArt kind={kindForName(c.name, isFolder(c))} s={16} /> {c.name}
            </button>
          ))}
          {!items.length && <p className="p-3 text-[12px]" style={{ color: T.sub }}>No items match your search.</p>}
        </div>
      </div>
      <label className="mb-2 flex items-center gap-2 text-[12px]"><span className="w-24">File name:</span><input aria-label="File name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") save(); }} className="h-7 flex-1 rounded px-2 outline-none" style={{ background: T.input, border: `1px solid ${T.line}`, color: T.text }} /></label>
      {o.types && (
        <label className="flex items-center gap-2 text-[12px]"><span className="w-24">Save as type:</span>
          <select aria-label="Save as type" value={type} onChange={(e) => setType(e.target.value)} className="h-7 flex-1 rounded px-1" style={{ background: T.input, border: `1px solid ${T.line}`, color: T.text }}>
            {o.types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Notepad                                                             */
/* ------------------------------------------------------------------ */

export function NotepadApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const saved = w.file ? getItem(ctx.doc, w.file)?.text ?? w.text ?? "" : w.text ?? "";
  const [text, setText] = useState(saved);
  const [wrap, setWrap] = useState(true);
  const [pos, setPos] = useState({ ln: 1, col: 1 });
  const ta = useRef<HTMLTextAreaElement>(null);
  const key = `${w.file ?? ""}`;
  useEffect(() => {
    setText(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, saved]);
  const dirty = text !== saved;
  const name = w.file ? baseOf(w.file) : "Untitled";
  const doSave = (as: boolean) => {
    if (w.file && !as) {
      ctx.commit({ kind: "type", target: `notepad:${w.file}`, value: text });
      return;
    }
    const docs = ctx.doc.fs.find((r) => r.root === "documents")?.name ?? ctx.doc.fs[0]?.name ?? "";
    ctx.saveAs({ title: "Save as", dir: w.file ? w.file.split("/").slice(0, -1).join("/") : docs, name: w.file ? baseOf(w.file) : "*.txt", types: ["Text documents (*.txt)", "All files (*.*)"], onSave: (p) => ctx.commit({ kind: "type", target: `notepad:${p}`, value: text }) });
  };
  useEffect(() => {
    ctx.insertRef.current = (t: string) => {
      const el = ta.current;
      if (!el) return setText((x) => x + t);
      const s = el.selectionStart ?? text.length;
      const e = el.selectionEnd ?? text.length;
      setText(text.slice(0, s) + t + text.slice(e));
    };
    const handler = (e: React.KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key.toLowerCase() === "s") {
        doSave(e.shiftKey);
        return true;
      }
      return false;
    };
    ctx.keys.current[w.id] = handler;
    return () => {
      delete ctx.keys.current[w.id];
      ctx.insertRef.current = null;
    };
  });
  const menu = (e: React.MouseEvent, which: string) => {
    const items =
      which === "File"
        ? [
            { label: "New tab", onClick: () => ctx.cmd("notepad.new") },
            { label: "Save", shortcut: "Ctrl+S", onClick: () => doSave(false) },
            { label: "Save as", shortcut: "Ctrl+Shift+S", onClick: () => doSave(true) },
            { sep: true },
            { label: "Print", shortcut: "Ctrl+P", disabled: true },
            { sep: true },
            { label: "Close window", onClick: () => ctx.cmd("win.close", w.id) },
          ]
        : which === "Edit"
          ? [
              { label: "Undo", shortcut: "Ctrl+Z", onClick: () => document.execCommand("undo") },
              { sep: true },
              { label: "Cut", shortcut: "Ctrl+X", onClick: () => { ta.current?.focus(); document.execCommand("cut"); } },
              { label: "Copy", shortcut: "Ctrl+C", onClick: () => { const el = ta.current; if (el) ctx.addClip(text.slice(el.selectionStart, el.selectionEnd)); } },
              { label: "Paste", shortcut: "Ctrl+V", disabled: !ctx.clips.length, onClick: () => ctx.insertRef.current?.(ctx.clips[0] ?? "") },
              { sep: true },
              { label: "Select all", shortcut: "Ctrl+A", onClick: () => ta.current?.select() },
              { label: "Time/Date", shortcut: "F5", onClick: () => ctx.insertRef.current?.(`${NOW.time} ${NOW.date}`) },
            ]
          : [{ label: "Word wrap", check: wrap, onClick: () => setWrap((x) => !x) }, { label: "Status bar", check: true }];
    ctx.menu(e, items);
  };
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app="notepad">
        <div className="flex min-w-0 flex-1 items-end gap-1 pl-2">
          <div className="flex h-[34px] min-w-0 max-w-[260px] items-center gap-2 rounded-t-lg px-3 text-[12px]" style={{ background: T.panel }}>
            <AppIcon id="notepad" s={14} />
            <span className="truncate">{name}</span>
            {dirty && <span title="Unsaved changes" className="h-2 w-2 rounded-full" style={{ background: T.text }} />}
          </div>
          <button type="button" aria-label="New tab" onMouseDown={(e) => e.stopPropagation()} onClick={() => ctx.cmd("notepad.new")} className="mb-1.5 rounded p-1 hover:bg-[var(--w-hover)]"><G n="plus" s={13} /></button>
        </div>
      </TitleBar>
      <div className="flex h-8 shrink-0 items-center gap-1 px-2 text-[12px]" style={{ background: T.panel }}>
        {["File", "Edit", "View"].map((m) => (
          <button key={m} type="button" aria-label={m} onClick={(e) => menu(e, m)} className="rounded px-2.5 py-1 hover:bg-[var(--w-hover)]">{m}</button>
        ))}
      </div>
      <textarea
        ref={ta}
        aria-label="Text editor"
        value={text}
        spellCheck={false}
        onChange={(e) => setText(e.target.value)}
        onCopy={(e) => {
          const el = e.currentTarget;
          ctx.addClip(el.value.slice(el.selectionStart, el.selectionEnd));
        }}
        onCut={(e) => {
          const el = e.currentTarget;
          ctx.addClip(el.value.slice(el.selectionStart, el.selectionEnd));
        }}
        onKeyUp={(e) => {
          const el = e.currentTarget;
          const before = el.value.slice(0, el.selectionStart).split("\n");
          setPos({ ln: before.length, col: before[before.length - 1].length + 1 });
        }}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
            e.preventDefault();
            e.stopPropagation();
            doSave(e.shiftKey);
          } else if (e.key === "F5") {
            e.preventDefault();
            e.stopPropagation();
            ctx.insertRef.current?.(`${NOW.time} ${NOW.date}`);
          } else e.stopPropagation();
        }}
        className="min-h-0 flex-1 resize-none p-3 font-mono text-[13px] outline-none"
        style={{ background: T.panel, color: T.text, whiteSpace: wrap ? "pre-wrap" : "pre", borderTop: `1px solid ${T.line}` }}
      />
      <div className="flex h-6 shrink-0 items-center gap-6 px-3 text-[11px]" style={{ background: T.panel2, color: T.sub, borderTop: `1px solid ${T.line}` }}>
        <span>Ln {pos.ln}, Col {pos.col}</span>
        <span>{text.length} characters</span>
        <span className="flex-1" />
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Task Manager                                                        */
/* ------------------------------------------------------------------ */

function Spark({ seed, color, h = 120 }: { seed: number; color: string; h?: number }) {
  const pts = useMemo(() => {
    const out: number[] = [];
    let v = 20 + (seed % 30);
    for (let i = 0; i < 60; i++) {
      v = Math.max(3, Math.min(95, v + Math.sin(i * 0.7 + seed) * 6 + ((i * 7 + seed) % 5) - 2));
      out.push(v);
    }
    return out;
  }, [seed]);
  return (
    <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="w-full" style={{ height: h }} aria-hidden="true">
      {[25, 50, 75].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke={color} strokeOpacity=".15" />)}
      <polyline points={pts.map((v, i) => `${i * 10},${100 - v}`).join(" ")} fill={color} fillOpacity=".12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const TM_TABS: [string, string, string][] = [
  ["processes", "Processes", "grid"],
  ["performance", "Performance", "chart"],
  ["history", "App history", "history"],
  ["startup", "Startup apps", "power"],
  ["users", "Users", "people"],
  ["details", "Details", "details"],
  ["services", "Services", "gear"],
];

export function TaskMgrApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const tab = w.tm ?? "processes";
  const sp = specs(doc);
  const n = net(doc);
  const procs = processes(doc);
  const apps = procs.filter((p) => !p.background);
  const bg = procs.filter((p) => p.background);
  const selName = ctx.sel.startsWith("proc:") ? ctx.sel.slice(5) : ctx.sel.startsWith("startup:") ? ctx.sel.slice(8) : "";
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<{ col: "name" | "cpu" | "mem"; desc: boolean } | null>(null);
  const memMB = (m?: string) => {
    const x = parseFloat(m ?? "") || 0;
    return /GB/i.test(m ?? "") ? x * 1024 : x;
  };
  const sorted = <P extends { name: string; cpu?: string; mem?: string }>(list: P[]): P[] => {
    if (!sortBy) return list;
    const val = (p: P) => (sortBy.col === "name" ? 0 : sortBy.col === "cpu" ? parseFloat(p.cpu ?? "0") || 0 : memMB(p.mem));
    const out = list.slice().sort((a, b) => (sortBy.col === "name" ? a.name.localeCompare(b.name) : val(a) - val(b)));
    return sortBy.desc ? out.reverse() : out;
  };
  const sortHead = (col: "name" | "cpu" | "mem", label: string, cls: string) => (
    <button
      type="button"
      aria-label={`Sort by ${label}`}
      onClick={() => setSortBy((s) => (s && s.col === col ? { col, desc: !s.desc } : { col, desc: col !== "name" }))}
      className={`${cls} flex h-full items-center gap-1 hover:bg-[var(--w-hover)]`}
    >
      {label}
      {sortBy?.col === col && <G n={sortBy.desc ? "chevD" : "chevU"} s={9} />}
    </button>
  );
  useEffect(() => {
    ctx.keys.current[w.id] = (e) => {
      if (e.key === "Delete" && ctx.sel.startsWith("proc:")) {
        ctx.cmd("taskmgr.endTask");
        return true;
      }
      return false;
    };
    return () => {
      delete ctx.keys.current[w.id];
    };
  });
  const row = (p: { name: string; cpu?: string; mem?: string; status?: string; app?: string }) => {
    const key = `proc:${p.name}`;
    const selected = ctx.sel === key;
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return null;
    return (
      <div
        key={p.name}
        role="row"
        aria-selected={selected}
        aria-label={p.name}
        onMouseDown={() => ctx.select(key)}
        onDoubleClick={() => p.app && ctx.cmd("win.focus", p.app)}
        onContextMenu={(e) => {
          e.preventDefault();
          ctx.select(key);
          ctx.menu(e, [
            { label: "End task", icon: "cancel", onClick: () => ctx.cmd("taskmgr.endTask") },
            { label: "Efficiency mode", icon: "efficiency", disabled: true },
            { sep: true },
            { label: "Go to details", disabled: true },
            { label: "Open file location", disabled: true },
            { label: "Search online", disabled: true },
            { label: "Properties", disabled: true },
          ]);
        }}
        className="flex h-7 cursor-default items-center text-[12px]"
        style={{ background: selected ? T.sel : undefined }}
      >
        <span className="flex min-w-0 flex-[3] items-center gap-2 px-3">
          {p.app ? <AppIcon id={p.app} s={14} /> : <G n="app" s={14} />}
          <span className="truncate">{p.name}</span>
        </span>
        <span className="w-28 shrink-0 px-2 text-[11.5px]" style={{ color: p.status ? "#c42b1c" : T.sub }}>{p.status ?? ""}</span>
        <span className="w-16 shrink-0 px-2 text-right" style={{ background: p.status ? "rgba(196,43,28,0.1)" : "rgba(255,200,0,0.08)" }}>{p.cpu ?? "0%"}</span>
        <span className="w-24 shrink-0 px-2 text-right" style={{ background: "rgba(255,200,0,0.12)" }}>{p.mem ?? ""}</span>
        <span className="w-16 shrink-0 px-2 text-right" style={{ color: T.sub }}>0 MB/s</span>
        <span className="w-16 shrink-0 px-2 text-right" style={{ color: T.sub }}>0 Mbps</span>
      </div>
    );
  };
  const perfItems: [string, string, string, string][] = [
    ["cpu", "CPU", `${procs.some((p) => p.status) ? "38%" : "6%"}  ${sp.baseSpeed}`, "#1a8ad4"],
    ["memory", "Memory", `5.8/${sp.ram.split(" (")[0]} (36%)`, "#9b30b0"],
    ["disk", `Disk 0 (C:)`, `${sp.diskType}\n1%`, "#4caf50"],
    [n.type === "wifi" ? "wifi" : "ethernet", n.type === "wifi" ? "Wi-Fi" : "Ethernet", n.type === "wifi" ? `${n.ssid}\nS: 0 R: 8.0 Kbps` : "Ethernet\nS: 0 R: 16.0 Kbps", "#c27c0e"],
    ["gpu", "GPU 0", `${sp.gpu.replace(/^Intel\(R\) /, "Intel ")}\n2%`, "#3a7bd5"],
  ];
  const perf = w.perf ?? "cpu";
  const cur = perfItems.find((x) => x[0] === perf) ?? perfItems[0];
  const stat = (a: string, b: string) => (
    <div key={a} className="flex gap-3 text-[11.5px]"><span className="w-40" style={{ color: T.sub }}>{a}</span><span>{b}</span></div>
  );
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app="taskmgr">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-3 text-[12px]">
          <AppIcon id="taskmgr" s={16} />
          <span>Task Manager</span>
          <div className="mx-auto flex h-7 w-[320px] max-w-[45%] items-center gap-2 rounded px-2" style={{ background: T.input, border: `1px solid ${T.line}` }} onMouseDown={(e) => e.stopPropagation()}>
            <G n="search" s={13} />
            <input aria-label="Type a name, publisher, or PID to search" placeholder="Type a name, publisher, or PID to search" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 bg-transparent text-[12px] outline-none" style={{ color: T.text }} />
          </div>
        </div>
      </TitleBar>
      <div className="flex min-h-0 flex-1">
        <div className="flex w-[52px] shrink-0 flex-col items-center gap-1 py-2 lg:w-[170px] lg:items-stretch lg:px-2">
          {TM_TABS.map(([id, label, ic]) => (
            <button key={id} type="button" aria-label={label} title={label} onClick={() => ctx.cmd("taskmgr.tab", id)} className="relative flex h-9 items-center gap-3 rounded px-3 text-[12px] hover:bg-[var(--w-hover)]" style={{ background: tab === id ? T.press : undefined }}>
              {tab === id && <span className="absolute left-0 top-2.5 h-4 w-[3px] rounded" style={{ background: T.accent }} />}
              <G n={ic} s={16} />
              <span className="hidden lg:inline">{label}</span>
            </button>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col rounded-tl-lg" style={{ background: T.panel }}>
          {tab === "processes" && (
            <>
              <div className="flex h-12 shrink-0 items-center gap-2 px-4">
                <span className="flex-1 text-[15px] font-semibold">Processes</span>
                <Btn small label="Run new task"><G n="run" s={14} /> Run new task</Btn>
                <Btn small label="End task" disabled={!ctx.sel.startsWith("proc:")} onClick={() => ctx.cmd("taskmgr.endTask")}><G n="cancel" s={14} /> End task</Btn>
                <Btn small label="Efficiency mode" disabled><G n="efficiency" s={14} /> Efficiency mode</Btn>
              </div>
              <div className="flex h-8 shrink-0 items-center text-[11px]" style={{ color: T.sub, borderBottom: `1px solid ${T.line}` }}>
                {sortHead("name", "Name", "flex-[3] px-3 text-left")}<span className="w-28 px-2">Status</span>{sortHead("cpu", "CPU", "w-16 justify-end px-2")}{sortHead("mem", "Memory", "w-24 justify-end px-2")}<span className="w-16 px-2 text-right">Disk</span><span className="w-16 px-2 text-right">Network</span>
              </div>
              <div className="min-h-0 flex-1 overflow-auto">
                <div className="px-3 py-1.5 text-[12px] font-semibold">Apps ({apps.length})</div>
                {sorted(apps).map(row)}
                <div className="px-3 py-1.5 text-[12px] font-semibold">Background processes ({bg.length})</div>
                {sorted(bg).map(row)}
              </div>
            </>
          )}
          {tab === "performance" && (
            <div className="flex min-h-0 flex-1">
              <div className="w-48 shrink-0 overflow-auto p-2">
                {perfItems.map(([id, label, sub, color]) => (
                  <button key={id} type="button" aria-label={label} onClick={() => ctx.cmd("taskmgr.perf", id)} className="mb-1 flex w-full items-center gap-2 rounded p-2 text-left hover:bg-[var(--w-hover)]" style={{ background: perf === id ? T.sel : undefined }}>
                    <span className="h-9 w-12 shrink-0 overflow-hidden rounded border" style={{ borderColor: color }}><Spark seed={label.length * 7} color={color} h={34} /></span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-semibold">{label}</span>
                      <span className="block whitespace-pre-line text-[10.5px] leading-tight" style={{ color: T.sub }}>{sub}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="min-w-0 flex-1 overflow-auto p-4">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <span className="text-[22px] font-semibold">{cur[1]}</span>
                  <span className="truncate text-[13px]">{perf === "cpu" ? sp.processor.replace(/\s+/g, " ") : perf === "memory" ? sp.ram.split(" (")[0] : perf === "disk" ? sp.diskModel : perf === "gpu" ? sp.gpu : perf === "wifi" ? "Intel(R) Wi-Fi 6E AX211 160MHz" : "Intel(R) Ethernet Connection (17) I219-LM"}</span>
                </div>
                <div className="mb-3 rounded border p-1" style={{ borderColor: cur[3] }}><Spark seed={perf.length * 13} color={cur[3]} /></div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {perf === "cpu" && [stat("Utilization", procs.some((p) => p.status) ? "38%" : "6%"), stat("Speed", "3.42 GHz"), stat("Processes", String(140 + procs.length)), stat("Threads", "2,184"), stat("Up time", "0:01:39:02"), stat("Base speed", sp.baseSpeed), stat("Cores", sp.cores), stat("Logical processors", sp.logical), stat("Virtualization", "Enabled")]}
                  {perf === "memory" && [stat("In use", "5.8 GB"), stat("Available", "9.9 GB"), stat("Total", sp.ram.split(" (")[0]), stat("Speed", sp.memSpeed), stat("Slots used", sp.memSlots), stat("Form factor", "DIMM"), stat("Hardware reserved", "312 MB")]}
                  {perf === "disk" && [stat("Type", sp.diskType), stat("Capacity", sp.storage), stat("Formatted", sp.storage), stat("System disk", "Yes"), stat("Active time", "1%"), stat("Average response time", "0.4 ms"), stat("Read speed", "0 KB/s"), stat("Write speed", "48 KB/s")]}
                  {(perf === "ethernet" || perf === "wifi") && [stat("Adapter name", perf === "wifi" ? "Wi-Fi" : "Ethernet"), ...(perf === "wifi" ? [stat("SSID", n.ssid), stat("Signal strength", "Excellent")] : []), stat("Connection type", perf === "wifi" ? "802.11ax" : "Ethernet"), stat("IPv4 address", n.ip), stat("Link speed", perf === "wifi" ? "1.2 Gbps" : "1.0 Gbps"), stat("Send", "0 Kbps"), stat("Receive", "16.0 Kbps")]}
                  {perf === "gpu" && [stat("Utilization", "2%"), stat("Shared GPU memory", sp.gpuMemory), stat("Driver version", "31.0.101.5592"), stat("DirectX version", "12 (FL 12.1)"), stat("Physical location", "PCI bus 0, device 2, function 0")]}
                </div>
              </div>
            </div>
          )}
          {tab === "startup" && (
            <>
              <div className="flex h-12 shrink-0 items-center gap-2 px-4">
                <span className="flex-1 text-[15px] font-semibold">Startup apps</span>
                <Btn small label="Enable" disabled={!ctx.sel.startsWith("startup:")} onClick={() => ctx.cmd("startup.enable")}>Enable</Btn>
                <Btn small label="Disable" disabled={!ctx.sel.startsWith("startup:")} onClick={() => ctx.cmd("startup.disable")}>Disable</Btn>
              </div>
              <div className="px-4 pb-1 text-[11px]" style={{ color: T.sub }}>Last BIOS time: 4.1 seconds</div>
              <div className="flex h-8 shrink-0 items-center text-[11px]" style={{ color: T.sub, borderBottom: `1px solid ${T.line}` }}>
                <span className="flex-[3] px-4">Name</span><span className="flex-[2] px-2">Publisher</span><span className="w-24 px-2">Status</span><span className="w-28 px-2">Startup impact</span>
              </div>
              <div className="min-h-0 flex-1 overflow-auto">
                {startupApps(doc).map((a) => {
                  const key = `startup:${a.name}`;
                  const selected = ctx.sel === key;
                  return (
                    <div
                      key={a.name}
                      role="row"
                      aria-selected={selected}
                      aria-label={a.name}
                      onMouseDown={() => ctx.select(key)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        ctx.select(key);
                        ctx.menu(e, [{ label: a.on ? "Disable" : "Enable", onClick: () => ctx.cmd(a.on ? "startup.disable" : "startup.enable") }, { label: "Open file location", disabled: true }, { label: "Search online", disabled: true }, { label: "Properties", disabled: true }]);
                      }}
                      className="flex h-7 cursor-default items-center text-[12px]"
                      style={{ background: selected ? T.sel : undefined }}
                    >
                      <span className="flex min-w-0 flex-[3] items-center gap-2 px-4"><G n="app" s={14} /><span className="truncate">{a.name}</span></span>
                      <span className="flex-[2] truncate px-2" style={{ color: T.sub }}>{a.publisher}</span>
                      <span className="w-24 px-2">{a.on ? "Enabled" : "Disabled"}</span>
                      <span className="w-28 px-2" style={{ color: a.impact === "High" ? "#c42b1c" : T.sub }}>{a.impact ?? "Not measured"}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {tab === "history" && (
            <div className="overflow-auto p-4 text-[12px]">
              <div className="mb-3 text-[15px] font-semibold">App history</div>
              {["Microsoft Edge", "Outlook", "Microsoft Teams", "Word", "Excel"].map((a, i) => (
                <div key={a} className="flex h-7 items-center"><span className="flex-1">{a}</span><span className="w-32" style={{ color: T.sub }}>{`0:${(12 + i * 7) % 60}:${(i * 13) % 60}`.replace(/:(\d)$/, ":0$1")}</span><span className="w-24" style={{ color: T.sub }}>{(i + 1) * 14.2} MB</span></div>
              ))}
            </div>
          )}
          {tab === "users" && (
            <div className="p-4 text-[12px]">
              <div className="mb-3 text-[15px] font-semibold">Users</div>
              <div className="flex items-center gap-3"><G n="user" s={18} /> <span className="flex-1">{userName(doc)} ({apps.length})</span><span style={{ color: T.sub }}>Active</span></div>
            </div>
          )}
          {(tab === "details" || tab === "services") && (
            <div className="overflow-auto p-4 text-[12px]">
              <div className="mb-3 text-[15px] font-semibold">{tab === "details" ? "Details" : "Services"}</div>
              {(tab === "details" ? procs.map((p, i) => [`${p.name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 12)}.exe`, String(1000 + i * 412), p.status ? "Not responding" : "Running"]) : [["Spooler", "Print Spooler", "Running"], ["WinDefend", "Microsoft Defender Antivirus Service", "Running"], ["wuauserv", "Windows Update", "Running"], ["Dhcp", "DHCP Client", "Running"], ["Dnscache", "DNS Client", "Running"]]).map(([a, b, c]) => (
                <div key={`${a}${b}`} className="flex h-6 items-center gap-3"><span className="w-44 truncate">{a}</span><span className="flex-1 truncate" style={{ color: T.sub }}>{b}</span><span className="w-28">{c}</span></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Command Prompt                                                      */
/* ------------------------------------------------------------------ */

export function CmdApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const [line, setLine] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const inp = useRef<HTMLInputElement>(null);
  const prompt = `C:\\Users\\${userName(ctx.doc).split(" ")[0]}>`;
  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [w.out]);
  return (
    <div className="flex h-full flex-col bg-[#0c0c0c] text-[#cccccc]">
      <TitleBar app="cmd" bg="#202020" darkText>
        <div className="flex min-w-0 flex-1 items-end pl-2">
          <div className="flex h-[32px] items-center gap-2 rounded-t-md bg-[#0c0c0c] px-3 text-[12px] text-white">
            <AppIcon id="cmd" s={14} /> Command Prompt
          </div>
          <span className="mb-1.5 ml-1 rounded p-1 text-white"><G n="plus" s={13} /></span>
        </div>
      </TitleBar>
      <div ref={box} className="min-h-0 flex-1 overflow-auto p-2 font-mono text-[12.5px] leading-[1.35]" onClick={() => inp.current?.focus()}>
        {(w.out ?? []).map((l, i) => (
          <div key={i} className="whitespace-pre">{l || "\u00a0"}</div>
        ))}
        <div className="flex whitespace-pre">
          <span>{prompt}</span>
          <input
            ref={inp}
            autoFocus
            aria-label="Command line"
            value={line}
            spellCheck={false}
            onChange={(e) => setLine(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                const v = line;
                setLine("");
                setHi(-1);
                if (v.trim()) setHist((h) => [v, ...h].slice(0, 30));
                ctx.cmd("cmd.run", v);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const n = Math.min(hist.length - 1, hi + 1);
                if (n >= 0) {
                  setHi(n);
                  setLine(hist[n]);
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const n = hi - 1;
                setHi(Math.max(-1, n));
                setLine(n >= 0 ? hist[n] : "");
              }
            }}
            className="min-w-0 flex-1 bg-transparent font-mono text-[12.5px] text-[#cccccc] caret-[#cccccc] outline-none"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Snipping Tool                                                       */
/* ------------------------------------------------------------------ */

export function SnipApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const snip = ctx.doc.snip;
  const pics = ctx.doc.fs.find((r) => r.root === "pictures")?.name ?? "Pictures";
  const save = () =>
    ctx.saveAs({
      title: "Save As",
      dir: getItem(ctx.doc, `${pics}/Screenshots`) ? `${pics}/Screenshots` : pics,
      name: "Screenshot 2026-10-20 094112.png",
      types: ["PNG (*.png)", "JPG (*.jpg)", "GIF (*.gif)"],
      onSave: (p) => ctx.cmd("snip.save", p),
    });
  useEffect(() => {
    ctx.keys.current[w.id] = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        save();
        return true;
      }
      return false;
    };
    return () => {
      delete ctx.keys.current[w.id];
    };
  });
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app="snip" title="Snipping Tool" />
      <div className="flex h-11 shrink-0 items-center gap-1 px-3" style={{ borderBottom: `1px solid ${T.line}` }}>
        <Btn primary label="New snip" onClick={() => ctx.startSnip()}><G n="plus" s={14} /> New</Btn>
        <span className="mx-2 h-5 border-l" style={{ borderColor: T.line }} />
        <button type="button" aria-label="Save as" title="Save as (Ctrl+S)" disabled={!snip} onClick={save} className="rounded p-1.5 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="save" s={17} /></button>
        <button type="button" aria-label="Copy" title="Copy (Ctrl+C)" disabled={!snip} className="rounded p-1.5 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="copy" s={17} /></button>
        <button type="button" aria-label="Share" title="Share" disabled={!snip} className="rounded p-1.5 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="share" s={17} /></button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-6" style={{ background: T.panel2 }}>
        {snip ? (
          <div className="flex h-56 w-96 max-w-full flex-col overflow-hidden rounded shadow-lg" style={{ background: "#fff", border: "1px solid #ccc" }}>
            <div className="flex h-6 items-center bg-[#f3f3f3] px-2 text-[10.5px] text-[#333]">{snip.of}</div>
            <div className="flex flex-1 items-center justify-center text-[12px] text-[#666]">{snip.mode === "fullscreen" ? "Full-screen snip" : snip.mode === "window" ? `Window snip: ${snip.of}` : "Rectangle snip"}</div>
          </div>
        ) : (
          <p className="max-w-sm text-center text-[13px]" style={{ color: T.sub }}>Select New to start a screen snip. You can also press the Windows logo key + Shift + S.</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Print queue                                                         */
/* ------------------------------------------------------------------ */

export function PrintQueueApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const list = printers(ctx.doc);
  const p = list.find((x) => x.name === w.file) ?? list[0];
  if (!p) return null;
  const jobs = p.jobs ?? [];
  const selJob = ctx.sel.startsWith("job:") ? ctx.sel.slice(4) : "";
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app="printqueue" title="Print queue" />
      <div className="flex items-center gap-3 px-4 pb-2">
        <G n="printer" s={28} />
        <div className="flex-1">
          <div className="text-[15px] font-semibold">{p.name}</div>
          <div className="text-[12px]" style={{ color: p.paused ? "#c42b1c" : T.sub }}>{p.paused ? "Paused" : jobs.length ? `${jobs.length} document(s) in queue` : "Ready"}</div>
        </div>
        {p.paused ? <Btn label="Resume printing" onClick={() => ctx.cmd("printer.resume", p.name)}><G n="play" s={13} /> Resume</Btn> : <Btn label="Pause printing" onClick={() => ctx.cmd("printer.pause", p.name)}><G n="pause" s={13} /> Pause</Btn>}
        <Btn label="Cancel the selected document" disabled={!selJob} onClick={() => ctx.cmd("printer.cancel")}><G n="cancel" s={13} /> Cancel</Btn>
      </div>
      <div className="mx-4 mb-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-md" style={{ background: T.panel, border: `1px solid ${T.line}` }}>
        <div className="flex h-8 shrink-0 items-center text-[11px]" style={{ color: T.sub, borderBottom: `1px solid ${T.line}` }}>
          <span className="flex-[3] px-3">Document name</span><span className="w-28 px-2">Status</span><span className="w-28 px-2">Owner</span><span className="w-14 px-2">Pages</span><span className="w-20 px-2">Size</span><span className="w-20 px-2">Submitted</span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          {jobs.length === 0 && <p className="p-4 text-[12px]" style={{ color: T.sub }}>There are no documents in the queue.</p>}
          {jobs.map((j) => {
            const key = `job:${j.name}`;
            const selected = ctx.sel === key;
            return (
              <div
                key={j.name}
                role="row"
                aria-selected={selected}
                aria-label={j.name}
                onMouseDown={() => ctx.select(key)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  ctx.select(key);
                  ctx.menu(e, [
                    { label: "Pause", icon: "pause", disabled: true },
                    { label: "Resume", icon: "play", disabled: true },
                    { label: "Restart", icon: "refresh", onClick: () => ctx.cmd("printer.restartJob") },
                    { label: "Cancel", icon: "cancel", onClick: () => ctx.cmd("printer.cancel") },
                  ]);
                }}
                className="flex h-8 cursor-default items-center text-[12px]"
                style={{ background: selected ? T.sel : undefined }}
              >
                <span className="flex min-w-0 flex-[3] items-center gap-2 px-3"><FileArt kind={kindForName(j.name, false)} s={14} /><span className="truncate">{j.name}</span></span>
                <span className="w-28 px-2" style={{ color: /error|stuck|jam/i.test(j.status ?? "") ? "#c42b1c" : undefined }}>{p.paused ? "Paused" : j.status ?? "Printing"}</span>
                <span className="w-28 truncate px-2">{j.owner ?? userName(ctx.doc)}</span>
                <span className="w-14 px-2">{j.pages ?? 1}</span>
                <span className="w-20 px-2">{j.size ?? "120 KB"}</span>
                <span className="w-20 px-2">{j.submitted ?? "9:12 AM"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Office and other placeholder apps                                   */
/* ------------------------------------------------------------------ */

const OFFICE: Record<string, { color: string; doc: string; tabs: string[] }> = {
  word: { color: "#185abd", doc: "Document", tabs: ["File", "Home", "Insert", "Draw", "Design", "Layout", "References", "Mailings", "Review", "View", "Help"] },
  excel: { color: "#107c41", doc: "Workbook", tabs: ["File", "Home", "Insert", "Draw", "Page Layout", "Formulas", "Data", "Review", "View", "Help"] },
  powerpoint: { color: "#c43e1c", doc: "Presentation", tabs: ["File", "Home", "Insert", "Draw", "Design", "Transitions", "Animations", "Slide Show", "Review", "View"] },
};

function OfficePrint({ w, onClose }: { w: WinWindow; onClose: () => void }) {
  const ctx = useWin();
  const list = printers(ctx.doc).filter((p) => p.kind !== "scanner");
  const [printer, setPrinter] = useState((list.find((p) => p.default) ?? list[0])?.name ?? "");
  const [copies, setCopies] = useState("1");
  const name = w.file ? baseOf(w.file) : "Document1";
  return (
    <Modal
      title="Print"
      width={460}
      onClose={onClose}
      footer={
        <>
          <Btn primary label="Print" disabled={!printer} onClick={() => { onClose(); ctx.cmd("office.print", printer); }}><G n="print" s={14} /> Print</Btn>
          <Btn label="Cancel" onClick={onClose}>Cancel</Btn>
        </>
      }
    >
      <p className="mb-3 text-[12px]" style={{ color: T.sub }}>{name}</p>
      <label className="mb-3 flex items-center gap-3 text-[12px]">
        <span className="w-20">Copies:</span>
        <input aria-label="Copies" type="number" min={1} value={copies} onChange={(e) => setCopies(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-8 w-20 rounded px-2" style={{ background: T.input, border: `1px solid ${T.line}`, color: T.text }} />
      </label>
      <div className="mb-1 text-[13px] font-semibold">Printer</div>
      <div className="mb-3">
        <Select label="Printer" value={printer} options={list.map((p) => p.name)} onChange={setPrinter} width={380} fmt={(v) => `${v}${list.find((p) => p.name === v)?.default ? " (Default)" : ""}`} />
        <div className="mt-1 text-[11px]" style={{ color: T.sub }}>{list.find((p) => p.name === printer)?.paused ? "Paused" : "Ready"}</div>
      </div>
      <div className="mb-1 text-[13px] font-semibold">Settings</div>
      {["Print All Pages", "Print One Sided", "Collated", "Portrait Orientation", "Letter"].map((x) => (
        <div key={x} className="mb-1 flex h-8 items-center rounded px-3 text-[12px]" style={{ background: T.input, border: `1px solid ${T.line}` }}>{x}</div>
      ))}
    </Modal>
  );
}

export function OfficeApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const o = OFFICE[w.app];
  const it = w.file ? getItem(ctx.doc, w.file) : null;
  const name = w.file ? baseOf(w.file) : `${o.doc}1`;
  const frozen = processes(ctx.doc).some((p) => p.app === w.app && p.status);
  const save = () => {
    if (frozen) return;
    if (w.file) ctx.cmd("office.save", w.file);
  };
  const print = () => {
    if (frozen) return;
    ctx.modal(<OfficePrint w={w} onClose={() => ctx.modal(null)} />);
  };
  useEffect(() => {
    ctx.keys.current[w.id] = (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      const k = e.key.toLowerCase();
      if (ctrl && k === "s") {
        save();
        return true;
      }
      if (ctrl && k === "p") {
        print();
        return true;
      }
      return false;
    };
    return () => {
      delete ctx.keys.current[w.id];
    };
  });
  const fileMenu = (e: React.MouseEvent) =>
    ctx.menu(e, [
      { label: "Save", shortcut: "Ctrl+S", disabled: !w.file || frozen, onClick: save },
      { label: "Print", shortcut: "Ctrl+P", disabled: frozen, onClick: print },
      { sep: true },
      { label: "Close", onClick: () => ctx.cmd("win.close", w.id) },
    ]);
  const saved = ctx.doc.flags?.saved === w.file;
  return (
    <div className="relative flex h-full flex-col" style={{ background: "#f3f3f3" }}>
      {frozen && <div className="absolute inset-0 top-10 z-10 flex items-start justify-center bg-white/55 pt-10 text-[12px] text-[#333]"><span className="rounded bg-white px-3 py-2 shadow">{appInfo(w.app).name} is not responding. Wait a minute, or end the task in Task Manager.</span></div>}
      <TitleBar app={w.app} bg={o.color} darkText>
        <div className="flex min-w-0 flex-1 items-center gap-2 px-3 text-[12px] text-white">
          <AppIcon id={w.app} s={16} />
          <button type="button" aria-label="Save" title="Save (Ctrl+S)" onMouseDown={(e) => e.stopPropagation()} onClick={save} className="rounded p-1 hover:bg-white/20"><G n="save" s={14} /></button>
          <span className="truncate">{name}{saved ? " • Saved to this PC" : ""} - {appInfo(w.app).name}{frozen ? " (Not Responding)" : ""}</span>
        </div>
      </TitleBar>
      <div className="flex h-8 shrink-0 items-center gap-4 px-3 text-[12px] text-[#333]" style={{ background: "#f3f3f3" }}>
        {o.tabs.map((t, i) =>
          t === "File" ? (
            <button key={t} type="button" aria-label="File" onClick={fileMenu} className="rounded px-1 hover:bg-[#e1e1e1]">File</button>
          ) : (
            <span key={t} className={i === 1 ? "border-b-2 pb-1 font-semibold" : ""} style={{ borderColor: o.color }}>{t}</span>
          ),
        )}
      </div>
      <div className="h-16 shrink-0 border-b border-[#ddd] bg-[#fafafa]" />
      <div className="min-h-0 flex-1 overflow-auto bg-[#e6e6e6] p-6">
        {w.app === "excel" ? (
          <div className="mx-auto max-w-3xl bg-white text-[12px] text-black shadow">
            {Array.from({ length: 14 }).map((_, r) => (
              <div key={r} className="flex">
                {Array.from({ length: 8 }).map((__, c) => (
                  <div key={c} className="h-6 flex-1 border-b border-r border-[#e1e1e1] px-1">{r === 0 && c === 0 ? (it?.text?.split("\n")[0] ?? "") : ""}</div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto min-h-[420px] max-w-xl bg-white p-10 text-[13px] text-black shadow" style={w.app === "powerpoint" ? { aspectRatio: "16/9", minHeight: 0 } : undefined}>
            {(it?.text ?? "").split("\n").map((l, i) => <p key={i} className="mb-2">{l}</p>)}
            {!it?.text && w.file && [0, 1, 2, 3].map((i) => <div key={i} className="mb-2 h-2 rounded bg-[#e6e6e6]" style={{ width: `${88 - i * 9}%` }} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Device Manager                                                      */
/* ------------------------------------------------------------------ */

function DevProps({ row, onClose }: { row: { cat: string; name: string; problem?: string; manufacturer?: string; location?: string }; onClose: () => void }) {
  return (
    <Modal title={`${row.name} Properties`} width={420} onClose={onClose} footer={<><Btn primary label="OK" onClick={onClose}>OK</Btn><Btn label="Cancel" onClick={onClose}>Cancel</Btn></>}>
      <div className="mb-3 flex gap-4 border-b pb-1 text-[12px]" style={{ borderColor: T.line }}>
        {["General", "Driver", "Details", "Events"].map((t, i) => <span key={t} className={i === 0 ? "border-b-2 font-semibold" : ""} style={{ borderColor: T.accent, color: i ? T.sub : undefined }}>{t}</span>)}
      </div>
      <div className="mb-3 grid grid-cols-[110px_1fr] gap-y-1 text-[12px]">
        <span style={{ color: T.sub }}>Device type:</span><span>{row.cat}</span>
        <span style={{ color: T.sub }}>Manufacturer:</span><span>{row.manufacturer ?? "(Standard system devices)"}</span>
        <span style={{ color: T.sub }}>Location:</span><span>{row.location ?? "Port_#0001.Hub_#0001"}</span>
      </div>
      <div className="mb-1 text-[12px]">Device status</div>
      <div className="min-h-[64px] rounded p-2 text-[12px]" style={{ background: T.input, border: `1px solid ${T.line}` }}>{row.problem ?? "This device is working properly."}</div>
    </Modal>
  );
}

export function DeviceManagerApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const rows = hardwareRows(doc);
  const selName = ctx.sel.startsWith("dev:") ? ctx.sel.slice(4) : "";
  const selRow = rows.find((r) => r.name === selName);
  const cats = HW_CATS.filter((c) => rows.some((r) => r.cat === c));
  for (const r of rows) if (!cats.includes(r.cat)) cats.push(r.cat);
  const open = new Set([...(w.exp ?? []), ...rows.filter((r) => r.problem).map((r) => r.cat)]);
  const uninstall = (name: string) =>
    ctx.modal(
      <Modal
        title="Uninstall Device"
        width={420}
        onClose={() => ctx.modal(null)}
        footer={
          <>
            <Btn primary label="Uninstall" onClick={() => { ctx.modal(null); ctx.select(`dev:${name}`); ctx.cmd("devmgr.uninstall"); }}>Uninstall</Btn>
            <Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn>
          </>
        }
      >
        <div className="mb-2 font-semibold">{name}</div>
        <p>Warning: You are about to uninstall this device from your system.</p>
      </Modal>,
    );
  const devItems = (name: string | null) => [
    { label: "Update driver", disabled: true },
    { label: "Disable device", disabled: true },
    { label: "Uninstall device", disabled: !name, onClick: () => name && uninstall(name) },
    { sep: true },
    { label: "Scan for hardware changes", onClick: () => ctx.cmd("devmgr.scan") },
    { sep: true },
    { label: "Properties", disabled: !name, onClick: () => { const r = rows.find((x) => x.name === name); if (r) ctx.modal(<DevProps row={r} onClose={() => ctx.modal(null)} />); } },
  ];
  const menuAt = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return { clientX: r.left, clientY: r.bottom + 2 };
  };
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app="devmgmt" title="Device Manager" />
      <div className="flex h-7 shrink-0 items-center gap-1 px-2 text-[12px]" style={{ background: T.panel }}>
        <button type="button" aria-label="File" onClick={(e) => ctx.menu(menuAt(e), [{ label: "Options", disabled: true }, { label: "Exit", onClick: () => ctx.cmd("win.close", w.id) }])} className="rounded px-2 py-0.5 hover:bg-[var(--w-hover)]">File</button>
        <button type="button" aria-label="Action" onClick={(e) => ctx.menu(menuAt(e), devItems(selRow ? selRow.name : null))} className="rounded px-2 py-0.5 hover:bg-[var(--w-hover)]">Action</button>
        <button type="button" aria-label="View" onClick={(e) => ctx.menu(menuAt(e), [{ label: "Devices by type", dot: true }, { label: "Devices by connection", disabled: true }, { label: "Show hidden devices", disabled: true }])} className="rounded px-2 py-0.5 hover:bg-[var(--w-hover)]">View</button>
        <button type="button" aria-label="Help" className="rounded px-2 py-0.5 hover:bg-[var(--w-hover)]">Help</button>
      </div>
      <div className="flex h-8 shrink-0 items-center gap-1 px-2" style={{ background: T.panel, borderBottom: `1px solid ${T.line}` }}>
        <button type="button" aria-label="Properties" title="Properties" disabled={!selRow} onClick={() => selRow && ctx.modal(<DevProps row={selRow} onClose={() => ctx.modal(null)} />)} className="rounded p-1 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="properties" s={15} /></button>
        <button type="button" aria-label="Scan for hardware changes" title="Scan for hardware changes" onClick={() => ctx.cmd("devmgr.scan")} className="rounded p-1 hover:bg-[var(--w-hover)]"><G n="search" s={15} /></button>
        <button type="button" aria-label="Uninstall device" title="Uninstall device" disabled={!selRow} onClick={() => selRow && uninstall(selRow.name)} className="rounded p-1 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="close" s={13} /></button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-2 text-[12px]" style={{ background: T.panel }} role="tree" aria-label="Devices">
        <div className="flex h-6 items-center gap-1.5 px-1"><G n="chevD" s={9} /><G n="monitor" s={14} /> {specs(doc).deviceName}</div>
        {cats.map((c) => {
          const isOpen = open.has(c);
          const list = rows.filter((r) => r.cat === c);
          return (
            <div key={c}>
              <div role="treeitem" aria-label={c} aria-expanded={isOpen} onClick={() => ctx.cmd("devmgr.view", c)} className="flex h-6 cursor-default items-center gap-1.5 rounded pl-5 pr-2 hover:bg-[var(--w-hover)]">
                <G n={isOpen ? "chevD" : "chevR"} s={9} />
                <G n={/keyboard/i.test(c) ? "keyboard" : /mice/i.test(c) ? "mouse" : /monitor|display/i.test(c) ? "monitor" : /print/i.test(c) ? "printer" : /network/i.test(c) ? "ethernet" : /disk|storage/i.test(c) ? "disk" : /audio|sound/i.test(c) ? "volume" : /bluetooth/i.test(c) ? "bluetooth" : /universal serial/i.test(c) ? "usb" : "chip"} s={14} />
                <span>{c}</span>
              </div>
              {isOpen &&
                list.map((r, i) => {
                  const key = `dev:${r.name}`;
                  const selected = ctx.sel === key;
                  return (
                    <div
                      key={`${r.name}-${i}`}
                      role="treeitem"
                      aria-label={r.problem ? `${r.name} (problem)` : r.name}
                      aria-selected={selected}
                      onMouseDown={() => ctx.select(key)}
                      onDoubleClick={() => ctx.modal(<DevProps row={r} onClose={() => ctx.modal(null)} />)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        ctx.select(key);
                        ctx.menu(e, devItems(r.name));
                      }}
                      className="flex h-6 cursor-default items-center gap-1.5 rounded pl-12 pr-2"
                      style={{ background: selected ? T.sel : undefined }}
                    >
                      <span className="relative">
                        <G n={/keyboard/i.test(c) ? "keyboard" : /mice/i.test(c) ? "mouse" : /monitor|display/i.test(c) ? "monitor" : /print/i.test(c) ? "printer" : "chip"} s={14} />
                        {r.problem && <span title={r.problem} className="absolute -bottom-1 -right-1 flex h-[10px] w-[10px] items-center justify-center rounded-sm text-[8px] font-bold leading-none" style={{ background: "#f7c500", color: "#000" }}>!</span>}
                      </span>
                      <span className="truncate">{r.name}</span>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <div className="flex h-6 shrink-0 items-center px-3 text-[11px]" style={{ background: T.panel2, color: T.sub, borderTop: `1px solid ${T.line}` }}>
        {selRow?.problem ? selRow.problem : ""}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scan (Windows Scan app)                                             */
/* ------------------------------------------------------------------ */

export function ScanApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const scanners = printers(doc).filter((p) => p.kind === "scanner" || p.kind === "mfp").map((p) => p.name);
  const [scanner, setScanner] = useState(scanners[0] ?? "");
  const [source, setSource] = useState("Auto-configured");
  const [type, setType] = useState("JPEG");
  const [more, setMore] = useState(false);
  const [done, setDone] = useState(false);
  const last = String(doc.flags?.lastScan ?? "");
  const lastN = useRef(last);
  useEffect(() => {
    if (last && last !== lastN.current) setDone(true);
    lastN.current = last;
  }, [last]);
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app="scan" title="Scan" />
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 items-center justify-center p-6" style={{ background: T.panel2 }}>
          {done && last ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-48 w-36 items-center justify-center rounded bg-white text-[11px] text-[#555] shadow">{baseOf(last)}</div>
              <p className="text-[12px]">The scanned file was saved to the Scans folder.</p>
              <div className="flex gap-2">
                <Btn primary label="View" onClick={() => { setDone(false); ctx.cmd("scan.view"); }}>View</Btn>
                <Btn label="Close" onClick={() => setDone(false)}>Close</Btn>
              </div>
            </div>
          ) : (
            <div className="flex h-56 w-44 items-center justify-center rounded border border-dashed text-[12px]" style={{ borderColor: T.line, color: T.sub }}>Place the item on the scanner</div>
          )}
        </div>
        <div className="flex w-[260px] shrink-0 flex-col gap-3 overflow-auto p-4 text-[12px]" style={{ background: T.panel, borderLeft: `1px solid ${T.line}` }}>
          <div className="text-[18px] font-semibold">Scan</div>
          {scanners.length === 0 ? (
            <p style={{ color: T.sub }}>No scanners were detected. Make sure your scanner is turned on and connected.</p>
          ) : (
            <>
              <div><div className="mb-1">Scanner</div><Select label="Scanner" value={scanner} options={scanners} onChange={setScanner} width={220} /></div>
              <div><div className="mb-1">Source</div><Select label="Source" value={source} options={["Auto-configured", "Flatbed", "Feeder"]} onChange={setSource} width={220} /></div>
              <div><div className="mb-1">File type</div><Select label="File type" value={type} options={["JPEG", "PNG", "TIFF", "Bitmap"]} onChange={setType} width={220} /></div>
              {!more ? (
                <button type="button" aria-label="Show more" onClick={() => setMore(true)} className="self-start hover:underline" style={{ color: T.accent }}>Show more</button>
              ) : (
                <div>
                  <div className="mb-1">Save file to</div>
                  <span style={{ color: T.accent }}>Scans</span>
                  <button type="button" aria-label="Show less" onClick={() => setMore(false)} className="mt-2 block hover:underline" style={{ color: T.accent }}>Show less</button>
                </div>
              )}
              <span className="flex-1" />
              <Btn primary label="Scan" disabled={!scanner} onClick={() => ctx.cmd("scan.run", `${scanner}|${source}|${type}`)}>Scan</Btn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function OutlookApp() {
  const msgs = [
    ["IT Help Desk", "Reminder: lock your screen when you step away", "9:12 AM"],
    ["Office Manager", "Staff meeting moved to 2:00 PM", "8:47 AM"],
    ["Microsoft 365", "Your weekly digest", "Yesterday"],
  ];
  return (
    <div className="flex h-full flex-col bg-white text-[#1b1b1b]">
      <TitleBar app="outlook" bg="#0f6cbd" darkText>
        <div className="flex min-w-0 flex-1 items-center gap-2 px-3 text-[12px] text-white"><AppIcon id="outlook" s={16} /> Inbox - Outlook</div>
      </TitleBar>
      <div className="flex min-h-0 flex-1 text-[12px]">
        <div className="w-40 shrink-0 bg-[#f3f2f1] p-2">{["Inbox", "Drafts", "Sent Items", "Deleted Items", "Archive"].map((f) => <div key={f} className="rounded px-2 py-1.5">{f}</div>)}</div>
        <div className="w-72 shrink-0 border-r border-[#eee]">{msgs.map(([a, b, c]) => <div key={b} className="border-b border-[#eee] p-2"><div className="flex justify-between font-semibold"><span>{a}</span><span className="font-normal text-[#666]">{c}</span></div><div className="truncate">{b}</div></div>)}</div>
        <div className="flex-1 p-4 text-[#666]">Select an item to read</div>
      </div>
    </div>
  );
}

export function TeamsApp() {
  return (
    <div className="flex h-full flex-col bg-[#f5f5f5] text-[#1b1b1b]">
      <TitleBar app="teams" bg="#ebebeb" title="Chat | Microsoft Teams" />
      <div className="flex min-h-0 flex-1 text-[12px]">
        <div className="w-14 shrink-0 bg-[#ebebeb]" />
        <div className="w-64 shrink-0 border-r border-[#e0e0e0] bg-white p-2">{["Office Team", "Front Desk", "IT Help Desk"].map((c) => <div key={c} className="rounded px-2 py-2 hover:bg-[#f0f0f0]">{c}</div>)}</div>
        <div className="flex flex-1 items-center justify-center text-[#666]">Select a chat to start messaging</div>
      </div>
    </div>
  );
}

export function CalculatorApp() {
  const [disp, setDisp] = useState("0");
  const [acc, setAcc] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);
  const press = (k: string) => {
    if (/^\d$/.test(k) || k === ".") {
      setDisp((d) => (fresh || d === "0" ? (k === "." ? "0." : k) : d + k));
      setFresh(false);
      return;
    }
    if (k === "C") {
      setDisp("0");
      setAcc(null);
      setOp(null);
      setFresh(true);
      return;
    }
    const cur = Number(disp);
    const calc = (a: number, b: number, o: string) => (o === "+" ? a + b : o === "−" ? a - b : o === "×" ? a * b : b === 0 ? NaN : a / b);
    if (k === "=") {
      if (acc !== null && op) setDisp(String(Number(calc(acc, cur, op).toFixed(10))));
      setAcc(null);
      setOp(null);
      setFresh(true);
      return;
    }
    setAcc(acc !== null && op && !fresh ? calc(acc, cur, op) : cur);
    setOp(k);
    setFresh(true);
  };
  return (
    <div className="flex h-full flex-col" style={{ background: "#202020", color: "#fff" }}>
      <TitleBar app="calculator" title="Calculator" bg="#202020" darkText />
      <div className="px-4 text-[12px] opacity-70">Standard</div>
      <div className="truncate px-4 py-3 text-right text-[40px] font-semibold">{disp}</div>
      <div className="grid flex-1 grid-cols-4 gap-1 p-1">
        {["C", "÷", "×", "−", "7", "8", "9", "+", "4", "5", "6", "=", "1", "2", "3", ".", "0"].map((k) => (
          <button key={k} type="button" aria-label={k} onClick={() => press(k)} className={`rounded text-[16px] ${k === "=" ? "bg-[#4cc2ff] text-black" : /\d|\./.test(k) ? "bg-[#3b3b3b]" : "bg-[#323232]"} hover:brightness-110 ${k === "0" ? "col-span-2" : ""}`}>{k}</button>
        ))}
      </div>
    </div>
  );
}

export function GenericApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const it = w.file ? getItem(ctx.doc, w.file) : null;
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app={w.app} title={it ? `${it.name} - ${appInfo(w.app).name}` : appInfo(w.app).name} />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 p-6 text-center" style={{ background: w.app === "photos" ? "#1c1c1c" : T.panel2, color: w.app === "photos" ? "#ddd" : T.text }}>
        {w.app === "photos" && it ? (
          <div className="flex h-48 w-72 items-center justify-center rounded bg-gradient-to-br from-[#5b8def] to-[#2f5fc4] text-[13px] text-white">{it.name}</div>
        ) : (
          <>
            <AppIcon id={w.app} s={48} />
            <div className="text-[16px] font-semibold">{appInfo(w.app).name}</div>
            <p className="max-w-sm text-[12px]" style={{ color: T.sub }}>This app is open. Switch back to your task when you are ready.</p>
          </>
        )}
      </div>
    </div>
  );
}

