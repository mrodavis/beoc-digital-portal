"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { CanvasProps, StatusBarProps, SimUi } from "../../types";
import type { AccessDoc, AccPrompt, AccTab } from "./types";
import { findQuery, findTable } from "./data";
import { activeTab, parseSel, viewsFor } from "./model";
import { resultSignature, runQuery } from "./query";
import { AccIcon } from "./icons";
import { Btn, InlineEdit, Menu, MsgBox, Win, TextIn, bridge, Radio } from "./ui";
import { Datasheet, type ViewProps } from "./Datasheet";
import { TableDesign } from "./TableDesign";
import { QueryDesign, SqlView } from "./QueryDesign";
import { Relationships } from "./Relationships";
import { FormView } from "./FormView";
import { DocumenterView, ReportView } from "./ReportView";
import { MacroBuilder } from "./MacroBuilder";
import { Vbe } from "./Vbe";
import { StartScreen } from "./Backstage";
import { PropertySheet } from "./Panes";
import type { PopoverItem } from "../../chrome/Ribbon";

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });
const KINDS: { kind: string; label: string; icon: string }[] = [
  { kind: "table", label: "Tables", icon: "table" },
  { kind: "query", label: "Queries", icon: "query" },
  { kind: "form", label: "Forms", icon: "form" },
  { kind: "report", label: "Reports", icon: "report" },
  { kind: "macro", label: "Macros", icon: "macro" },
  { kind: "module", label: "Modules", icon: "module" },
];

function objectsOf(doc: AccessDoc, kind: string): string[] {
  const list: { name: string; saved?: boolean; hidden?: boolean }[] =
    kind === "table" ? doc.tables : kind === "query" ? doc.queries : kind === "form" ? doc.forms : kind === "report" ? doc.reports : kind === "macro" ? doc.macros : doc.modules.filter((m) => m.kind !== "class");
  return list.filter((o) => o.saved !== false && !o.hidden).map((o) => o.name).sort((a, b) => a.localeCompare(b));
}

