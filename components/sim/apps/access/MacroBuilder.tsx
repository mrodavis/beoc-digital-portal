"use client";

import { useEffect, useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { AccessDoc } from "./types";
import { findMacro } from "./data";
import { MACRO_ACTIONS, MACRO_ARGS, parseSel } from "./model";
import { AccIcon } from "./icons";
import type { ViewProps } from "./Datasheet";

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });

const CATALOG: { folder: string; items: string[] }[] = [
  { folder: "Program Flow", items: ["Comment", "Group", "If", "Submacro"] },
  { folder: "Data Entry Operations", items: ["DeleteRecord", "EditListItems", "SaveRecord"] },
  { folder: "Data Import/Export", items: ["AddContactFromOutlook", "EMailDatabaseObject", "ExportWithFormatting", "SaveAsOutlookContact", "WordMailMerge"] },
  { folder: "Database Objects", items: ["GoToControl", "GoToPage", "GoToRecord", "OpenForm", "OpenReport", "OpenTable", "PrintObject", "PrintPreview", "RepaintObject", "SelectObject", "SetProperty"] },
  { folder: "Filter/Query/Search", items: ["ApplyFilter", "FindNextRecord", "FindRecord", "OpenQuery", "Refresh", "RefreshRecord", "RemoveFilterSort", "Requery", "SearchForRecord", "SetFilter", "SetOrderBy", "ShowAllRecords"] },
  { folder: "Macro Commands", items: ["CancelEvent", "ClearMacroError", "OnError", "RemoveAllTempVars", "RemoveTempVar", "RunCode", "RunDataMacro", "RunMacro", "RunMenuCommand", "SetLocalVar", "SetTempVar", "SingleStep", "StartNewWorkflow", "StopAllMacros", "StopMacro", "WorkflowTasks"] },
  { folder: "System Commands", items: ["Beep", "CloseDatabase", "DisplayHourglassPointer", "QuitAccess"] },
  { folder: "User Interface Commands", items: ["AddMenu", "BrowseTo", "LockNavigationPane", "MessageBox", "NavigateTo", "Redo", "SetDisplayedCategories", "SetMenuItem", "UndoRecord"] },
  { folder: "Window Management", items: ["CloseWindow", "MaximizeWindow", "MinimizeWindow", "MoveAndSizeWindow", "RestoreWindow"] },
];

function optionList(doc: AccessDoc, spec: (typeof MACRO_ARGS)[string][number]["options"]): string[] | null {
  if (!spec) return null;
  if (Array.isArray(spec)) return spec;
  const saved = <T extends { name: string; saved?: boolean }>(xs: T[]) => xs.filter((x) => x.saved !== false).map((x) => x.name);
  switch (spec) {
    case "forms": return saved(doc.forms);
    case "reports": return saved(doc.reports);
    case "queries": return saved(doc.queries);
    case "tables": return saved(doc.tables);
    case "macros": return saved(doc.macros);
  }
  return null;
}

