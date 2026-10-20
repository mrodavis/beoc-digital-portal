"use client";

import { useEffect, useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { SimUi } from "../../types";
import type { AccControl, AccessDoc, AccForm, AccReport } from "./types";
import { findForm, findQuery, findReport, findTable, findField } from "./data";
import { activeTab, parseSel } from "./model";
import { sourceFields } from "./build";
import { colKey } from "./query";
import { AccIcon } from "./icons";

type P = { name: string; value: string; options?: string[]; event?: boolean };
type Tabs = { Format: P[]; Data: P[]; Event: P[]; Other: P[] };
const YN = ["Yes", "No"];
const yn = (b: boolean | undefined, def = false) => ((b ?? def) ? "Yes" : "No");

function controlProps(doc: AccessDoc, c: AccControl, owner: AccForm | AccReport, isLabel: boolean): { type: string; tabs: Tabs } {
  const macros = ["", "[Event Procedure]", "[Embedded Macro]", ...doc.macros.filter((m) => m.saved !== false).map((m) => m.name)];
  const ev = (n: string, v?: string): P => ({ name: n, value: v ?? "", options: macros, event: true });
  if (isLabel || c.kind === "label") {
    const cap = isLabel ? c.label ?? "" : c.caption ?? "";
    return {
      type: "Label",
      tabs: {
        Format: [{ name: "Caption", value: cap }, { name: "Visible", value: yn(c.visible, true), options: YN }, { name: "Width", value: `${c.width ?? 1.5}"` }, { name: "Back Style", value: "Transparent", options: ["Transparent", "Normal"] }, { name: "Font Name", value: "Calibri (Detail)" }, { name: "Font Size", value: String(c.fontSize ?? 11) }, { name: "Text Align", value: c.align ?? "General", options: ["General", "Left", "Center", "Right", "Distribute"] }, { name: "Font Weight", value: c.bold ? "Bold" : "Normal", options: ["Thin", "Extra Light", "Light", "Normal", "Medium", "Semi-bold", "Bold", "Extra Bold", "Heavy"] }, { name: "Fore Color", value: c.color ?? "Text 1, Lighter 25%" }],
        Data: [],
        Event: [ev("On Click"), ev("On Dbl Click")],
        Other: [{ name: "Name", value: isLabel ? `${c.id}_Label` : c.id }, { name: "ControlTip Text", value: "" }],
      },
    };
  }
  if (c.kind === "button") {
    return {
      type: "Command Button",
      tabs: {
        Format: [{ name: "Caption", value: c.caption ?? "" }, { name: "Picture Caption Arrangement", value: "No Picture Caption", options: ["No Picture Caption", "General", "Top", "Bottom", "Left", "Right"] }, { name: "Visible", value: yn(c.visible, true), options: YN }, { name: "Width", value: `${c.width ?? 1.2}"` }, { name: "Font Size", value: String(c.fontSize ?? 11) }],
        Data: [],
        Event: [ev("On Click", c.onClick), ev("On Got Focus"), ev("On Lost Focus"), ev("On Dbl Click")],
        Other: [{ name: "Name", value: c.id }, { name: "Tab Stop", value: yn(c.tabStop, true), options: YN }, { name: "ControlTip Text", value: "" }],
      },
    };
  }
  const isCombo = c.kind === "combo" || c.kind === "listbox";
  const type = c.kind === "combo" ? "Combo Box" : c.kind === "listbox" ? "List Box" : c.kind === "check" ? "Check Box" : "Text Box";
  return {
    type,
    tabs: {
      Format: [
        ...(c.kind === "check" ? [] : [{ name: "Format", value: c.format ?? "", options: ["", "General Number", "Currency", "Fixed", "Standard", "Percent", "General Date", "Long Date", "Medium Date", "Short Date"] }, { name: "Decimal Places", value: "Auto" }]),
        { name: "Visible", value: yn(c.visible, true), options: YN },
        { name: "Width", value: `${c.width ?? 2}"` },
        { name: "Back Color", value: c.fill ?? "Background 1" },
        { name: "Font Name", value: "Calibri (Detail)" },
        { name: "Font Size", value: String(c.fontSize ?? 11) },
        { name: "Text Align", value: c.align ?? "General", options: ["General", "Left", "Center", "Right", "Distribute"] },
        { name: "Font Weight", value: c.bold ? "Bold" : "Normal", options: ["Thin", "Light", "Normal", "Medium", "Semi-bold", "Bold", "Heavy"] },
        { name: "Fore Color", value: c.color ?? "Text 1, Lighter 25%" },
        ...(isCombo ? [{ name: "Column Count", value: "1" }, { name: "List Rows", value: "16" }] : []),
      ],
      Data: [
        { name: "Control Source", value: c.source ?? "", options: ["", ...sourceFields(doc, owner.recordSource).map((f) => f.name)] },
        ...(isCombo ? [{ name: "Row Source", value: c.rowSource ?? "" }, { name: "Row Source Type", value: c.rowSourceType ?? "Table/Query", options: ["Table/Query", "Value List", "Field List"] }, { name: "Bound Column", value: "1" }, { name: "Limit To List", value: yn(c.limitToList), options: YN }, { name: "Allow Value List Edits", value: "No", options: YN }] : []),
        ...(c.kind === "textbox" ? [{ name: "Input Mask", value: "" }, { name: "Running Sum", value: c.totalFn ?? "No", options: ["No", "Over Group", "Over All"] }] : []),
        { name: "Default Value", value: "" },
        { name: "Validation Rule", value: "" },
        { name: "Validation Text", value: "" },
        { name: "Enabled", value: yn(c.enabled, true), options: YN },
        { name: "Locked", value: yn(c.locked), options: YN },
      ],
      Event: [ev("On Click", c.onClick), ev("Before Update"), ev("After Update"), ev("On Got Focus"), ev("On Lost Focus"), ev("On Dbl Click")],
      Other: [{ name: "Name", value: c.id }, { name: "Tab Stop", value: yn(c.tabStop, true), options: YN }, { name: "Tab Index", value: "0" }, { name: "Status Bar Text", value: "" }, { name: "ControlTip Text", value: "" }],
    },
  };
}

function formProps(doc: AccessDoc, f: AccForm): Tabs {
  const sources = ["", ...doc.tables.filter((t) => t.saved !== false).map((t) => t.name), ...doc.queries.filter((q) => q.saved !== false).map((q) => q.name)];
  const macros = ["", "[Event Procedure]", "[Embedded Macro]", ...doc.macros.map((m) => m.name)];
  return {
    Format: [{ name: "Caption", value: f.caption ?? "" }, { name: "Default View", value: f.defaultView ?? (f.layout === "Datasheet" ? "Datasheet" : f.layout === "Split Form" ? "Split Form" : f.layout === "Tabular" || f.layout === "Multiple Items" ? "Continuous Forms" : "Single Form"), options: ["Single Form", "Continuous Forms", "Datasheet", "Split Form"] }, { name: "Allow Form View", value: "Yes", options: YN }, { name: "Allow Datasheet View", value: "Yes", options: YN }, { name: "Record Selectors", value: yn(f.recordSelectors, true), options: YN }, { name: "Navigation Buttons", value: yn(f.navigationButtons, true), options: YN }, { name: "Scroll Bars", value: "Both", options: ["Neither", "Horizontal Only", "Vertical Only", "Both"] }],
    Data: [{ name: "Record Source", value: f.recordSource, options: sources }, { name: "Recordset Type", value: "Dynaset", options: ["Dynaset", "Dynaset (Inconsistent Updates)", "Snapshot"] }, { name: "Filter", value: "" }, { name: "Order By", value: "" }, { name: "Data Entry", value: yn(f.dataEntry), options: YN }, { name: "Allow Additions", value: yn(f.allowAdditions, true), options: YN }, { name: "Allow Deletions", value: yn(f.allowDeletions, true), options: YN }, { name: "Allow Edits", value: yn(f.allowEdits, true), options: YN }],
    Event: [{ name: "On Load", value: f.onLoad ?? "", options: macros, event: true }, { name: "On Open", value: "", options: macros, event: true }, { name: "On Current", value: "", options: macros, event: true }, { name: "Before Update", value: "", options: macros, event: true }],
    Other: [{ name: "Pop Up", value: "No", options: YN }, { name: "Modal", value: "No", options: YN }, { name: "Cycle", value: "All Records", options: ["All Records", "Current Record", "Current Page"] }],
  };
}

function sectionProps(r: AccReport | undefined, section: string): Tabs {
  const sp = r?.sectionProps?.[section] ?? {};
  return {
    Format: [{ name: "Force New Page", value: sp["Force New Page"] ?? "None", options: ["None", "Before Section", "After Section", "Before & After"] }, { name: "New Row Or Col", value: "None", options: ["None", "Before Section", "After Section", "Before & After"] }, { name: "Keep Together", value: sp["Keep Together"] ?? "Yes", options: YN }, { name: "Visible", value: sp.Visible ?? "Yes", options: YN }, { name: "Height", value: sp.Height ?? "0.25\"" }, { name: "Back Color", value: sp["Back Color"] ?? "Background 1" }, { name: "Can Grow", value: sp["Can Grow"] ?? "No", options: YN }, { name: "Repeat Section", value: sp["Repeat Section"] ?? "No", options: YN }],
    Data: [],
    Event: [{ name: "On Format", value: "", event: true, options: ["", "[Event Procedure]", "[Embedded Macro]"] }, { name: "On Print", value: "", event: true, options: ["", "[Event Procedure]", "[Embedded Macro]"] }],
    Other: [{ name: "Name", value: section.replace(/\s/g, "") }, { name: "Tag", value: "" }],
  };
}

/** Property Sheet pane for the current selection. */
export function PropertySheet({ doc, ui, onCommit, onSelect, onClose }: { doc: AccessDoc; ui: SimUi; onCommit: (c: SimCommit) => void; onSelect: (u: Partial<SimUi>) => void; onClose: () => void }) {
  const [tabName, setTabName] = useState<"Format" | "Data" | "Event" | "Other" | "All">("All");
  const s = parseSel(ui.selection);
  const tab = activeTab(doc);
  let type = "";
  let tabs: Tabs = { Format: [], Data: [], Event: [], Other: [] };
  let objects: { key: string; label: string }[] = [];
  let current = "";
  const form = tab?.kind === "form" ? findForm(doc, tab.name) : undefined;
  const report = tab?.kind === "report" ? findReport(doc, tab.name) : undefined;
  const owner = form ?? report;
  if (owner) {
    const ctls: AccControl[] = form ? form.controls : [
      ...(report!.title !== undefined ? [{ id: "Title", kind: "label", caption: report!.title } as AccControl] : []),
      ...report!.fields.map((f) => ({ id: f, kind: "textbox", source: f, label: report!.captions?.[f] ?? f }) as AccControl),
      ...(report!.controls ?? []),
    ];
    objects = [{ key: `form:${owner.name}`, label: form ? "Form" : "Report" }, ...ctls.map((c) => ({ key: `ctl:${owner.name}.${c.id}`, label: c.id }))];
    if (s.k === "ctl") {
      const id = s.id.replace(/_Label$/, "");
      const c = ctls.find((x) => x.id.toLowerCase() === id.toLowerCase());
      if (c) {
        const r = controlProps(doc, c, owner, /_Label$/.test(s.id));
        type = r.type;
        tabs = r.tabs;
        current = `ctl:${owner.name}.${s.id}`;
      }
    } else if (s.k === "sec") {
      type = "Section";
      tabs = sectionProps(report, s.section);
      current = ui.selection;
      objects = [{ key: ui.selection, label: s.section.replace(/\s/g, "") }, ...objects];
    } else {
      type = form ? "Form" : "Report";
      tabs = form ? formProps(doc, form) : { Format: [{ name: "Caption", value: report!.title ?? "" }, { name: "Default View", value: "Report View", options: ["Report View", "Print Preview"] }], Data: [{ name: "Record Source", value: report!.recordSource }, { name: "Filter", value: "" }, { name: "Order By", value: "" }], Event: [{ name: "On Open", value: "", event: true, options: ["", "[Event Procedure]"] }], Other: [{ name: "Record Locks", value: "No Locks" }] };
      current = `form:${owner.name}`;
    }
  } else if (tab?.kind === "query") {
    const q = findQuery(doc, tab.name);
    if (q && s.k === "qcol" && q.cols[s.n - 1]) {
      const c = q.cols[s.n - 1];
      type = "Field Properties";
      const t = findTable(doc, c.table ?? "");
      const fld = findField(t, c.field);
      tabs = { Format: [], Data: [], Event: [], Other: [] };
      tabs.Format = [{ name: "Description", value: fld?.description ?? "" }, { name: "Format", value: c.format ?? fld?.format ?? "", options: ["", "General Number", "Currency", "Fixed", "Standard", "Percent", "Short Date", "Long Date"] }, { name: "Decimal Places", value: "Auto" }, { name: "Input Mask", value: "" }, { name: "Caption", value: c.caption ?? "" }];
      objects = [{ key: ui.selection, label: colKey(c) }];
      current = ui.selection;
    } else if (q) {
      type = "Query Properties";
      tabs = { Format: [{ name: "Description", value: q.description ?? "" }, { name: "Default View", value: "Datasheet", options: ["Datasheet", "PivotTable", "PivotChart"] }, { name: "Output All Fields", value: "No", options: YN }, { name: "Top Values", value: q.topValues ?? "All", options: ["All", "5", "25", "100", "5%", "25%"] }, { name: "Unique Values", value: q.unique ? "Yes" : "No", options: YN }, { name: "Unique Records", value: "No", options: YN }], Data: [], Event: [], Other: [] };
      objects = [{ key: `qprops:${q.name}`, label: "Query Properties" }];
      current = `qprops:${q.name}`;
      if (s.k !== "qprops") current = "";
    }
  }
  const list = tabName === "All" ? [...tabs.Format, ...tabs.Data, ...tabs.Event, ...tabs.Other] : tabs[tabName];
  const commit = (name: string, v: string) => {
    if (!current) {
      if (tab?.kind === "query") onSelect({ selection: `qprops:${tab.name}` });
    }
    onCommit({ kind: "type", target: `prop:${name}`, value: v });
  };
  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-l border-[#c6c6c6] bg-white text-[12px]" aria-label="Property Sheet">
      <div className="flex h-7 items-center justify-between px-2">
        <span className="font-semibold">Property Sheet</span>
        <button type="button" aria-label="Close Property Sheet" onClick={onClose} className="px-1 hover:bg-gray-100">✕</button>
      </div>
      <div className="px-2 pb-1 text-[11px] text-gray-600">Selection type: {type || "(none)"}</div>
      {objects.length > 0 && (
        <select aria-label="Selection" value={current} onChange={(e) => onSelect({ selection: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="mx-2 mb-1 h-[22px] border border-[#7a7a7a] text-[12px]">
          {!current && <option value="" />}
          {objects.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
        </select>
      )}
      <div role="tablist" className="flex gap-0.5 border-b border-[#c6c6c6] px-1">
        {(["Format", "Data", "Event", "Other", "All"] as const).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tabName === t} onClick={() => setTabName(t)} className={`border border-b-0 px-1.5 py-[1px] text-[11px] ${tabName === t ? "border-[#c6c6c6] bg-white" : "border-transparent text-gray-600"}`}>{t}</button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {list.map((p) => (
          <PropLine key={`${current}-${p.name}`} p={p} onCommit={(v) => commit(p.name, v)} onBuild={p.event ? () => onCommit({ kind: "command", id: "vba.eventStub", value: (current.match(/^ctl:([^.]+)\.(.+)$/)?.slice(1).join(".")) ?? "" }) : undefined} />
        ))}
        {!list.length && <p className="p-2 text-gray-500">{type ? "No properties on this tab." : "Select an object to see its properties."}</p>}
      </div>
    </aside>
  );
}

function PropLine({ p, onCommit, onBuild }: { p: P; onCommit: (v: string) => void; onBuild?: () => void }) {
  const [text, setText] = useState(p.value);
  const [chooser, setChooser] = useState(false);
  useEffect(() => setText(p.value), [p.value]);
  return (
    <div className="relative flex h-[19px] border-b border-[#ececec]">
      <span className="w-[46%] shrink-0 truncate px-1.5 leading-[19px]">{p.name}</span>
      <div className="flex min-w-0 flex-1 border-l border-[#ececec]">
        {p.options && !p.event ? (
          <select aria-label={p.name} value={p.options.includes(p.value) ? p.value : ""} onMouseDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} onChange={(e) => onCommit(e.target.value)} className="h-full w-full bg-transparent text-[12px] outline-none focus:bg-[#e5f1fb]">
            {!p.options.includes(p.value) && <option value="">{p.value}</option>}
            {p.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : p.event ? (
          <>
            <select aria-label={p.name} value={p.options?.includes(p.value) ? p.value : ""} onMouseDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} onChange={(e) => onCommit(e.target.value)} className="h-full min-w-0 flex-1 bg-transparent text-[12px] outline-none focus:bg-[#e5f1fb]">
              {p.options?.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <button type="button" aria-label={`${p.name} builder`} onClick={() => setChooser(true)} className="px-1 hover:bg-[#cce4f7]"><AccIcon name="dots" size={12} /></button>
            {chooser && (
              <div className="absolute right-0 top-full z-30 w-44 border border-gray-400 bg-white p-2 shadow-lg">
                <div className="mb-1 font-semibold">Choose Builder</div>
                {["Macro Builder", "Expression Builder", "Code Builder"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setChooser(false);
                      if (b === "Code Builder") {
                        onCommit("[Event Procedure]");
                        setTimeout(() => onBuild?.(), 0);
                      } else if (b === "Macro Builder") onCommit("[Embedded Macro]");
                    }}
                    className="block w-full px-1 py-[1px] text-left hover:bg-[#e5f1fb]"
                  >
                    {b}
                  </button>
                ))}
                <button type="button" onClick={() => setChooser(false)} className="mt-1 text-[11px] text-gray-500 hover:underline">Cancel</button>
              </div>
            )}
          </>
        ) : (
          <input
            aria-label={p.name}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => { if (text !== p.value) onCommit(text); }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") (e.target as HTMLInputElement).blur(); if (e.key === "Escape") setText(p.value); }}
            className="h-full w-full bg-transparent px-1 text-[12px] outline-none focus:bg-white"
          />
        )}
      </div>
    </div>
  );
}

/** Field List pane (Add Existing Fields). */
export function FieldList({ doc, source, onAdd, onClose }: { doc: AccessDoc; source: string; onAdd: (v: string) => void; onClose: () => void }) {
  const [showAll, setShowAll] = useState(!source);
  const own = source ? sourceFields(doc, source).map((f) => f.name) : [];
  const others = doc.tables.filter((t) => t.saved !== false && t.name !== source);
  return (
    <aside className="flex w-[210px] shrink-0 flex-col border-l border-[#c6c6c6] bg-white text-[12px]" aria-label="Field List">
      <div className="flex h-7 items-center justify-between px-2">
        <span className="font-semibold">Field List</span>
        <button type="button" aria-label="Close Field List" onClick={onClose} className="px-1 hover:bg-gray-100">✕</button>
      </div>
      <button type="button" onClick={() => setShowAll((x) => !x)} className="px-2 pb-1 text-left text-[11px] text-[#0063b1] hover:underline">
        {showAll ? "Show only fields in the current record source" : "Show all tables"}
      </button>
      <div className="min-h-0 flex-1 overflow-auto px-1">
        {source && (
          <>
            <div className="bg-[#f3f3f3] px-1 py-0.5 text-[11px] font-semibold text-gray-700">Fields available for this view:</div>
            <div className="px-1 py-0.5 font-semibold">{source}</div>
            {own.map((f) => (
              <button key={f} type="button" draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", `${source}.${f}`)} onDoubleClick={() => onAdd(`${source}.${f}`)} className="block w-full truncate px-4 py-[1px] text-left hover:bg-[#e5f1fb]" title="Double-click to add the field">
                {f}
              </button>
            ))}
          </>
        )}
        {showAll &&
          others.map((t) => (
            <div key={t.name}>
              <div className="flex items-center gap-1 px-1 py-0.5 font-semibold"><AccIcon name="table" size={12} />{t.name}</div>
              {t.fields.map((f) => (
                <button key={f.name} type="button" draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", `${t.name}.${f.name}`)} onDoubleClick={() => onAdd(`${t.name}.${f.name}`)} className="block w-full truncate px-4 py-[1px] text-left hover:bg-[#e5f1fb]">
                  {f.name}
                </button>
              ))}
            </div>
          ))}
      </div>
    </aside>
  );
}