function NavPane({ doc, ui, onSelect, onCommit, openDialog, showMsg }: { doc: AccessDoc; ui: SimUi; onSelect: (u: Partial<SimUi>) => void; onCommit: (c: SimCommit) => void; openDialog: (id: string) => void; showMsg: (t: string) => void }) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [rename, setRename] = useState<string | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number; items: PopoverItem[] } | null>(null);
  const [headMenu, setHeadMenu] = useState<{ x: number; y: number } | null>(null);
  const sel = parseSel(ui.selection);
  const isOpen = (kind: string, name: string) => doc.open.some((t) => t.kind === kind && t.name === name) || (kind === "module" && doc.vbe?.open && doc.vbe.module === name);
  const key = (kind: string, name: string) => `nav:${kind}:${name}`;
  const startRename = (kind: string, name: string) => {
    if (isOpen(kind, name)) {
      showMsg(`You can't rename the database object '${name}' while it's open.\n\nClose the database object, and then rename it.`);
      return;
    }
    setRename(key(kind, name));
  };
  const itemMenu = (e: React.MouseEvent, kind: string, name: string) => {
    e.preventDefault();
    onSelect({ selection: key(kind, name) });
    const items: PopoverItem[] = [{ key: "o", label: kind === "macro" ? "Run" : "Open", icon: "open", onPick: () => onCommit(cmd("nav.open", `${kind}:${name}`)) }];
    if (kind === "form" || kind === "report") items.push({ key: "l", label: "Layout View", icon: "layout", onPick: () => onCommit(cmd("nav.view", `${kind}:${name}|Layout View`)) });
    if (kind !== "module") items.push({ key: "d", label: "Design View", icon: "layout", onPick: () => onCommit(cmd("nav.view", `${kind}:${name}|Design View`)) });
    if (kind === "report") items.push({ key: "pp", label: "Print Preview", icon: "preview", onPick: () => onCommit(cmd("nav.view", `report:${name}|Print Preview`)) });
    if (kind === "table" || kind === "query" || kind === "form" || kind === "report") {
      items.push(
        { key: "s0", separator: true },
        { key: "ex", label: "Export to Excel", icon: "sheet", onPick: () => openDialog(`backstage:exportExcel|${name}`) },
        { key: "et", label: "Export to Text File", icon: "new", onPick: () => openDialog(`backstage:exportText|${name}`) },
        { key: "ep", label: "Export to PDF or XPS", icon: "pdf", onPick: () => openDialog(`backstage:exportPdf|${name}`) },
      );
    }
    items.push(
      { key: "s1", separator: true },
      { key: "r", label: "Rename", icon: "textbox", onPick: () => startRename(kind, name) },
      { key: "h", label: "Hide in this Group", onPick: () => undefined },
      { key: "del", label: "Delete", icon: "deleteCells", onPick: () => onCommit(cmd("object.deleteRequest")) },
      { key: "s2", separator: true },
      { key: "x", label: "Cut", icon: "cut", onPick: () => onCommit(cmd("object.copy")) },
      { key: "c", label: "Copy", icon: "copy", onPick: () => onCommit(cmd("object.copy")) },
      { key: "p", label: "Paste", icon: "paste", disabled: !doc.clipboard, onPick: () => onCommit(cmd("object.paste")) },
      { key: "s3", separator: true },
      { key: "pr", label: kind === "table" ? "Table Properties" : "View Properties", icon: "info", onPick: () => undefined },
    );
    setMenu({ x: e.clientX, y: e.clientY, items });
  };
  if (doc.navHidden) {
    return (
      <div className="flex w-[22px] shrink-0 flex-col items-center border-r border-[#c6c6c6] bg-[#f3f3f3]">
        <button type="button" aria-label="Open the Navigation Pane (F11)" title="Shutter Bar Open/Close Button (F11)" onClick={() => onCommit(cmd("pane.toggle"))} className="mt-1 px-0.5 hover:bg-[#dcdcdc]"><AccIcon name="doubleRight" size={12} /></button>
        <span className="mt-3 text-[11px] text-gray-600" style={{ writingMode: "vertical-rl" }}>Navigation Pane</span>
      </div>
    );
  }
  return (
    <aside className="flex w-[200px] shrink-0 flex-col border-r border-[#c6c6c6] bg-white text-[12px]" aria-label="Navigation Pane">
      <div className="flex h-[26px] shrink-0 items-center justify-between bg-white px-2">
        <button type="button" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setHeadMenu({ x: r.left, y: r.bottom }); }} className="flex items-center gap-1 font-semibold hover:text-[#a4373a]">
          All Access Objects <AccIcon name="chevronDown" size={10} />
        </button>
        <button type="button" aria-label="Close the Navigation Pane (F11)" title="Shutter Bar Open/Close Button (F11)" onClick={() => onCommit(cmd("pane.toggle"))} className="px-0.5 hover:bg-[#dcdcdc]"><AccIcon name="doubleLeft" size={12} /></button>
      </div>
      <div className="mx-2 mb-1 flex items-center border border-[#c6c6c6] bg-white px-1">
        <input aria-label="Search the Navigation Pane" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-[20px] min-w-0 flex-1 text-[12px] outline-none" />
        <AccIcon name="search" size={11} />
      </div>
      <div
        className="min-h-0 flex-1 overflow-auto outline-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (rename || sel.k !== "nav") return;
          if (e.key === "Enter") { e.preventDefault(); onCommit(cmd("nav.open", `${sel.kind}:${sel.name}`)); }
          if (e.key === "F2") { e.preventDefault(); startRename(sel.kind, sel.name); }
          if (e.key === "Delete") { e.preventDefault(); e.stopPropagation(); onCommit(cmd("object.deleteRequest")); }
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const flat = KINDS.flatMap((k) => (collapsed.has(k.kind) ? [] : objectsOf(doc, k.kind).map((n) => key(k.kind, n))));
            const i = flat.indexOf(ui.selection);
            const nx = flat[Math.max(0, Math.min(flat.length - 1, i + (e.key === "ArrowDown" ? 1 : -1)))];
            if (nx) onSelect({ selection: nx });
          }
        }}
      >
        {KINDS.map((k) => {
          const names = objectsOf(doc, k.kind).filter((n) => n.toLowerCase().includes(search.toLowerCase()));
          if (!names.length && (k.kind === "macro" || k.kind === "module" || search)) return null;
          const isCol = collapsed.has(k.kind);
          return (
            <div key={k.kind}>
              <button
                type="button"
                onClick={() => setCollapsed((s) => { const n = new Set(s); if (n.has(k.kind)) n.delete(k.kind); else n.add(k.kind); return n; })}
                className="flex h-[22px] w-full items-center justify-between bg-[#ececec] px-2 text-left font-semibold text-[#a4373a] hover:bg-[#e2e2e2]"
                aria-expanded={!isCol}
              >
                {k.label}
                <AccIcon name={isCol ? "chevronDown" : "chevronUp"} size={10} />
              </button>
              {!isCol &&
                names.map((n) => {
                  const kk = key(k.kind, n);
                  const on = ui.selection === kk;
                  return (
                    <div
                      key={n}
                      role="button"
                      tabIndex={-1}
                      aria-label={`${n} ${k.kind}`}
                      onMouseDown={(e) => { if (e.button === 0) onSelect({ selection: kk }); }}
                      onDoubleClick={() => onCommit(cmd("nav.open", `${k.kind}:${n}`))}
                      onContextMenu={(e) => itemMenu(e, k.kind, n)}
                      className={`flex h-[22px] cursor-default items-center gap-1.5 pl-4 pr-1 ${on ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`}
                    >
                      <AccIcon name={k.icon} size={15} />
                      {rename === kk ? (
                        <span className="min-w-0 flex-1 border border-[#0078d4]">
                          <InlineEdit
                            ariaLabel="New name"
                            value={n}
                            maxLength={64}
                            onCommit={(v) => {
                              setRename(null);
                              const nn = v.trim();
                              if (!nn || nn === n) return;
                              if (/[.!`[\]]/.test(nn)) { showMsg(`'${nn}' isn't a valid name.\n\nMake sure that the name doesn't contain a period (.), exclamation point (!), bracket ([ ]), leading space, or nonprintable character such as a carriage return.`); return; }
                              onCommit({ kind: "type", target: `nav:${k.kind}:${n}`, value: nn });
                            }}
                            onCancel={() => setRename(null)}
                          />
                        </span>
                      ) : (
                        <span className="truncate">{n}</span>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      {menu && <Menu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}
      {headMenu && (
        <Menu
          x={headMenu.x}
          y={headMenu.y}
          onClose={() => setHeadMenu(null)}
          items={[
            { label: "Navigate To Category", heading: true },
            { label: "Custom" },
            { label: "Object Type", icon: "checkIssues" },
            { label: "Tables and Related Views" },
            { label: "Created Date" },
            { label: "Modified Date" },
            { label: "Filter By Group", heading: true },
            { label: "Tables" },
            { label: "Queries" },
            { label: "Forms" },
            { label: "Reports" },
            { label: "All Access Objects", icon: "checkIssues" },
          ]}
        />
      )}
    </aside>
  );
}

const TAB_ICON: Record<string, string> = { table: "table", query: "query", form: "form", report: "report", macro: "macro", relationships: "relationships", documenter: "documenter" };

function PromptView({ p, doc, onCommit }: { p: AccPrompt; doc: AccessDoc; onCommit: (c: SimCommit) => void }) {
  const [text, setText] = useState(p.defaultName ?? "");
  const [opt, setOpt] = useState("Structure and Data");
  const [find, setFind] = useState({ what: doc.find?.text ?? "", repl: "", look: "Current field", match: "Any Part of Field", tab: p.text === "replace" ? "Replace" : "Find" });
  const send = (c?: { id: string; value?: string }) => onCommit(c ? cmd(c.id, c.value) : cmd("prompt.close"));
  switch (p.kind) {
    case "message":
      return <MsgBox title={p.title} text={p.text ?? ""} icon={p.icon ?? "warning"} buttons={[{ label: "OK", onClick: () => send() }]} />;
    case "confirm":
      return <MsgBox title={p.title} text={p.text ?? ""} icon={p.icon ?? "warning"} buttons={[{ label: "Yes", onClick: () => send(p.yes) }, { label: "No", onClick: () => send(p.no ?? { id: "prompt.no" }) }]} />;
    case "yesnocancel":
      return <MsgBox title={p.title} text={p.text ?? ""} icon={p.icon ?? "warning"} buttons={[{ label: "Yes", onClick: () => send(p.yes) }, { label: "No", onClick: () => send(p.no ?? { id: "prompt.no" }) }, { label: "Cancel", onClick: () => send({ id: "prompt.cancel" }) }]} />;
    case "param":
      return (
        <Win
          title="Enter Parameter Value"
          width={300}
          onClose={() => send({ id: "prompt.cancel" })}
          footer={
            <>
              <Btn primary onClick={() => onCommit(cmd("query.parameter", text))}>OK</Btn>
              <Btn onClick={() => send({ id: "prompt.cancel" })}>Cancel</Btn>
            </>
          }
        >
          <label className="flex flex-col gap-1">
            <span>{p.param}</span>
            <TextIn ariaLabel={p.param ?? "Parameter"} value={text} onChange={setText} onEnter={() => onCommit(cmd("query.parameter", text))} />
          </label>
        </Win>
      );
    case "saveAs": {
      const noun = p.objectKind === "table" ? "Table" : p.objectKind === "query" ? "Query" : p.objectKind === "form" ? "Form" : p.objectKind === "report" ? "Report" : p.objectKind === "macro" ? "Macro" : "Module";
      const ok = () => onCommit({ kind: "dialog", id: "saveObject", values: { name: text } });
      return (
        <Win title="Save As" width={300} onClose={() => send({ id: "prompt.cancel" })} footer={<><Btn primary onClick={ok}>OK</Btn><Btn onClick={() => send({ id: "prompt.cancel" })}>Cancel</Btn></>}>
          <label className="flex flex-col gap-1">
            <span>{noun} Name:</span>
            <TextIn ariaLabel={`${noun} Name`} value={text} onChange={setText} onEnter={ok} />
          </label>
        </Win>
      );
    }
    case "pasteAs": {
      const ok = () => onCommit({ kind: "dialog", id: "pasteTableAs", values: p.objectKind === "table" ? { name: text, option: opt } : { name: text } });
      return (
        <Win title={p.title ?? "Paste As"} width={330} onClose={() => send({ id: "prompt.cancel" })} footer={<><Btn primary onClick={ok}>OK</Btn><Btn onClick={() => send({ id: "prompt.cancel" })}>Cancel</Btn></>}>
          <label className="mb-2 flex flex-col gap-1">
            <span>{p.objectKind === "table" ? "Table" : p.objectKind === "query" ? "Query" : p.objectKind === "form" ? "Form" : p.objectKind === "report" ? "Report" : "Macro"} Name:</span>
            <TextIn ariaLabel="Name" value={text} onChange={setText} onEnter={ok} />
          </label>
          {p.objectKind === "table" && (
            <fieldset className="flex flex-col gap-1 border border-gray-300 p-2">
              <legend className="px-1">Paste Options</legend>
              {["Structure Only", "Structure and Data", "Append Data to Existing Table"].map((o) => <Radio key={o} name="pasteopt" label={o} checked={opt === o} onChange={() => setOpt(o)} />)}
            </fieldset>
          )}
        </Win>
      );
    }
    case "find":
      return (
        <Win title="Find and Replace" width={460} onClose={() => send()}>
          <div role="tablist" className="mb-2 flex gap-0.5 border-b border-gray-300">
            {["Find", "Replace"].map((t) => <button key={t} type="button" role="tab" aria-selected={find.tab === t} onClick={() => setFind({ ...find, tab: t })} className={`border border-b-0 px-3 py-0.5 ${find.tab === t ? "border-gray-300 bg-white" : "border-transparent"}`}>{t}</button>)}
          </div>
          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <label className="flex items-center gap-2"><span className="w-20">Find What:</span><TextIn ariaLabel="Find What" value={find.what} onChange={(v) => setFind({ ...find, what: v })} onEnter={() => onCommit(cmd("home.findNext", find.what))} className="h-[22px] flex-1 border border-[#7a7a7a] bg-white px-1 outline-none" /></label>
              {find.tab === "Replace" && <label className="flex items-center gap-2"><span className="w-20">Replace With:</span><TextIn ariaLabel="Replace With" value={find.repl} onChange={(v) => setFind({ ...find, repl: v })} className="h-[22px] flex-1 border border-[#7a7a7a] bg-white px-1 outline-none" /></label>}
              <label className="flex items-center gap-2"><span className="w-20">Look In:</span><select aria-label="Look In" value={find.look} onChange={(e) => setFind({ ...find, look: e.target.value })} className="h-[22px] border border-[#7a7a7a]"><option>Current field</option><option>Current document</option></select></label>
              <label className="flex items-center gap-2"><span className="w-20">Match:</span><select aria-label="Match" value={find.match} onChange={(e) => setFind({ ...find, match: e.target.value })} className="h-[22px] border border-[#7a7a7a]"><option>Any Part of Field</option><option>Whole Field</option><option>Start of Field</option></select></label>
              <label className="flex items-center gap-2"><span className="w-20">Search:</span><select aria-label="Search" className="h-[22px] border border-[#7a7a7a]"><option>All</option><option>Up</option><option>Down</option></select></label>
            </div>
            <div className="flex w-[96px] flex-col gap-1.5">
              <Btn primary onClick={() => onCommit(cmd("home.findNext", find.what))}>Find Next</Btn>
              <Btn onClick={() => send()}>Cancel</Btn>
              {find.tab === "Replace" && <Btn onClick={() => onCommit(cmd("home.replaceAll", `${find.what}|${find.repl}`))}>Replace All</Btn>}
            </div>
          </div>
        </Win>
      );
  }
  return null;
}

export function AccessCanvas({ doc, ui, onSelect, onCommit, openDialog }: CanvasProps<AccessDoc>) {
  bridge.selection = ui.selection;
  const [msg, setMsg] = useState<{ text: string; icon?: string; then?: () => void } | null>(null);
  const [tabMenu, setTabMenu] = useState<{ x: number; y: number; items: PopoverItem[] } | null>(null);
  const tab = activeTab(doc);
  const dbName = (doc.saved?.name ?? "Database").replace(/\.accdb$/i, "");
  const showMsg = (text: string, then?: () => void, icon?: string) => setMsg({ text, then, icon });

  // After a query runs: judge typed SQL, then report the results.
  const prevRun = useRef(doc.lastRun ? `${doc.lastRun.query}:${doc.lastRun.n}` : "");
  const judgedSql = useRef<Record<string, string>>({});
  const prevView = useRef(tab ? `${tab.id}|${tab.view}` : "");
  useEffect(() => {
    for (const q of doc.queries) if (judgedSql.current[q.name] === undefined) judgedSql.current[q.name] = q.sql ?? "";
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const judgeSql = (name: string) => {
    const q = findQuery(doc, name);
    if (!q || q.sql === undefined) return;
    if (judgedSql.current[q.name] === q.sql) return;
    judgedSql.current[q.name] = q.sql;
    onCommit({ kind: "type", target: `sql:${q.name}`, value: q.sql });
  };
  useEffect(() => {
    const cur = doc.lastRun ? `${doc.lastRun.query}:${doc.lastRun.n}` : "";
    const v = tab ? `${tab.id}|${tab.view}` : "";
    const wasSql = prevView.current.endsWith("|SQL View");
    const prevName = prevView.current.split("|")[0].replace(/^query:/, "");
    prevView.current = v;
    if (wasSql && prevView.current !== `query:${prevName}|SQL View`) judgeSql(prevName);
    if (cur && cur !== prevRun.current) {
      prevRun.current = cur;
      const q = findQuery(doc, doc.lastRun!.query);
      if (q) {
        judgeSql(q.name);
        const t = doc.open.find((x) => x.kind === "query" && x.name === q.name);
        const r = runQuery(doc, q, t?.params ?? {}, { previewOnly: true });
        if (r.result) {
          onCommit(cmd("query.result", resultSignature(r.result)));
          onCommit(cmd("query.count", String(r.result.rows.length)));
        }
      }
    } else prevRun.current = cur;
  });

  if (doc.noDb) return <StartScreen doc={doc} onCommit={onCommit} />;

  const vp = (t: AccTab): ViewProps => ({ doc, ui, tab: t, onSelect, onCommit, openDialog, showMsg });
  let content: React.ReactNode = <div className="h-full bg-[#f3f3f3]" />;
  if (tab) {
    const p = vp(tab);
    if (tab.kind === "table") content = tab.view === "Design View" ? <TableDesign {...p} /> : <Datasheet {...p} />;
    else if (tab.kind === "query") content = tab.view === "Design View" ? <QueryDesign {...p} /> : tab.view === "SQL View" ? <SqlView {...p} /> : <Datasheet {...p} />;
    else if (tab.kind === "form") content = <FormView {...p} />;
    else if (tab.kind === "report") content = <ReportView {...p} />;
    else if (tab.kind === "macro") content = <MacroBuilder {...p} />;
    else if (tab.kind === "relationships") content = <Relationships {...p} />;
    else if (tab.kind === "documenter") content = <div className="h-full overflow-auto"><DocumenterView tab={tab} /></div>;
    const showProps = doc.panes?.propertySheet && (tab.kind === "query" && tab.view === "Design View");
    if (showProps) content = <div className="flex h-full min-h-0"><div className="min-w-0 flex-1">{content}</div><PropertySheet doc={doc} ui={ui} onCommit={onCommit} onSelect={onSelect} onClose={() => onCommit(cmd("pane.close", "propertySheet"))} /></div>;
  }

  const tabCtx = (e: React.MouseEvent, t: AccTab) => {
    e.preventDefault();
    onCommit(cmd("tab.activate", t.id));
    const views = t.kind === "query" ? viewsFor("query", findQuery(doc, t.name)) : viewsFor(t.kind);
    setTabMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { key: "s", label: "Save", icon: "save", onPick: () => onCommit(cmd("file.save")) },
        { key: "c", label: "Close", icon: "close", onPick: () => onCommit(cmd("tab.close", t.id)) },
        { key: "ca", label: "Close All", onPick: () => onCommit(cmd("tab.closeAll")) },
        { key: "s1", separator: true },
        ...views.map((v) => ({ key: v, label: v, icon: v === "Design View" || v === "Layout View" ? "layout" : v === "SQL View" ? "fx" : v === "Print Preview" ? "preview" : "table", onPick: () => onCommit(cmd("view.switch", v)) })),
      ],
    });
  };

  return (
    <div className="relative flex h-full min-h-0 bg-[#f3f3f3] text-[12px] text-gray-900">
      <NavPane doc={doc} ui={ui} onSelect={onSelect} onCommit={onCommit} openDialog={openDialog} showMsg={(t) => showMsg(t)} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {doc.open.length > 0 && (
          <div role="tablist" className="flex h-[26px] shrink-0 items-end gap-[1px] overflow-x-auto border-b border-[#c6c6c6] bg-[#f3f3f3] px-0.5">
            {doc.open.map((t) => {
              const on = t.id === doc.active;
              return (
                <div
                  key={t.id}
                  role="tab"
                  aria-selected={on}
                  onMouseDown={(e) => { if (e.button === 0) onCommit(cmd("tab.activate", t.id)); if (e.button === 1) onCommit(cmd("tab.close", t.id)); }}
                  onContextMenu={(e) => tabCtx(e, t)}
                  className={`group flex h-[24px] cursor-default items-center gap-1.5 whitespace-nowrap border border-b-0 px-2 ${on ? "border-[#c6c6c6] bg-white" : "border-transparent hover:bg-[#e6e6e6]"}`}
                  style={on ? { boxShadow: "inset 0 2px 0 #a4373a" } : undefined}
                >
                  <AccIcon name={TAB_ICON[t.kind] ?? "table"} size={14} />
                  <span>{t.name}</span>
                  <button type="button" aria-label={`Close ${t.name}`} onMouseDown={(e) => e.stopPropagation()} onClick={() => onCommit(cmd("tab.close", t.id))} className={`ml-1 flex h-4 w-4 items-center justify-center rounded-sm hover:bg-[#d6d6d6] ${on ? "" : "opacity-0 group-hover:opacity-100"}`}>
                    <AccIcon name="close" size={9} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div className="relative min-h-0 flex-1">{content}</div>
      </div>
      {doc.vbe?.open && <Vbe doc={doc} dbName={dbName} onCommit={onCommit} />}
      {doc.prompt && <PromptView key={doc.prompt.nonce ?? 0} p={doc.prompt} doc={doc} onCommit={onCommit} />}
      {msg && <MsgBox text={msg.text} icon={msg.icon ?? "warning"} buttons={[{ label: "OK", onClick: () => { const t = msg.then; setMsg(null); t?.(); } }]} />}
      {tabMenu && <Menu x={tabMenu.x} y={tabMenu.y} items={tabMenu.items} onClose={() => setTabMenu(null)} />}
    </div>
  );
}

export function AccessStatusBar({ doc, onCommit }: StatusBarProps<AccessDoc>) {
  const tab = activeTab(doc);
  if (doc.noDb || doc.vbe?.open) return <div className="h-[22px] shrink-0 border-t border-[#c6c6c6] bg-[#f3f3f3]" />;
  const q = tab?.kind === "query" ? findQuery(doc, tab.name) : undefined;
  const t = tab?.kind === "table" ? findTable(doc, tab.name) : undefined;
  const filtered = Boolean((t?.view ?? q?.view)?.filterOn && ((t?.view ?? q?.view)?.filter ?? []).length);
  const text = doc.status || (!tab ? "Ready" : tab.view === "Design View" ? "Design view.  F6 = Switch panes.  F1 = Help." : tab.view === "SQL View" ? "SQL View" : tab.view === "Print Preview" ? "Print Preview" : tab.view);
  const views = tab ? (tab.kind === "query" ? viewsFor("query", q) : viewsFor(tab.kind)) : [];
  const icon = (v: string) => (v === "Design View" || v === "Layout View" ? "layout" : v === "SQL View" ? "fx" : v === "Print Preview" ? "preview" : v === "Form View" ? "textbox" : v === "Report View" ? "printLayout" : "table");
  return (
    <div className="flex h-[22px] shrink-0 items-center gap-2 border-t border-[#c6c6c6] bg-[#f3f3f3] px-2 text-[11px] text-gray-700">
      <span className="truncate">{text}</span>
      <span className="flex-1" />
      {filtered && <span className="bg-[#fde5b4] px-1">Filtered</span>}
      <span>Num Lock</span>
      {views.map((v) => (
        <button key={v} type="button" title={v} aria-label={v} onClick={() => onCommit(cmd("view.switch", v))} className={`flex h-[18px] w-[20px] items-center justify-center rounded-sm ${tab?.view === v ? "bg-[#c9daf0]" : "hover:bg-[#dcdcdc]"}`}>
          <ViewGlyph name={icon(v)} />
        </button>
      ))}
    </div>
  );
}

function ViewGlyph({ name }: { name: string }) {
  // Tiny view icons drawn to match the Access status bar.
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      {name === "table" && <><rect x="1.5" y="2.5" width="13" height="11" fill="#fff" stroke="#555" /><path d="M1.5 6h13M1.5 9.5h13M6 2.5v11M10.5 2.5v11" stroke="#555" strokeWidth="0.8" /></>}
      {name === "layout" && <><rect x="1.5" y="2.5" width="13" height="11" fill="#fff" stroke="#555" /><path d="M4 5h8M4 8h5M4 11h6" stroke="#a4373a" strokeWidth="1.2" /><path d="M11 9l3 3-1 1-3-3z" fill="#555" /></>}
      {name === "fx" && <text x="8" y="12" textAnchor="middle" fontSize="8" fontWeight="700" fill="#555">SQL</text>}
      {name === "preview" && <><rect x="3" y="1.5" width="10" height="13" fill="#fff" stroke="#555" /><circle cx="9" cy="9" r="2.5" fill="none" stroke="#555" /><path d="M11 11l2 2" stroke="#555" /></>}
      {name === "textbox" && <><rect x="1.5" y="2.5" width="13" height="11" fill="#fff" stroke="#555" /><rect x="5" y="5" width="7" height="2" fill="#fff" stroke="#888" /><rect x="5" y="9" width="7" height="2" fill="#fff" stroke="#888" /></>}
      {name === "printLayout" && <><path d="M3 1.5h7l3 3v10H3z" fill="#fff" stroke="#555" /><path d="M5 7h6M5 9h6M5 11h4" stroke="#888" /></>}
    </svg>
  );
}

export { useMemo };