export function MacroBuilder({ doc, ui, tab, onSelect, onCommit }: ViewProps) {
  const m = findMacro(doc, tab.name);
  const sel = parseSel(ui.selection);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({ "Database Objects": true, "User Interface Commands": true });
  if (!m) return null;
  const all = Array.from(new Set([...MACRO_ACTIONS, ...CATALOG.flatMap((c) => c.items)])).sort();
  return (
    <div className="flex h-full min-h-0 bg-white text-[12px]">
      <div className="min-h-0 min-w-0 flex-1 overflow-auto p-3" onMouseDown={(e) => { if (e.target === e.currentTarget) onSelect({ selection: "" }); }}>
        {m.actions.map((a, i) => {
          const key = `mact:${m.name}.${i + 1}`;
          const on = ui.selection === key;
          const args = MACRO_ARGS[a.action] ?? Object.keys(a.args).map((n) => ({ name: n }));
          return (
            <div key={i} className={`mb-2 border ${on ? "border-[#a4373a] bg-[#fdf6f6]" : "border-[#d6d6d6] bg-[#fbfbfb]"}`} onMouseDown={() => onSelect({ selection: key })}>
              <div className="flex items-center gap-1.5 px-2 py-1">
                <span className="text-[10px] text-gray-500">▼</span>
                <span className="font-semibold">{a.action}</span>
                <span className="flex-1" />
                {on && (
                  <>
                    <button type="button" aria-label="Move up" onClick={() => onCommit(cmd("macro.moveUp"))} className="px-1 text-[#2e8b3d] hover:bg-gray-100">▲</button>
                    <button type="button" aria-label="Move down" onClick={() => onCommit(cmd("macro.moveDown"))} className="px-1 text-[#2e8b3d] hover:bg-gray-100">▼</button>
                    <button type="button" aria-label="Delete action" onClick={() => onCommit(cmd("macro.deleteAction"))} className="px-1 text-[#c42b1c] hover:bg-gray-100">✕</button>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-[3px] px-6 pb-2">
                {args.map((arg) => (
                  <ArgRow key={arg.name} label={arg.name} required={"required" in arg && Boolean(arg.required)} value={a.args[arg.name] ?? ""} options={optionList(doc, "options" in arg ? arg.options : undefined)} onCommit={(v) => onCommit({ kind: "type", target: `marg:${m.name}.${i + 1}.${arg.name}`, value: v })} onFocus={() => onSelect({ selection: key })} />
                ))}
              </div>
            </div>
          );
        })}
        <div className="flex items-center gap-1.5">
          <AccIcon name="plus" size={14} />
          <select
            aria-label="Add New Action"
            value=""
            onKeyDown={(e) => e.stopPropagation()}
            onChange={(e) => { if (e.target.value) onCommit(cmd("macro.addAction", e.target.value)); }}
            className="h-[22px] w-[220px] border border-[#7a7a7a] bg-white text-[12px]"
          >
            <option value="">Add New Action</option>
            {all.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        {sel.k === "none" && !m.actions.length && <p className="mt-3 text-gray-500">Pick an action from the Add New Action list, or double-click one in the Action Catalog.</p>}
      </div>
      {doc.panes?.actionCatalog && (
        <aside className="flex w-[220px] shrink-0 flex-col border-l border-[#c6c6c6] bg-white" aria-label="Action Catalog">
          <div className="flex h-7 items-center justify-between px-2">
            <span className="font-semibold">Action Catalog</span>
            <button type="button" aria-label="Close Action Catalog" onClick={() => onCommit(cmd("macro.actionCatalog"))} className="px-1 hover:bg-gray-100">✕</button>
          </div>
          <div className="mx-2 mb-1 flex items-center border border-[#c6c6c6] px-1">
            <input aria-label="Search actions" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-5 min-w-0 flex-1 outline-none" />
            <AccIcon name="search" size={11} />
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-1">
            {CATALOG.map((c) => {
              const items = c.items.filter((x) => x.toLowerCase().includes(search.toLowerCase()));
              if (search && !items.length) return null;
              const isOpen = open[c.folder] || Boolean(search);
              return (
                <div key={c.folder}>
                  <button type="button" onClick={() => setOpen((o) => ({ ...o, [c.folder]: !o[c.folder] }))} className="flex w-full items-center gap-1 px-1 py-[1px] text-left font-semibold hover:bg-gray-100">
                    <span className="w-3 text-[9px]">{isOpen ? "▼" : "▶"}</span>
                    <AccIcon name={isOpen ? "folderOpen" : "folder"} size={13} />
                    {c.folder}
                  </button>
                  {isOpen &&
                    items.map((x) => (
                      <button key={x} type="button" onDoubleClick={() => onCommit(cmd("macro.addAction", x))} title="Double-click to add" className={`block w-full truncate py-[1px] pl-9 text-left hover:bg-[#e5f1fb] ${MACRO_ACTIONS.includes(x) ? "" : "text-gray-500"}`}>
                        {x}
                      </button>
                    ))}
                </div>
              );
            })}
          </div>
        </aside>
      )}
    </div>
  );
}

function ArgRow({ label, value, options, required, onCommit, onFocus }: { label: string; value: string; options: string[] | null; required: boolean; onCommit: (v: string) => void; onFocus: () => void }) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);
  return (
    <label className="flex items-center gap-2">
      <span className="w-[110px] shrink-0 text-right text-gray-700">{label}</span>
      {options ? (
        <select aria-label={label} value={options.includes(value) ? value : ""} onFocus={onFocus} onMouseDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} onChange={(e) => onCommit(e.target.value)} className={`h-[21px] w-[240px] border bg-white text-[12px] ${required && !value ? "border-[#c42b1c]" : "border-[#a6a6a6]"}`}>
          <option value="" />
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          aria-label={label}
          value={text}
          onFocus={onFocus}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => { if (text !== value) onCommit(text); }}
          onMouseDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
          className={`h-[21px] w-[300px] border bg-white px-1 text-[12px] outline-none focus:border-[#0078d4] ${required && !value ? "border-[#c42b1c]" : "border-[#a6a6a6]"}`}
        />
      )}
    </label>
  );
}
