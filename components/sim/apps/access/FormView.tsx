"use client";

import { useEffect, useMemo, useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { AccControl, AccessDoc, AccForm, AccTable } from "./types";
import { checkEntry, dataSource, displayValue, findField, findForm, findTable, lookupValues, missingRequired, nextRowId, rowValue } from "./data";
import { parseSel, newRowDefaults, activeTab } from "./model";
import { evalExpr, formatValue, parseCriteria, parseExpr, truthy, type V, NeedParam } from "./sql";
import { THEMES } from "./ribbon";
import { AccIcon } from "./icons";
import { InlineEdit, Menu, type MenuItemDef } from "./ui";
import { Datasheet, canonical, MaskedInput, type ViewProps } from "./Datasheet";
import { FieldList, PropertySheet } from "./Panes";

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });
const THEME_COLOR: Record<string, string> = Object.fromEntries(THEMES.map((t, i) => [t, ["#2b579a", "#90C226", "#1CADE4", "#B01513", "#2C3C43", "#549E39", "#F07F09", "#4E67C8", "#A53010", "#FFC000", "#A6B727", "#AC3EC1"][i]]));

export function headerColor(theme?: string) {
  return THEME_COLOR[theme ?? "Office"] ?? "#2b579a";
}

/** Records a form or report shows (with a macro's Where Condition applied). */
export function sourceRows(doc: AccessDoc, source: string, params?: Record<string, string>): { rows: Record<string, V>[]; ids: string[]; table?: AccTable; fields: string[] } {
  if (!source) return { rows: [], ids: [], fields: [] };
  const p = { ...(params ?? {}) };
  const where = p.__where;
  delete p.__where;
  let src: ReturnType<ReturnType<typeof dataSource>["rows"]> = null;
  try {
    src = dataSource(doc, p).rows(source);
  } catch {
    src = null;
  }
  if (!src) return { rows: [], ids: [], fields: [] };
  let rows = src.rows;
  let ids = src.ids ?? [];
  if (where) {
    try {
      const e = parseExpr(where);
      const keep = rows.map((r) => {
        try {
          return truthy(evalExpr(e, { ref: (_t, n) => { const k = Object.keys(r).find((x) => x.toLowerCase() === n.toLowerCase()); if (k === undefined) throw new NeedParam(n); return r[k]; } }));
        } catch {
          return true;
        }
      });
      ids = ids.filter((_, i) => keep[i]);
      rows = rows.filter((_, i) => keep[i]);
    } catch {
      // keep all
    }
  }
  return { rows, ids, table: findTable(doc, source), fields: src.fields.map((f) => f.name) };
}

export function evalControl(source: string, row: Record<string, V> | undefined, rows: Record<string, V>[] = []): string {
  try {
    const e = parseExpr(source.replace(/^=/, ""));
    const v = evalExpr(e, {
      ref: (_t, n) => {
        const r = row ?? rows[0] ?? {};
        const k = Object.keys(r).find((x) => x.toLowerCase() === n.toLowerCase());
        if (k === undefined) {
          if (/^page$/i.test(n)) return 1;
          if (/^pages$/i.test(n)) return 1;
          throw new NeedParam(n);
        }
        return r[k];
      },
      agg: (call) => {
        const arg = call.args[0];
        const fn = call.name.toLowerCase();
        const vals = rows.map((r) => (arg && arg.k !== "star" ? evalExpr(arg, { ref: (_t, n) => { const k = Object.keys(r).find((x) => x.toLowerCase() === n.toLowerCase()); return k === undefined ? null : r[k]; } }) : 1));
        if (fn === "count") return arg && arg.k === "star" ? rows.length : vals.filter((x) => x !== null).length;
        const nums = vals.map((x) => (typeof x === "number" ? x : Number(x))).filter((x) => !Number.isNaN(x));
        if (fn === "sum") return Math.round(nums.reduce((a, b) => a + b, 0) * 1e6) / 1e6;
        if (fn === "avg") return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null;
        if (fn === "min") return nums.length ? Math.min(...nums) : null;
        if (fn === "max") return nums.length ? Math.max(...nums) : null;
        return null;
      },
    });
    return formatValue(v);
  } catch (err) {
    if (err instanceof NeedParam) return "#Name?";
    return "#Error";
  }
}

