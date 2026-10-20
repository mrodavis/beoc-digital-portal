"use client";

import { useEffect, useRef, useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { AccessDoc } from "./types";
import { findModule } from "./data";
import { prettyVba, procedures, runnableSubs } from "./vba";
import { AccIcon } from "./icons";
import { Btn, Win, ListBox, Check } from "./ui";
import { Icon } from "../../chrome/icons";

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });

export function Vbe({ doc, dbName, onCommit }: { doc: AccessDoc; dbName: string; onCommit: (c: SimCommit) => void }) {
  const vbe = doc.vbe!;
  const mod = findModule(doc, vbe.module ?? "") ?? doc.modules[0];
  const [text, setText] = useState(mod?.code ?? "");
  const [macros, setMacros] = useState<string[] | null>(null);
  const [pickMacro, setPickMacro] = useState<string | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const [options, setOptions] = useState<{ require: boolean } | null>(null);
  const [imm, setImm] = useState("");
  const ta = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const judged = useRef<Record<string, string>>({});
  const lastSent = useRef(mod?.code ?? "");
  const modName = mod?.name ?? "";

  useEffect(() => {
    setText(mod?.code ?? "");
    lastSent.current = mod?.code ?? "";
    if (mod && judged.current[mod.name] === undefined) judged.current[mod.name] = prettyVba(mod.code);
  }, [modName]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (mod && mod.code !== lastSent.current && mod.code !== text) {
      setText(mod.code);
      lastSent.current = mod.code;
    }
  }, [mod?.code]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const flush = (v = text) => {
    if (timer.current) clearTimeout(timer.current);
    if (mod && v !== lastSent.current) {
      lastSent.current = v;
      onCommit(cmd("vba.edit", v));
    }
  };
  /** Code is judged when it is saved, run, or the editor is closed. */
  const judge = () => {
    // Like the real editor, tidy spacing and keyword case before the code is checked.
    const pretty = prettyVba(text);
    if (pretty !== text) setText(pretty);
    flush(pretty);
    if (mod && judged.current[mod.name] !== pretty) {
      judged.current[mod.name] = pretty;
      onCommit({ kind: "type", target: `vba:${mod.name}`, value: pretty });
    }
  };
  const procAtCursor = (): string | null => {
    const pos = ta.current?.selectionStart ?? 0;
    const line = text.slice(0, pos).split("\n").length;
    const lines = text.replace(/\r/g, "").split("\n");
    let cur: string | null = null;
    for (let i = 0; i < lines.length; i++) {
      const m = /^\s*(?:(?:public|private)\s+)?sub\s+(\w+)\s*\(\s*\)/i.exec(lines[i]);
      if (m && i + 1 <= line) cur = m[1];
      if (/^\s*end\s+sub\b/i.test(lines[i]) && i + 1 < line) cur = null;
    }
    return cur;
  };
  const run = () => {
    judge();
    const p = procAtCursor();
    if (p) onCommit(cmd("vba.run", p));
    else {
      setMacros(runnableSubs(text));
      setPickMacro(runnableSubs(text)[0] ?? null);
    }
  };
  const save = () => {
    judge();
    onCommit(cmd("file.save"));
  };
  const close = () => {
    judge();
    onCommit(cmd("vba.close"));
  };
  const procs = procedures(text).map((p) => p.name);
  const classMods = doc.modules.filter((m) => m.kind === "class");
  const stdMods = doc.modules.filter((m) => m.kind !== "class");

  const MENUS: Record<string, { label: string; onPick: () => void; shortcut?: string }[]> = {
    File: [{ label: "Save", onPick: save, shortcut: "Ctrl+S" }, { label: "Close and Return to Microsoft Access", onPick: close, shortcut: "Alt+Q" }],
    Insert: [{ label: "Module", onPick: () => { judge(); onCommit(cmd("create.module")); } }, { label: "Procedure...", onPick: () => { const v = `${text.replace(/\s*$/, "\n\n")}Public Sub NewProcedure()\n\nEnd Sub\n`; setText(v); flush(v); } }],
    Debug: [{ label: "Compile Database", onPick: () => judge() }],
    Run: [{ label: "Run Sub/UserForm", onPick: run, shortcut: "F5" }, { label: "Reset", onPick: () => undefined }],
    Tools: [{ label: "Options...", onPick: () => setOptions({ require: Boolean(doc.flags?.requireDeclaration) }) }],
    View: [{ label: "Microsoft Access", onPick: close, shortcut: "Alt+F11" }, { label: "Immediate Window", onPick: () => onCommit(cmd("vba.immediateToggle")), shortcut: "Ctrl+G" }],
  };

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col bg-[#f0f0f0] text-[12px] text-gray-900"
      onKeyDown={(e) => {
        const k = e.key.toLowerCase();
        if (e.key === "F5") { e.preventDefault(); e.stopPropagation(); run(); }
        else if ((e.ctrlKey || e.metaKey) && k === "s") { e.preventDefault(); e.stopPropagation(); save(); }
        else if (e.altKey && e.key === "F11") { e.preventDefault(); e.stopPropagation(); close(); }
        else if ((e.ctrlKey || e.metaKey) && k === "g") { e.preventDefault(); e.stopPropagation(); onCommit(cmd("vba.immediateToggle")); }
      }}
      aria-label="Microsoft Visual Basic for Applications"
    >
      {/* Menu bar */}
      <div className="relative flex h-6 shrink-0 items-center gap-0.5 border-b border-[#d6d6d6] bg-[#f6f6f6] px-1">
        {["File", "Edit", "View", "Insert", "Format", "Debug", "Run", "Tools", "Add-Ins", "Window", "Help"].map((m) => (
          <div key={m} className="relative">
            <button type="button" onClick={() => setMenu(menu === m ? null : m)} className={`px-2 py-[1px] hover:bg-[#cce4f7] ${menu === m ? "bg-[#cce4f7]" : ""}`}>{m}</button>
            {menu === m && MENUS[m] && (
              <div className="absolute left-0 top-full z-40 w-64 border border-gray-400 bg-white py-1 shadow-lg">
                {MENUS[m].map((it) => (
                  <button key={it.label} type="button" onClick={() => { setMenu(null); it.onPick(); }} className="flex w-full justify-between px-3 py-[2px] text-left hover:bg-[#e5f1fb]">
                    <span>{it.label}</span>
                    {it.shortcut && <span className="text-gray-500">{it.shortcut}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Toolbar */}
      <div className="flex h-7 shrink-0 items-center gap-1 border-b border-[#d6d6d6] bg-[#f6f6f6] px-1">
        <button type="button" title="View Microsoft Access (Alt+F11)" aria-label="View Microsoft Access" onClick={close} className="p-1 hover:bg-[#cce4f7]"><AccIcon name="accdb" size={15} /></button>
        <button type="button" title="Insert Module" aria-label="Insert Module" onClick={() => { judge(); onCommit(cmd("create.module")); }} className="p-1 hover:bg-[#cce4f7]"><AccIcon name="module" size={15} /></button>
        <button type="button" title="Save (Ctrl+S)" aria-label="Save" onClick={save} className="p-1 hover:bg-[#cce4f7]"><Icon name="save" size={15} /></button>
        <span className="mx-1 h-4 w-px bg-gray-300" />
        <button type="button" title="Run Sub/UserForm (F5)" aria-label="Run Sub/UserForm" onClick={run} className="p-1 hover:bg-[#cce4f7]"><AccIcon name="run" size={15} /></button>
        <button type="button" title="Break" aria-label="Break" className="p-1 hover:bg-[#cce4f7]"><AccIcon name="pause" size={15} /></button>
        <button type="button" title="Reset" aria-label="Reset" className="p-1 hover:bg-[#cce4f7]"><AccIcon name="stop" size={15} /></button>
        <span className="flex-1" />
        <span className="pr-2 text-[11px] text-gray-600">Ctrl+S saves your code. F5 runs the Sub the cursor is in.</span>
      </div>
      <div className="flex min-h-0 flex-1">
        {/* Project Explorer + Properties */}
        <div className="flex w-[210px] shrink-0 flex-col border-r border-[#c6c6c6]">
          <div className="bg-[#dfe6f0] px-2 py-0.5 text-[11px] font-semibold">Project - {dbName}</div>
          <div className="min-h-0 flex-1 overflow-auto bg-white p-1 text-[12px]">
            <div className="flex items-center gap-1"><AccIcon name="accdb" size={12} /> {dbName} ({dbName})</div>
            <div className="ml-3 mt-0.5 flex items-center gap-1"><AccIcon name="folderOpen" size={12} /> Microsoft Access Class Objects</div>
            {classMods.map((m) => (
              <button key={m.name} type="button" onDoubleClick={() => { judge(); onCommit(cmd("vba.module", m.name)); }} onClick={() => { judge(); onCommit(cmd("vba.module", m.name)); }} className={`ml-7 flex items-center gap-1 px-1 ${mod?.name === m.name ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`}><AccIcon name="form" size={12} /> {m.name}</button>
            ))}
            <div className="ml-3 mt-0.5 flex items-center gap-1"><AccIcon name="folderOpen" size={12} /> Modules</div>
            {stdMods.map((m) => (
              <button key={m.name} type="button" onDoubleClick={() => { judge(); onCommit(cmd("vba.module", m.name)); }} onClick={() => { judge(); onCommit(cmd("vba.module", m.name)); }} className={`ml-7 flex items-center gap-1 px-1 ${mod?.name === m.name ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`}><AccIcon name="module" size={12} /> {m.name}</button>
            ))}
          </div>
          <div className="bg-[#dfe6f0] px-2 py-0.5 text-[11px] font-semibold">Properties - {mod?.name ?? ""}</div>
          <div className="h-[70px] bg-white p-1 text-[11px]">
            <div className="grid grid-cols-2 border-b border-gray-200"><span>(Name)</span><span>{mod?.name ?? ""}</span></div>
          </div>
        </div>
        {/* Code window */}
        <div className="flex min-w-0 flex-1 flex-col">
          {mod ? (
            <>
              <div className="flex h-6 shrink-0 items-center gap-2 border-b border-[#c6c6c6] bg-[#f6f6f6] px-1">
                <span className="text-[11px] text-gray-600">{dbName} - {mod.name} (Code)</span>
                <select aria-label="Object" className="h-[19px] w-36 border border-gray-400 text-[11px]" defaultValue="(General)" onKeyDown={(e) => e.stopPropagation()}><option>(General)</option></select>
                <select aria-label="Procedure" className="h-[19px] w-44 border border-gray-400 text-[11px]" value="" onChange={(e) => {
                  const p = e.target.value;
                  const idx = text.search(new RegExp(`\\bSub\\s+${p}\\b`, "i"));
                  if (idx >= 0 && ta.current) { ta.current.focus(); ta.current.setSelectionRange(idx, idx); }
                }} onKeyDown={(e) => e.stopPropagation()}>
                  <option value="">(Declarations)</option>
                  {procs.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <textarea
                ref={ta}
                aria-label={`Code window for ${mod.name}`}
                spellCheck={false}
                value={text}
                onChange={(e) => {
                  const v = e.target.value;
                  setText(v);
                  if (timer.current) clearTimeout(timer.current);
                  timer.current = setTimeout(() => flush(v), 400);
                }}
                onBlur={() => flush()}
                onKeyDown={(e) => {
                  if (e.key === "F5" || ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "s" || e.key.toLowerCase() === "g")) || (e.altKey && e.key === "F11")) return;
                  e.stopPropagation();
                  if (e.key === "Tab") {
                    e.preventDefault();
                    const el = e.currentTarget;
                    const s = el.selectionStart, en = el.selectionEnd;
                    const v = text.slice(0, s) + "    " + text.slice(en);
                    setText(v);
                    requestAnimationFrame(() => el.setSelectionRange(s + 4, s + 4));
                  }
                }}
                className="min-h-0 flex-1 resize-none bg-white p-2 text-[13px] leading-[18px] outline-none"
                style={{ fontFamily: "Consolas, 'Courier New', monospace", tabSize: 4 }}
              />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center bg-[#8f8f8f] text-white">Insert › Module to add a code module.</div>
          )}
          {vbe.immediate && (
            <div className="flex h-[96px] shrink-0 flex-col border-t-2 border-[#c6c6c6]">
              <div className="flex items-center justify-between bg-[#dfe6f0] px-2 py-0.5 text-[11px] font-semibold">
                Immediate
                <button type="button" aria-label="Close Immediate window" onClick={() => onCommit(cmd("vba.immediateToggle"))} className="px-1">✕</button>
              </div>
              <div className="min-h-0 flex-1 overflow-auto bg-white px-2 font-mono text-[12px]" style={{ fontFamily: "Consolas, monospace" }}>
                {(vbe.output ?? []).map((l, i) => <div key={i} className="whitespace-pre">{l}</div>)}
                <input
                  aria-label="Immediate window"
                  value={imm}
                  onChange={(e) => setImm(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter" && imm.trim()) {
                      onCommit(cmd("vba.immediate", imm));
                      setImm("");
                    }
                  }}
                  placeholder="Type ?expression and press Enter"
                  className="w-full bg-transparent outline-none placeholder:text-gray-300"
                  style={{ fontFamily: "Consolas, monospace" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {macros && (
        <Win
          title="Macros"
          width={360}
          onClose={() => setMacros(null)}
          footer={
            <>
              <Btn primary disabled={!pickMacro} onClick={() => { const p = pickMacro; setMacros(null); if (p) onCommit(cmd("vba.run", p)); }}>Run</Btn>
              <Btn onClick={() => setMacros(null)}>Cancel</Btn>
            </>
          }
        >
          <div className="mb-1">Macro Name:</div>
          <ListBox ariaLabel="Macro Name" items={macros} value={pickMacro} onPick={setPickMacro} onDouble={(p) => { setMacros(null); onCommit(cmd("vba.run", p)); }} height={120} />
          {!macros.length && <p className="mt-2 text-gray-600">There are no Sub procedures without arguments in this module.</p>}
        </Win>
      )}
      {options && (
        <Win
          title="Options"
          width={380}
          onClose={() => setOptions(null)}
          footer={
            <>
              <Btn primary onClick={() => { const o = options; setOptions(null); if (o.require !== Boolean(doc.flags?.requireDeclaration)) onCommit(cmd("file.options", `Require Variable Declaration: ${o.require ? "Yes" : "No"}`)); }}>OK</Btn>
              <Btn onClick={() => setOptions(null)}>Cancel</Btn>
            </>
          }
        >
          <div className="mb-2 flex gap-2 border-b border-gray-300 pb-1"><span className="border border-b-0 border-gray-300 bg-white px-2">Editor</span><span className="px-2 text-gray-500">Editor Format</span><span className="px-2 text-gray-500">General</span><span className="px-2 text-gray-500">Docking</span></div>
          <fieldset className="flex flex-col gap-1 border border-gray-300 p-2">
            <legend className="px-1">Code Settings</legend>
            <Check checked label="Auto Syntax Check" onChange={() => undefined} />
            <Check checked={options.require} label="Require Variable Declaration" onChange={(v) => setOptions({ require: v })} />
            <Check checked label="Auto List Members" onChange={() => undefined} />
            <Check checked label="Auto Quick Info" onChange={() => undefined} />
            <Check checked label="Auto Data Tips" onChange={() => undefined} />
            <Check checked label="Auto Indent" onChange={() => undefined} />
          </fieldset>
        </Win>
      )}
    </div>
  );
}