function comboOptions(doc: AccessDoc, c: AccControl, f: AccForm): string[] {
  if (c.rowSourceType === "Value List" || /;/.test(c.rowSource ?? "")) return (c.rowSource ?? "").split(";").map((x) => x.trim().replace(/^"(.*)"$/, "$1")).filter(Boolean);
  if (c.rowSource) {
    const src = dataSource(doc).rows(c.rowSource.replace(/^select .* from\s+/i, "").replace(/[;[\]]/g, "").trim());
    if (src) {
      const col = src.fields[src.fields.length > 1 ? 1 : 0]?.name;
      return src.rows.map((r) => formatValue(r[col] ?? null)).filter(Boolean);
    }
  }
  const t = findTable(doc, f.recordSource);
  const fld = findField(t, c.source ?? "");
  return (fld && lookupValues(doc, fld)) ?? [];
}

export function FormView(props: ViewProps) {
  const { doc, ui, tab, onSelect, onCommit, openDialog, showMsg } = props;
  const f = findForm(doc, tab.name);
  const view = tab.view;
  const sel = parseSel(ui.selection);
  const [menu, setMenu] = useState<{ x: number; y: number; items: MenuItemDef[] } | null>(null);
  const [editLabel, setEditLabel] = useState<string | null>(null);
  const [placing, setPlacing] = useState<{ section: string; kind: string } | null>(null);
  const [pendingNew, setPendingNew] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  useEffect(() => setEditLabel(null), [doc]);
  const data = useMemo(() => (f ? sourceRows(doc, f.recordSource, tab.params) : { rows: [], ids: [], fields: [] as string[] }), [doc, f, tab.params]);
  if (!f) return null;
  const isDesign = view === "Design View";
  const isLayout = view === "Layout View";
  const isForm = view === "Form View";
  const table = data.table;
  const n = data.rows.length;
  let recIdx = tab.record ?? 0;
  if (f.dataEntry && isForm && recIdx >= 0 && !pendingNew) recIdx = -1;
  if (recIdx >= n) recIdx = n - 1;
  const newId = table ? nextRowId(table) : "";
  const pendingRow = pendingNew && table ? table.rows.find((r) => r._id === pendingNew) : undefined;
  const isNew = recIdx === -1 || n === 0;
  let record: Record<string, V> | undefined;
  let recordId: string | undefined;
  if (!isNew) {
    record = data.rows[Math.max(0, recIdx)];
    recordId = data.ids[Math.max(0, recIdx)];
  } else if (pendingRow && table) {
    record = Object.fromEntries(table.fields.map((x) => [x.name, rowValue(table, x, pendingRow)]));
    recordId = pendingNew!;
  } else if (table) {
    const def = newRowDefaults(doc, table);
    record = Object.fromEntries(table.fields.map((x) => [x.name, x.type === "AutoNumber" ? null : rowValue(table, x, def)]));
    recordId = newId;
  }

  const sectionCtls = (s: string) => f.controls.filter((c) => (c.section ?? "Detail") === s).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const ctlKey = (c: AccControl, label = false) => `ctl:${f.name}.${c.id}${label ? "_Label" : ""}`;

  const leaveNew = (): boolean => {
    if (pendingRow && table) {
      const miss = missingRequired(table, pendingRow);
      if (miss) {
        showMsg(`You must enter a value in the '${table.name}.${miss}' field.`);
        return false;
      }
    }
    setPendingNew(null);
    return true;
  };
  const nav = (how: string) => {
    if (!leaveNew()) return;
    onCommit(cmd("record.nav", how));
  };

  const commitField = (c: AccControl, text: string) => {
    setEditing(null);
    if (!table || !c.source || c.source.startsWith("=")) return;
    const fld = findField(table, c.source);
    if (!fld || !recordId) return;
    if (c.locked || c.enabled === false) return;
    const existing = table.rows.find((r) => r._id === recordId);
    const before = existing ? canonical(fld, existing[fld.name]) : "";
    if (text === before || (!existing && text.trim() === "")) return;
    const r = checkEntry(doc, table, recordId, fld, text);
    if (!r.ok) {
      showMsg(r.message);
      return;
    }
    onCommit({ kind: "type", target: `cell:${table.name}.${recordId}.${fld.name}`, value: r.value === null ? "" : canonical(fld, r.value) });
    if (!existing) setPendingNew(recordId);
  };

  /** The Detail controls in tab order (the form's Tab Order list, else their layout order). */
  const tabSeq = (): AccControl[] => {
    const detail = f.controls
      .filter((c) => (c.section ?? "Detail") === "Detail" && c.kind !== "label" && c.kind !== "button" && c.tabStop !== false && c.enabled !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    if (!f.tabOrder?.length) return detail;
    const listed = f.tabOrder.map((id) => detail.find((c) => c.id.toLowerCase() === id.toLowerCase())).filter((c): c is AccControl => Boolean(c));
    return [...listed, ...detail.filter((c) => !listed.includes(c))];
  };
  /** Tab / Shift+Tab / Enter move to the next control, as in Form view. */
  const moveFrom = (c: AccControl, how: string) => {
    if (how !== "tab" && how !== "shiftTab" && how !== "enter") return;
    const seq = tabSeq();
    const i = seq.findIndex((x) => x.id === c.id);
    const n = seq[i + (how === "shiftTab" ? -1 : 1)];
    if (!n) return;
    if (n.kind === "textbox" && !n.locked && !(n.source ?? "").startsWith("=")) setEditing(n.id);
    else setTimeout(() => (document.querySelector(`[data-formctl="${CSS.escape(`${f.name}|${n.id}`)}"]`) as HTMLElement | null)?.focus(), 0);
  };

  const ctlMenu = (e: React.MouseEvent, c: AccControl, label: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (isForm) return;
    onSelect({ selection: ctlKey(c, label) });
    const items: MenuItemDef[] = [
      { key: "x", label: "Cut", icon: "cut", onPick: () => undefined },
      { key: "c", label: "Copy", icon: "copy", onPick: () => undefined },
      { key: "s0", separator: true },
      { key: "st", label: "Stacked", icon: "multiplePages", onPick: () => onCommit(cmd("arrange.stacked")) },
      { key: "tb", label: "Tabular", icon: "table", onPick: () => onCommit(cmd("arrange.tabular")) },
      { key: "s1", separator: true },
      { key: "mu", label: "Move Up", icon: "bringForward", onPick: () => onCommit(cmd("arrange.moveUp")) },
      { key: "md", label: "Move Down", icon: "sendBackward", onPick: () => onCommit(cmd("arrange.moveDown")) },
      { key: "s2", separator: true },
      ...(label || c.kind === "button" || c.kind === "label"
        ? []
        : [{
            key: "ch",
            label: "Change To",
            sub: ["Text Box", "Label", "List Box", "Combo Box", "Check Box"]
              .filter((k) => k !== (c.kind === "combo" ? "Combo Box" : c.kind === "check" ? "Check Box" : c.kind === "listbox" ? "List Box" : "Text Box"))
              .map((k) => ({ key: `ch-${k}`, label: k, onPick: () => onCommit(cmd("form.changeTo", k)) })),
          }]),
      { key: "s3", separator: true },
      { key: "d", label: "Delete", icon: "deleteCells", onPick: () => onCommit(cmd("form.deleteControl")) },
      { key: "s4", separator: true },
      { key: "p", label: "Properties", icon: "options", onPick: () => { if (!doc.panes?.propertySheet) onCommit(cmd("design.propertySheet")); } },
    ];
    if (c.kind === "button" && isDesign) items.splice(items.length - 1, 0, { key: "ev", label: "Build Event...", icon: "macros", onPick: () => onCommit(cmd("vba.eventStub", `${f.name}.${c.id}`)) });
    setMenu({ x: e.clientX, y: e.clientY, items });
  };

  const placeAt = (section: string, e?: React.MouseEvent) => {
    const tool = doc.tool;
    if (!tool || isForm) return false;
    // The new control's text box takes the focus; keep the browser from moving it back to the window.
    e?.preventDefault();
    if (tool === "Button" && !doc.flags?.noWizards) {
      openDialog(`backstage:buttonWizard|${section}`);
      onCommit(cmd("form.tool", ""));
      return true;
    }
    if (tool === "Text Box" || tool === "Label") {
      setPlacing({ section, kind: tool });
      return true;
    }
    onCommit(cmd("form.placeControl", `${tool}@${section}`));
    onCommit(cmd("form.tool", ""));
    return true;
  };

  const value = (c: AccControl): string => {
    if (!c.source) return isDesign ? "Unbound" : "";
    if (isDesign) return c.source;
    if (c.source.startsWith("=")) return evalControl(c.source, record, data.rows);
    const fld = table ? findField(table, c.source) : undefined;
    const v = record?.[Object.keys(record ?? {}).find((k) => k.toLowerCase() === c.source!.toLowerCase()) ?? ""] ?? null;
    return fld ? displayValue(fld, v as V) : formatValue(v as V);
  };

  const renderControl = (c: AccControl) => {
    const selected = ui.selection === ctlKey(c);
    const baseCls = `${selected && !isForm ? "outline outline-2 outline-[#f0a30a]" : ""}`;
    const style: React.CSSProperties = { fontWeight: c.bold ? 700 : undefined, fontStyle: c.italic ? "italic" : undefined, textDecoration: c.underline ? "underline" : undefined, color: c.color, background: c.fill, textAlign: c.align ? (c.align.toLowerCase() as "left") : undefined, fontSize: c.fontSize && c.kind !== "label" ? c.fontSize : undefined };
    const pick = (e: React.MouseEvent) => {
      if (isForm) return;
      e.stopPropagation();
      onSelect({ selection: ctlKey(c) });
    };
    if (c.kind === "button") {
      return (
        <button
          type="button"
          className={`min-w-[96px] border border-[#8a8a8a] bg-[#f0f0f0] px-3 py-[3px] text-[12px] shadow-sm hover:bg-[#e5f1fb] ${baseCls}`}
          style={style}
          onMouseDown={pick}
          onClick={() => { if (isForm) onCommit(cmd("form.click", `${f.name}.${c.id}`)); }}
          onContextMenu={(e) => ctlMenu(e, c, false)}
        >
          {c.caption || c.id}
        </button>
      );
    }
    if (c.kind === "label") {
      return editLabel === ctlKey(c) ? (
        <div className="w-[260px] border border-[#f0a30a]"><InlineEdit ariaLabel="Label text" value={c.caption ?? ""} onCommit={(v) => { setEditLabel(null); if (v !== (c.caption ?? "")) onCommit({ kind: "type", target: `label:${f.name}.${c.id}`, value: v }); }} onCancel={() => setEditLabel(null)} /></div>
      ) : (
        <span className={`inline-block min-w-[40px] px-0.5 ${baseCls}`} style={style} onMouseDown={pick} onDoubleClick={() => !isForm && setEditLabel(ctlKey(c))} onContextMenu={(e) => ctlMenu(e, c, false)}>
          {c.caption || (isDesign ? "Label" : "")}
        </span>
      );
    }
    const val = value(c);
    const readOnly = !isForm || c.locked || c.enabled === false || !table || (c.source?.startsWith("=") ?? true);
    const fld = table && c.source ? findField(table, c.source) : undefined;
    if (c.kind === "check") {
      return (
        <span className={`inline-flex h-[22px] items-center ${baseCls}`} onMouseDown={pick} onContextMenu={(e) => ctlMenu(e, c, false)}>
          <input type="checkbox" aria-label={c.label ?? c.id} data-formctl={`${f.name}|${c.id}`} disabled={readOnly} checked={val === "Yes" || val === "True" || val === "On"} onChange={() => commitField(c, val === "Yes" || val === "True" || val === "On" ? "No" : "Yes")} />
        </span>
      );
    }
    // Only Form View gets a live drop-down: a disabled <select> in Layout View would swallow the clicks that select it.
    if ((c.kind === "combo" || c.kind === "listbox") && isForm) {
      const opts = comboOptions(doc, c, f);
      return (
        <select
          aria-label={c.label ?? c.id}
          data-formctl={`${f.name}|${c.id}`}
          disabled={readOnly}
          value={opts.includes(val) ? val : ""}
          onMouseDown={(e) => { pick(e); e.stopPropagation(); }}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => commitField(c, e.target.value)}
          onContextMenu={(e) => ctlMenu(e, c, false)}
          className={`h-[22px] w-[230px] border border-[#a6a6a6] bg-white px-1 text-[12px] disabled:bg-white disabled:text-gray-900 ${baseCls}`}
          style={style}
        >
          <option value="">{val && !opts.includes(val) ? val : ""}</option>
          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    }
    const editingThis = editing === c.id && isForm && !readOnly;
    return (
      <div
        className={`relative h-[22px] w-[230px] border bg-white text-[12px] ${c.kind === "combo" ? "pr-4" : ""} ${isForm && !readOnly ? "border-[#a6a6a6] focus-within:border-[#0078d4]" : "border-[#c8c8c8]"} ${baseCls}`}
        style={{ width: c.width ? Math.round(c.width * 96) : undefined }}
        onMouseDown={(e) => {
          if (!isForm) { pick(e); return; }
          if (readOnly || editingThis) return;
          // Keep the browser from moving focus to the window behind the new text box.
          e.preventDefault();
          setEditing(c.id);
        }}
        onContextMenu={(e) => ctlMenu(e, c, false)}
      >
        {editingThis ? (
          fld?.inputMask && fld.type === "Short Text" ? (
            <MaskedInput mask={fld.inputMask} initial={val} selectAll={Boolean(val)} onCommit={(t, how) => { commitField(c, t); moveFrom(c, how); }} onCancel={() => setEditing(null)} />
          ) : (
            <InlineEdit ariaLabel={c.label ?? c.id} value={val} selectAll={false} onCommit={(t, how) => { commitField(c, t); moveFrom(c, how); }} onCancel={() => setEditing(null)} />
          )
        ) : (
          <span className={`block truncate px-1 leading-[20px] ${isDesign ? "text-gray-700" : ""}`} style={style}>{val}</span>
        )}
        {c.kind === "combo" && <span className="absolute right-0 top-0 flex h-full w-4 items-center justify-center border-l border-[#c8c8c8] bg-[#f3f3f3]"><AccIcon name="chevronDown" size={9} /></span>}
      </div>
    );
  };

  const labelFor = (c: AccControl) => {
    if (c.kind === "label" || c.kind === "button" || c.label === "") return null;
    const key = ctlKey(c, true);
    const selected = ui.selection === key;
    if (editLabel === key) {
      return <div className="w-[120px] border border-[#f0a30a]"><InlineEdit ariaLabel="Label text" value={c.label ?? c.id} onCommit={(v) => { setEditLabel(null); if (v !== (c.label ?? c.id)) onCommit({ kind: "type", target: `label:${f.name}.${c.id}`, value: v }); }} onCancel={() => setEditLabel(null)} /></div>;
    }
    return (
      <span
        className={`inline-block max-w-[150px] truncate px-0.5 text-[12px] ${selected && !isForm ? "outline outline-2 outline-[#f0a30a]" : ""}`}
        onMouseDown={(e) => { if (isForm) return; e.stopPropagation(); onSelect({ selection: key }); }}
        onDoubleClick={() => !isForm && setEditLabel(key)}
        onContextMenu={(e) => ctlMenu(e, c, true)}
      >
        {c.label ?? c.id}
      </span>
    );
  };

  const placeInput = (section: string) =>
    placing && placing.section === section ? (
      <div className="my-1 w-[260px] border border-[#f0a30a] bg-white">
        <InlineEdit
          ariaLabel={placing.kind === "Label" ? "Label text" : "Control source"}
          value=""
          placeholder={placing.kind === "Label" ? "Type the label text" : "Unbound: type =expression or a field name"}
          onCommit={(v) => {
            const k = placing.kind;
            setPlacing(null);
            if (v.trim()) onCommit({ kind: "type", target: `section:${f.name}.${section}`, value: v.trim() });
            else if (k === "Text Box") onCommit(cmd("form.placeControl", `Text Box@${section}`));
            onCommit(cmd("form.tool", ""));
          }}
          onCancel={() => { setPlacing(null); onCommit(cmd("form.tool", "")); }}
        />
      </div>
    ) : null;

  const sectionBar = (name: string) => (
    <div
      className={`flex h-[18px] cursor-pointer items-center gap-1 border-y border-[#b0b0b0] px-1 text-[11px] ${ui.selection === `sec:${f.name}.${name}` ? "bg-[#1f1f1f] text-white" : "bg-[#d9d9d9] text-gray-800"}`}
      onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: `sec:${f.name}.${name}` }); }}
    >
      ▼ {name}
    </div>
  );

  const color = headerColor(f.theme);
  const header = sectionCtls("Form Header");
  const detail = sectionCtls("Detail");
  const footer = sectionCtls("Form Footer");
  const grid = isDesign ? { backgroundImage: "radial-gradient(#c9c9c9 1px, transparent 1px)", backgroundSize: "12px 12px" } : undefined;

  const headerBand = (
    <div
      className={`flex min-h-[46px] items-center gap-2 px-3 py-2 ${isDesign ? "" : ""}`}
      style={{ background: isDesign ? "#fff" : `${color}22`, borderBottom: `3px solid ${color}`, ...(grid ?? {}) }}
      onMouseDown={(e) => { if (e.target === e.currentTarget && !placeAt("Form Header", e) && !isForm) onSelect({ selection: `sec:${f.name}.Form Header` }); }}
    >
      {!isDesign && <AccIcon name="form" size={26} />}
      {header.map((c) => (
        <span key={c.id} className={c.id === "Title" ? "text-[20px] font-light" : "ml-auto text-[11px]"} style={{ color: c.id === "Title" ? color : undefined }}>
          {renderControl(c)}
        </span>
      ))}
      {placeInput("Form Header")}
    </div>
  );

  const columnar = (
    <div className="flex flex-col gap-[5px] px-4 py-3" style={grid} onMouseDown={(e) => { if (e.target === e.currentTarget) { if (!placeAt("Detail", e) && !isForm) onSelect({ selection: `sec:${f.name}.Detail` }); } }}>
      {detail.map((c) => (
        <div key={c.id} className="flex items-center gap-3">
          <div className="w-[130px] shrink-0 text-right">{labelFor(c)}</div>
          {renderControl(c)}
        </div>
      ))}
      {placeInput("Detail")}
      {!detail.length && !isDesign && <p className="text-gray-500">Add fields from the Field List (Form Layout Design › Add Existing Fields).</p>}
    </div>
  );

  const tabularRows = isDesign ? [record] : data.rows.length ? data.rows : [record];
  const tabular = (
    <div className="px-3 py-2" style={grid}>
      <div className="flex gap-1 border-b border-gray-300 pb-1 font-semibold">
        {detail.map((c) => <div key={c.id} className="w-[140px] truncate">{labelFor(c)}</div>)}
      </div>
      {tabularRows.slice(0, isDesign ? 1 : 40).map((r, i) => (
        <div key={i} className={`flex gap-1 py-[2px] ${i === recIdx ? "bg-[#fff7e0]" : ""}`} onMouseDown={() => isForm && onCommit(cmd("record.nav", String(i + 1)))}>
          {detail.map((c) => (
            <div key={c.id} className="w-[140px] truncate border border-[#d6d6d6] bg-white px-1">{c.source && !c.source.startsWith("=") ? formatValue((r?.[c.source] ?? null) as V) : value(c)}</div>
          ))}
        </div>
      ))}
    </div>
  );

  let body: React.ReactNode;
  if (f.layout === "Datasheet" || view === "Datasheet View") {
    const t = findTable(doc, f.recordSource);
    body = t || f.recordSource ? <Datasheet {...props} tab={{ ...tab, name: f.recordSource, kind: t ? "table" : "query" }} /> : null;
  } else if (f.layout === "Split Form") {
    body = (
      <div className="flex h-full flex-col">
        <div className="min-h-0 flex-1 overflow-auto">
          {headerBand}
          {columnar}
        </div>
        <div className="h-[40%] min-h-[120px] border-t-4 border-[#d6d6d6]">
          <Datasheet {...props} tab={{ ...tab, name: f.recordSource, kind: "table" }} />
        </div>
      </div>
    );
  } else {
    body = (
      <div className="min-h-0 flex-1 overflow-auto bg-white" onMouseDown={(e) => { if (e.target === e.currentTarget && !isForm) onSelect({ selection: `form:${f.name}` }); }}>
        {isDesign && sectionBar("Form Header")}
        {headerBand}
        {isDesign && sectionBar("Detail")}
        {f.layout === "Tabular" || f.layout === "Multiple Items" ? tabular : columnar}
        {(footer.length > 0 || isDesign) && (
          <>
            {isDesign && sectionBar("Form Footer")}
            <div className="flex min-h-[30px] items-center gap-2 border-t border-gray-200 px-4 py-1.5" style={grid} onMouseDown={(e) => { if (e.target === e.currentTarget && !placeAt("Form Footer", e) && !isForm) onSelect({ selection: `sec:${f.name}.Form Footer` }); }}>
              {footer.map((c) => <span key={c.id}>{renderControl(c)}</span>)}
              {placeInput("Form Footer")}
            </div>
          </>
        )}
      </div>
    );
  }

  const showNav = isForm && f.navigationButtons !== false && f.layout !== "Datasheet";
  return (
    <div className="flex h-full min-h-0 bg-white text-[12px]">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {isDesign && (
          <div className="flex h-[16px] shrink-0 items-end border-b border-gray-300 bg-[#f3f3f3] text-[9px] text-gray-500">
            {/* The form selector: the box where the rulers meet. */}
            <button type="button" aria-label="Form selector" title="Form selector" onMouseDown={() => onSelect({ selection: `form:${f.name}` })} className={`mr-1.5 h-[16px] w-[18px] shrink-0 border-r border-gray-400 ${ui.selection === `form:${f.name}` ? "bg-black" : "bg-[#e6e6e6] hover:bg-[#d0d0d0]"}`} />
            {Array.from({ length: 9 }).map((_, i) => <span key={i} className="w-[96px] border-l border-gray-400 pl-0.5">{i}</span>)}
          </div>
        )}
        {body}
        {showNav && (
          <div className="flex h-[22px] shrink-0 items-center gap-1 border-t border-[#c6c6c6] bg-[#f3f3f3] px-1 text-[11px]">
            <span className="pr-1">Record:</span>
            <Nb icon="first" label="First record" onClick={() => nav("First")} />
            <Nb icon="prev" label="Previous record" onClick={() => nav("Previous")} />
            <span className="min-w-[64px] border border-[#c6c6c6] bg-white px-1 text-center">{isNew ? `${n + 1} of ${n + 1}` : `${recIdx + 1} of ${n}`}</span>
            <Nb icon="next" label="Next record" onClick={() => nav("Next")} />
            <Nb icon="last" label="Last record" onClick={() => nav("Last")} />
            <Nb icon="newRec" label="New (blank) record" disabled={f.allowAdditions === false || !table} onClick={() => nav("New")} />
            <span className="ml-2 flex items-center gap-1 text-gray-500"><AccIcon name="filter" size={12} />{tab.params?.__where ? "Filtered" : "No Filter"}</span>
            <span className="ml-1 border border-[#c6c6c6] bg-white px-1 text-gray-400">Search</span>
          </div>
        )}
      </div>
      {!isForm && doc.panes?.fieldList && <FieldList doc={doc} source={f.recordSource} onAdd={(v) => onCommit(cmd("form.addField", v))} onClose={() => onCommit(cmd("pane.close", "fieldList"))} />}
      {!isForm && doc.panes?.propertySheet && <PropertySheet doc={doc} ui={ui} onCommit={onCommit} onSelect={onSelect} onClose={() => onCommit(cmd("pane.close", "propertySheet"))} />}
      {menu && <Menu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}
    </div>
  );
}

function Nb({ icon, label, onClick, disabled }: { icon: string; label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick} className="flex h-[16px] w-[16px] items-center justify-center hover:bg-[#dcdcdc] disabled:opacity-30">
      <AccIcon name={icon} size={10} />
    </button>
  );
}

export { activeTab, parseCriteria };
