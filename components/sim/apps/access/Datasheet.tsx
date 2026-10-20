"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { SimUi } from "../../types";
import type { AccessDoc, AccField, AccQuery, AccTab, AccTable, DatasheetView } from "./types";
import { applyMaskDisplay, checkEntry, displayValue, findField, findQuery, findTable, fitMask, lookupValues, maskSlots, maskTemplate, missingRequired, nextRowId, rowValue, storedToV } from "./data";
import { runQuery } from "./query";
import { aggregate, compare, formatDateSerial, formatValue, isDate, serialOf, TODAY, toText, ymd, type V } from "./sql";
import { newRowDefaults, parseSel } from "./model";
import { AccIcon } from "./icons";
import { InlineEdit, Menu, MsgBox, Btn, Win, TextIn } from "./ui";
import type { PopoverItem } from "../../chrome/Ribbon";

export interface ViewProps {
  doc: AccessDoc;
  ui: SimUi;
  tab: AccTab;
  onSelect: (u: Partial<SimUi>) => void;
  onCommit: (c: SimCommit) => void;
  openDialog: (id: string) => void;
  showMsg: (text: string, then?: () => void, icon?: string) => void;
}

type Col = { name: string; caption: string; field?: AccField; type?: string; width: number; editable: boolean; base?: { table: string; field: string } };
type Row = { key: string; vals: V[]; ids: Record<string, string>; isNew?: boolean };

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });

/** Canonical text committed for a typed value (what the sim compares). */
export function canonical(f: AccField, value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
  const v = storedToV(f.type, value as never);
  if (isDate(v)) return formatDateSerial(v.$d);
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "number") return String(Math.round(v * 10000) / 10000);
  if (f.inputMask && typeof v === "string") return applyMaskDisplay(f.inputMask, v);
  return String(v);
}

function matchFilter(view: DatasheetView | undefined, cols: Col[], row: Row): boolean {
  if (!view?.filterOn || !view.filter?.length) return true;
  return view.filter.every((c) => {
    const i = cols.findIndex((x) => x.name.toLowerCase() === c.field.toLowerCase());
    if (i < 0) return true;
    const v = row.vals[i];
    const text = cols[i].field ? displayValue(cols[i].field, v) : formatValue(v, cols[i].type);
    const low = text.toLowerCase();
    const val = c.value === undefined || c.value === null ? "" : String(c.value).toLowerCase();
    switch (c.op) {
      case "eq": return low === val || (v !== null && compare(v, c.value ?? null) === 0);
      case "ne": return !(low === val || (v !== null && compare(v, c.value ?? null) === 0));
      case "contains": return low.includes(val);
      case "notContains": return !low.includes(val);
      case "begins": return low.startsWith(val);
      case "in": return (c.values ?? []).some((x) => (x === null ? v === null || text === "" : String(x).toLowerCase() === low));
      case "lt": { const r = compare(v, c.value ?? null); return r !== null && r < 0; }
      case "gt": { const r = compare(v, c.value ?? null); return r !== null && r > 0; }
      case "between": { const a = compare(v, c.value ?? null), b = compare(v, c.value2 ?? null); return a !== null && b !== null && a >= 0 && b <= 0; }
      case "null": return v === null || text === "";
      case "notNull": return !(v === null || text === "");
    }
    return true;
  });
}

function sortRows(view: DatasheetView | undefined, cols: Col[], rows: Row[]): Row[] {
  const s = view?.sort ?? [];
  if (!s.length) return rows;
  const idx = rows.map((_, i) => i);
  idx.sort((a, b) => {
    for (const k of s) {
      const ci = cols.findIndex((c) => c.name.toLowerCase() === k.field.toLowerCase());
      if (ci < 0) continue;
      const x = rows[a].vals[ci], y = rows[b].vals[ci];
      const c = x === null && y === null ? 0 : x === null ? -1 : y === null ? 1 : compare(x, y) ?? 0;
      if (c) return k.dir === "desc" ? -c : c;
    }
    return a - b;
  });
  return idx.map((i) => rows[i]);
}

export interface DsData {
  cols: Col[];
  rows: Row[];
  all: Row[];
  table?: AccTable;
  query?: AccQuery;
  view?: DatasheetView;
  error?: string;
  canAdd: boolean;
}

export function datasheetData(doc: AccessDoc, name: string, params?: Record<string, string>): DsData {
  const t = findTable(doc, name);
  if (t) {
    const view = t.view;
    const hidden = new Set((view?.hidden ?? []).map((x) => x.toLowerCase()));
    const fields = t.fields.filter((f) => !hidden.has(f.name.toLowerCase()));
    const frozen = new Set((view?.frozen ?? []).map((x) => x.toLowerCase()));
    fields.sort((a, b) => Number(frozen.has(b.name.toLowerCase())) - Number(frozen.has(a.name.toLowerCase())));
    const cols: Col[] = fields.map((f) => ({ name: f.name, caption: f.caption || f.name, field: f, type: f.type, width: view?.widths?.[f.name] ? Math.round(view.widths[f.name] * 7.2 + 8) : f.type === "Yes/No" ? 70 : f.type === "AutoNumber" ? 86 : f.type === "Long Text" ? 180 : 112, editable: f.type !== "AutoNumber" && f.type !== "Calculated", base: { table: t.name, field: f.name } }));
    const all: Row[] = t.rows.map((r) => ({ key: r._id, vals: fields.map((f) => rowValue(t, f, r)), ids: { [t.name]: r._id } }));
    const rows = sortRows(view, cols, all.filter((r) => matchFilter(view, cols, r)));
    return { cols, rows, all, table: t, view, canAdd: !t.linked };
  }
  const q = findQuery(doc, name);
  if (!q) return { cols: [], rows: [], all: [], canAdd: false };
  const res = runQuery(doc, q, params ?? {}, { previewOnly: true });
  if (!res.result) return { cols: [], rows: [], all: [], query: q, error: res.error, canAdd: false };
  const r = res.result;
  const view = q.view;
  const cols: Col[] = r.columns.map((c, i) => {
    const o = r.origin?.[i] ?? null;
    const bt = o ? findTable(doc, o.table) : undefined;
    const f = o ? findField(bt, o.field) : undefined;
    const qc = q.cols.find((x) => x.field.split(":")[0].trim().toLowerCase() === c.toLowerCase());
    return { name: c, caption: qc?.caption || f?.caption || c, field: f ? { ...f, format: qc?.format ?? f.format } : qc?.format ? { name: c, type: (r.types?.[i] as AccField["type"]) ?? "Number", format: qc.format } : undefined, type: r.types?.[i] ?? f?.type, width: 112, editable: Boolean(o && f && f.type !== "AutoNumber" && f.type !== "Calculated" && q.type === "Select" && !q.totals), base: o ?? undefined };
  });
  const all: Row[] = r.rows.map((vals, i) => ({ key: `q${i}`, vals, ids: r.ids?.[i] ?? {} }));
  const rows = sortRows(view, cols, all.filter((x) => matchFilter(view, cols, x)));
  return { cols, rows, all, query: q, view, canAdd: false };
}

const TOTAL_FNS_NUM = ["None", "Sum", "Average", "Count", "Maximum", "Minimum", "Standard Deviation", "Variance"];
const TOTAL_FNS_TEXT = ["None", "Count"];
const TOTAL_MAP: Record<string, string> = { Sum: "sum", Average: "avg", Count: "count", Maximum: "max", Minimum: "min", "Standard Deviation": "stdev", Variance: "var" };

function MiniCalendar({ value, onPick, onClose }: { value: number | null; onPick: (serial: number) => void; onClose: () => void }) {
  const start = ymd(value ?? TODAY);
  const [ym, setYm] = useState({ y: start.y, m: start.m });
  const first = serialOf(ym.y, ym.m, 1);
  const lead = ymd(first).wd - 1;
  const days = new Date(Date.UTC(ym.y, ym.m, 0)).getUTCDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (
    <div className="absolute left-0 top-full z-40 w-[196px] border border-gray-400 bg-white p-1.5 text-[11px] shadow-lg" onMouseDown={(e) => e.stopPropagation()}>
      <div className="mb-1 flex items-center justify-between">
        <button type="button" aria-label="Previous month" onClick={() => setYm((p) => (p.m === 1 ? { y: p.y - 1, m: 12 } : { y: p.y, m: p.m - 1 }))} className="px-1 hover:bg-gray-100">◀</button>
        <span className="font-semibold">{months[ym.m - 1]} {ym.y}</span>
        <button type="button" aria-label="Next month" onClick={() => setYm((p) => (p.m === 12 ? { y: p.y + 1, m: 1 } : { y: p.y, m: p.m + 1 }))} className="px-1 hover:bg-gray-100">▶</button>
      </div>
      <div className="grid grid-cols-7 text-center text-gray-500">{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <span key={d}>{d}</span>)}</div>
      <div className="grid grid-cols-7 text-center">
        {Array.from({ length: lead }).map((_, i) => <span key={`b${i}`} />)}
        {Array.from({ length: days }).map((_, i) => {
          const s = first + i;
          return (
            <button key={i} type="button" onClick={() => onPick(s)} className={`m-[1px] rounded-sm py-[1px] hover:bg-[#cce4f7] ${Math.floor(s) === TODAY ? "border border-[#a4373a]" : ""} ${value !== null && Math.floor(value) === s ? "bg-[#0078d7] text-white" : ""}`}>
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between">
        <button type="button" onClick={() => onPick(TODAY)} className="px-1 text-[#0063b1] hover:underline">Today</button>
        <button type="button" onClick={onClose} className="px-1 hover:underline">Close</button>
      </div>
    </div>
  );
}

/** Text box with an input mask template, as Access shows it while typing. */
export function MaskedInput({ mask, initial, selectAll, onCommit, onCancel }: { mask: string; initial: string; selectAll?: boolean; onCommit: (v: string, how: "enter" | "blur" | "tab" | "shiftTab" | "up" | "down") => void; onCancel: () => void }) {
  const { slots, placeholder } = maskSlots(mask);
  const lits = new Set(slots.filter((s) => s.lit !== undefined).map((s) => s.lit!));
  const [data, setData] = useState<string[]>(() => Array.from(initial).filter((c) => !lits.has(c) && c !== placeholder));
  const done = useRef(false);
  /** While the whole value is selected, the next character replaces it (as when you tab into a field). */
  const replacing = useRef(Boolean(selectAll && initial));
  const ref = useRef<HTMLInputElement>(null);
  const shown = (() => {
    let i = 0;
    return slots.map((s) => (s.lit !== undefined ? s.lit : data[i] !== undefined ? data[i++] : placeholder)).join("");
  })();
  const inputSlots = slots.filter((s) => s.lit === undefined).length;
  useEffect(() => {
    ref.current?.focus();
  }, []);
  useEffect(() => {
    if (replacing.current) {
      ref.current?.setSelectionRange(0, ref.current.value.length);
      return;
    }
    // Caret after the last typed character.
    let i = 0, pos = 0;
    for (let k = 0; k < slots.length; k++) {
      if (slots[k].lit !== undefined) continue;
      if (i >= data.length) { pos = k; break; }
      i++;
      pos = k + 1;
    }
    ref.current?.setSelectionRange(pos, pos);
  });
  const finish = (how: "enter" | "blur" | "tab" | "shiftTab" | "up" | "down") => {
    if (done.current) return;
    done.current = true;
    onCommit(data.length ? shown.replace(new RegExp(`\\${placeholder}`, "g"), " ").trimEnd() : "", how);
  };
  return (
    <input
      ref={ref}
      aria-label="Field value"
      value={shown}
      onChange={() => undefined}
      onBlur={() => finish("blur")}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter") { e.preventDefault(); finish("enter"); return; }
        if (e.key === "Tab") { e.preventDefault(); finish(e.shiftKey ? "shiftTab" : "tab"); return; }
        if (e.key === "Escape") { e.preventDefault(); done.current = true; onCancel(); return; }
        const el = ref.current;
        const allSelected = replacing.current || Boolean(el && el.value.length && el.selectionStart === 0 && el.selectionEnd === el.value.length);
        if ((e.key === "Backspace" || e.key === "Delete") && allSelected) { e.preventDefault(); replacing.current = false; setData([]); return; }
        if (e.key === "Backspace") { e.preventDefault(); setData((d) => d.slice(0, -1)); return; }
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          if (lits.has(e.key)) return;
          if (allSelected) {
            replacing.current = false;
            setData([e.key]);
            return;
          }
          setData((d) => (d.length < inputSlots ? [...d, e.key] : d));
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
          e.preventDefault();
          replacing.current = true;
          el?.setSelectionRange(0, el.value.length);
        }
      }}
      className="h-full w-full border-0 bg-white px-1 font-mono text-[12px] outline-none"
    />
  );
}

export function Datasheet({ doc, ui, tab, onSelect, onCommit, openDialog, showMsg }: ViewProps) {
  const name = tab.name;
  const data = useMemo(() => datasheetData(doc, name, tab.params), [doc, name, tab.params]);
  const { cols, rows, table, view } = data;
  const sel = parseSel(ui.selection);
  const focusRef = useRef<HTMLDivElement>(null);
  const [edit, setEdit] = useState<{ row: string; col: number; text?: string; calendar?: boolean } | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number; items: PopoverItem[] } | null>(null);
  const [filterMenu, setFilterMenu] = useState<{ col: number; x: number; y: number } | null>(null);
  const [custom, setCustom] = useState<{ col: number; op: string; text: string } | null>(null);
  const [renameCol, setRenameCol] = useState<string | null>(null);
  const [addMenu, setAddMenu] = useState<{ x: number; y: number } | null>(null);
  const [dirtyNew, setDirtyNew] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [widths, setWidths] = useState<Record<string, number>>({});
  const pendingRename = useRef<number | null>(null);

  const newId = table ? nextRowId(table) : "";
  const defaults = useMemo(() => (table ? newRowDefaults(doc, table) : null), [doc, table]);
  const displayRows: Row[] = [...rows];
  if (data.canAdd && table) displayRows.push({ key: newId, vals: cols.map((c) => (c.field && defaults ? (c.field.type === "AutoNumber" ? null : rowValue(table, c.field, defaults)) : null)), ids: { [table.name]: newId }, isNew: true });

  // Current cell from the selection.
  const curRow = sel.k === "cell" && sel.obj === name ? sel.row : sel.k === "row" && sel.obj === name ? sel.row : null;
  const curCol = sel.k === "cell" && sel.obj === name ? cols.findIndex((c) => c.name === sel.field) : sel.k === "col" && sel.obj === name ? cols.findIndex((c) => c.name === sel.field) : -1;
  const rowIndex = displayRows.findIndex((r) => r.key === curRow);

  useEffect(() => {
    setEdit(null);
  }, [doc]);
  useEffect(() => {
    // A field just added from "Click to Add" goes straight into rename.
    if (pendingRename.current !== null && table && table.fields.length > pendingRename.current) {
      const nf = table.fields.find((f) => /^Field\d+$/.test(f.name) && sel.k === "col" && sel.field === f.name);
      if (nf) setRenameCol(nf.name);
      pendingRename.current = null;
    }
  }, [table, sel]);

  const focus = () => focusRef.current?.focus({ preventScroll: true });
  /** Leaving a new record checks its required fields; false keeps the learner on it. */
  const leaveNew = (rowKey: string): boolean => {
    if (!dirtyNew || rowKey === dirtyNew || !table) return true;
    const r = table.rows.find((x) => x._id === dirtyNew);
    const miss = r ? missingRequired(table, r) : null;
    if (miss) {
      showMsg(`You must enter a value in the '${table.name}.${miss}' field.`);
      onSelect({ selection: `cell:${name}.${dirtyNew}.${miss}` });
      return false;
    }
    setDirtyNew(null);
    return true;
  };
  const selectCell = (rowKey: string, ci: number) => {
    const c = cols[ci];
    if (!c) return;
    if (!leaveNew(rowKey)) return;
    onSelect({ selection: `cell:${name}.${rowKey}.${c.name}` });
  };

  const move = (dr: number, dc: number) => {
    let r = Math.max(0, rowIndex), c = Math.max(0, curCol);
    c += dc;
    if (c >= cols.length) { c = 0; r += 1; }
    if (c < 0) { c = cols.length - 1; r -= 1; }
    r = Math.max(0, Math.min(displayRows.length - 1, r + dr));
    if (displayRows[r]) selectCell(displayRows[r].key, c);
  };

  const targetOf = (row: Row, c: Col) => {
    if (!c.base) return null;
    const id = row.ids[c.base.table];
    return id ? { table: c.base.table, id, field: c.base.field } : null;
  };

  const commitValue = (row: Row, ci: number, text: string, how: string) => {
    const c = cols[ci];
    const t = targetOf(row, c);
    setEdit(null);
    if (!t || !c.field) return;
    const tb = findTable(doc, t.table);
    const f = findField(tb, t.field);
    if (!tb || !f) return;
    const existing = tb.rows.find((r) => r._id === t.id);
    const before = existing ? canonical(f, existing[f.name]) : "";
    if (!(row.isNew && text.trim() === "") && text === before) {
      advance(how);
      return;
    }
    if (row.isNew && text.trim() === "") {
      advance(how);
      return;
    }
    const res = checkEntry(doc, tb, t.id, f, text);
    if (!res.ok) {
      showMsg(res.message, () => setEdit({ row: row.key, col: ci, text }));
      return;
    }
    const value = res.value === null ? "" : canonical(f, res.value);
    onCommit({ kind: "type", target: `cell:${tb.name}.${t.id}.${f.name}`, value: value || text });
    if (row.isNew) setDirtyNew(t.id);
    advance(how);
  };

  const advance = (how: string) => {
    if (how === "tab" || how === "enter") move(0, 1);
    else if (how === "shiftTab") move(0, -1);
    else if (how === "down") move(1, 0);
    else if (how === "up") move(-1, 0);
    focus();
  };

  const startEdit = (text?: string) => {
    if (rowIndex < 0 || curCol < 0) return;
    const c = cols[curCol];
    const row = displayRows[rowIndex];
    if (c.field?.type === "AutoNumber") {
      showMsg(`Control can't be edited; it's bound to AutoNumber field '${c.name}'.`, undefined, "info");
      return;
    }
    if (c.field?.type === "Calculated") {
      showMsg(`Field '${c.name}' is based on an expression and can't be edited.`, undefined, "info");
      return;
    }
    if (!c.editable || !targetOf(row, c)) {
      showMsg("This Recordset is not updateable.", undefined, "info");
      return;
    }
    if (c.field?.type === "Yes/No") {
      const cur = row.vals[curCol];
      commitValue(row, curCol, cur ? "No" : "Yes", "none");
      return;
    }
    const existing = c.field ? (row.vals[curCol] === null ? "" : canonical(c.field, toStored(c.field, row.vals[curCol]))) : "";
    setEdit({ row: row.key, col: curCol, text: text ?? existing });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (edit || renameCol || custom) return;
    const k = e.key;
    const ctrl = e.ctrlKey || e.metaKey;
    if (k.startsWith("Arrow")) {
      e.preventDefault();
      e.stopPropagation();
      if (k === "ArrowDown") move(1, 0);
      if (k === "ArrowUp") move(-1, 0);
      if (k === "ArrowLeft") move(0, -1);
      if (k === "ArrowRight") move(0, 1);
      return;
    }
    if (k === "Tab" || k === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      move(0, e.shiftKey ? -1 : 1);
      return;
    }
    if (k === "Home" && ctrl) { e.preventDefault(); if (displayRows[0]) selectCell(displayRows[0].key, 0); return; }
    if (k === "End" && ctrl) { e.preventDefault(); const last = displayRows[displayRows.length - 1]; if (last) selectCell(last.key, cols.length - 1); return; }
    if (k === "F2") { e.preventDefault(); e.stopPropagation(); startEdit(); return; }
    if (k === "Escape" && dirtyNew) {
      e.preventDefault();
      onCommit(cmd("record.undoNew", `${name}.${dirtyNew}`));
      setDirtyNew(null);
      return;
    }
    if (k === "Delete" && sel.k === "row") {
      e.preventDefault();
      e.stopPropagation();
      onCommit(cmd("home.deleteRecord"));
      return;
    }
    if (k === "Delete" && curCol >= 0 && rowIndex >= 0) {
      e.preventDefault();
      e.stopPropagation();
      const row = displayRows[rowIndex];
      if (cols[curCol].editable && !row.isNew) commitValue(row, curCol, "", "none");
      return;
    }
    if (ctrl && (k === "'" || k === '"')) {
      // Ctrl+' copies the value from the same field in the previous record.
      e.preventDefault();
      e.stopPropagation();
      const prev = displayRows[rowIndex - 1];
      if (prev && cols[curCol]?.field) {
        const v = prev.vals[curCol];
        startEdit(v === null ? "" : canonical(cols[curCol].field!, toStored(cols[curCol].field!, v)));
      }
      return;
    }
    if (ctrl && k === ";") {
      e.preventDefault();
      e.stopPropagation();
      startEdit(formatDateSerial(TODAY));
      return;
    }
    if (ctrl || e.altKey) return;
    if (k === " " && cols[curCol]?.field?.type === "Yes/No") { e.preventDefault(); startEdit(); return; }
    if (k.length === 1 && curCol >= 0 && rowIndex >= 0) {
      e.preventDefault();
      e.stopPropagation();
      startEdit(k);
    }
  };

  /* ---------- menus ---------- */

  const colMenu = (e: React.MouseEvent, ci: number) => {
    e.preventDefault();
    e.stopPropagation();
    const c = cols[ci];
    onSelect({ selection: `col:${name}.${c.name}` });
    const isText = !c.type || c.type === "Short Text" || c.type === "Long Text";
    const items: PopoverItem[] = [
      { key: "a", label: isText ? "Sort A to Z" : "Sort Smallest to Largest", icon: "sortAsc", onPick: () => onCommit(cmd("home.sortAsc")) },
      { key: "z", label: isText ? "Sort Z to A" : "Sort Largest to Smallest", icon: "sortDesc", onPick: () => onCommit(cmd("home.sortDesc")) },
      { key: "s1", separator: true },
      { key: "c", label: "Copy", icon: "copy", onPick: () => undefined },
      { key: "p", label: "Paste", icon: "paste", onPick: () => undefined },
      { key: "s2", separator: true },
      { key: "w", label: "Field Width...", icon: "columns", onPick: () => openDialog("fieldWidth") },
      { key: "h", label: "Hide Fields", onPick: () => onCommit(cmd("home.more", "Hide Fields")) },
      { key: "u", label: "Unhide Fields...", onPick: () => openDialog("unhideFields") },
      { key: "f", label: "Freeze Fields", icon: "freeze", onPick: () => onCommit(cmd("home.more", "Freeze Fields")) },
      { key: "uf", label: "Unfreeze All Fields", onPick: () => onCommit(cmd("home.more", "Unfreeze All Fields")) },
      { key: "s3", separator: true },
      { key: "find", label: "Find...", icon: "find", onPick: () => onCommit(cmd("home.find")) },
    ];
    if (table) {
      items.push(
        { key: "s4", separator: true },
        { key: "ins", label: "Insert Field", icon: "insertCells", onPick: () => onCommit(cmd("fields.add", "Short Text")) },
        { key: "lk", label: "Modify Lookups", icon: "link", onPick: () => openDialog(`backstage:lookupWizard|${table.name}|${c.name}`) },
        { key: "rn", label: "Rename Field", icon: "textbox", onPick: () => setRenameCol(c.name) },
        { key: "del", label: "Delete Field", icon: "deleteCells", onPick: () => onCommit(cmd("fields.delete")) },
      );
    }
    setMenu({ x: e.clientX, y: e.clientY, items });
  };

  const cellMenu = (e: React.MouseEvent, row: Row, ci: number) => {
    e.preventDefault();
    e.stopPropagation();
    const c = cols[ci];
    selectCell(row.key, ci);
    const v = row.vals[ci];
    const text = c.field ? displayValue(c.field, v) : formatValue(v, c.type);
    const isText = !c.type || c.type === "Short Text" || c.type === "Long Text";
    const items: PopoverItem[] = [
      { key: "cut", label: "Cut", icon: "cut", onPick: () => undefined },
      { key: "copy", label: "Copy", icon: "copy", onPick: () => undefined },
      { key: "paste", label: "Paste", icon: "paste", onPick: () => undefined },
      { key: "s0", separator: true },
      { key: "a", label: isText ? "Sort A to Z" : "Sort Smallest to Largest", icon: "sortAsc", onPick: () => onCommit(cmd("home.sortAsc")) },
      { key: "z", label: isText ? "Sort Z to A" : "Sort Largest to Smallest", icon: "sortDesc", onPick: () => onCommit(cmd("home.sortDesc")) },
      { key: "s1", separator: true },
      { key: "cl", label: `Clear filter from ${c.caption}`, disabled: !(view?.filter ?? []).some((x) => x.field === c.name), onPick: () => onCommit(cmd("datasheet.filter", `${c.name}:clear`)) },
    ];
    if (!row.isNew) {
      items.push(
        { key: "fbs", label: "Filter By Selection", icon: "filter", onPick: () => onCommit(cmd("home.selection", "Equals Selection")) },
        { key: "eq", label: `Equals "${text}"`, onPick: () => onCommit(cmd("datasheet.filter", `${c.name}:Equals:${text}`)) },
        { key: "ne", label: `Does Not Equal "${text}"`, onPick: () => onCommit(cmd("datasheet.filter", `${c.name}:Does Not Equal:${text}`)) },
      );
      if (isText) {
        items.push(
          { key: "ct", label: `Contains "${text}"`, onPick: () => onCommit(cmd("datasheet.filter", `${c.name}:Contains:${text}`)) },
          { key: "nc", label: `Does Not Contain "${text}"`, onPick: () => onCommit(cmd("datasheet.filter", `${c.name}:Does Not Contain:${text}`)) },
        );
      }
    }
    setMenu({ x: e.clientX, y: e.clientY, items });
  };

  const rowMenu = (e: React.MouseEvent, row: Row) => {
    e.preventDefault();
    e.stopPropagation();
    if (!row.isNew) onSelect({ selection: `row:${name}.${row.key}` });
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { key: "n", label: "New Record", icon: "new", onPick: () => { if (table) selectCell(newId, 0); } },
        { key: "d", label: "Delete Record", icon: "deleteCells", disabled: row.isNew || !table, onPick: () => onCommit(cmd("home.deleteRecord")) },
        { key: "s", separator: true },
        { key: "x", label: "Cut", icon: "cut", onPick: () => undefined },
        { key: "c", label: "Copy", icon: "copy", onPick: () => undefined },
        { key: "p", label: "Paste", icon: "paste", onPick: () => undefined },
        { key: "s2", separator: true },
        { key: "h", label: "Row Height...", icon: "spacing", onPick: () => openDialog("rowHeight") },
      ],
    });
  };

  /* ---------- render ---------- */

  const fontStyle: React.CSSProperties = { fontFamily: view?.font ? `'${view.font}', 'Segoe UI', sans-serif` : undefined, fontSize: view?.fontSize ? `${view.fontSize}px` : undefined, fontWeight: view?.bold ? 700 : undefined, fontStyle: view?.italic ? "italic" : undefined, textDecoration: view?.underline ? "underline" : undefined, color: view?.color };
  const rowH = view?.rowHeight ? Math.round(view.rowHeight * 1.4) : 21;
  const gl = view?.gridlines ?? "Gridlines: Both";
  const cellBorder = `${gl.includes("Both") || gl.includes("Vertical") ? "border-r" : ""} ${gl.includes("Both") || gl.includes("Horizontal") ? "border-b" : ""} border-[#d4d4d4]`;
  const colW = (c: Col) => widths[c.name] ?? c.width;
  const filtered = Boolean(view?.filterOn && view.filter?.length);
  const total = (ci: number) => {
    const fn = view?.totals?.[cols[ci].name];
    if (!fn || fn === "None") return "";
    const vals = rows.map((r) => r.vals[ci]);
    const v = aggregate(TOTAL_MAP[fn] ?? "count", vals);
    if (v === null) return "";
    if (fn === "Count") return String(v);
    return cols[ci].field ? displayValue(cols[ci].field, v) : formatValue(v, cols[ci].type);
  };
  const recCount = rows.length;
  const recNo = rowIndex >= 0 && !displayRows[rowIndex]?.isNew ? rowIndex + 1 : rowIndex >= 0 ? recCount + 1 : recCount ? 1 : 0;

  const distinct = (ci: number) => {
    const set = new Map<string, string>();
    for (const r of data.all) {
      const v = r.vals[ci];
      const t = cols[ci].field ? displayValue(cols[ci].field, v) : formatValue(v, cols[ci].type);
      set.set(t.toLowerCase(), t);
    }
    return Array.from(set.values()).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  };

  if (data.error) return <div className="p-4 text-[12px] text-gray-600">{data.error}</div>;

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div
        ref={focusRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative min-h-0 flex-1 overflow-auto outline-none"
        style={fontStyle}
        aria-label={`${name} datasheet`}
      >
        <table className="border-separate border-spacing-0 text-[12px]" style={{ tableLayout: "fixed" }}>
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="sticky left-0 z-20 h-[22px] w-[20px] border-b border-r border-[#c6c6c6] bg-[#f3f3f3]" />
              {cols.map((c, ci) => {
                const selected = sel.k === "col" && sel.obj === name && sel.field === c.name;
                const hasFilter = (view?.filter ?? []).some((x) => x.field === c.name) && view?.filterOn;
                const sorted = view?.sort?.find((s) => s.field === c.name);
                return (
                  <th
                    key={c.name}
                    style={{ width: colW(c), minWidth: colW(c), maxWidth: colW(c) }}
                    className={`relative h-[22px] select-none border-b border-r border-[#c6c6c6] px-1 text-left font-normal ${selected ? "bg-[#c9daf0]" : "bg-[#f3f3f3] hover:bg-[#e6e6e6]"}`}
                    onMouseDown={(e) => {
                      if (e.button !== 0) return;
                      onSelect({ selection: `col:${name}.${c.name}` });
                      focus();
                    }}
                    onDoubleClick={() => table && setRenameCol(c.name)}
                    onContextMenu={(e) => colMenu(e, ci)}
                  >
                    {renameCol === c.name ? (
                      <InlineEdit
                        ariaLabel="Field name"
                        value={c.name}
                        onCommit={(v) => {
                          setRenameCol(null);
                          if (v.trim() && v.trim() !== c.name && table) {
                            if (table.fields.some((f) => f.name.toLowerCase() === v.trim().toLowerCase())) showMsg(`The field name '${v.trim()}' is already in use. Type a different name.`);
                            else onCommit({ kind: "type", target: `fname:${table.name}.${c.name}`, value: v.trim() });
                          }
                          focus();
                        }}
                        onCancel={() => { setRenameCol(null); focus(); }}
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="min-w-0 flex-1 truncate">{c.caption}</span>
                        {sorted && <span className="text-[9px] text-gray-500">{sorted.dir === "asc" ? "▲" : "▼"}</span>}
                        <button
                          type="button"
                          aria-label={`${c.caption} filter menu`}
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            onSelect({ selection: `col:${name}.${c.name}` });
                            const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            setFilterMenu({ col: ci, x: r.left - 140, y: r.bottom + 2 });
                          }}
                          className="flex h-4 w-4 items-center justify-center rounded-sm hover:bg-[#cfcfcf]"
                        >
                          <AccIcon name={hasFilter ? "filterOn" : "chevronDown"} size={hasFilter ? 12 : 10} />
                        </button>
                      </div>
                    )}
                    <span
                      className="absolute right-[-3px] top-0 z-10 h-full w-[6px] cursor-col-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const x0 = e.clientX, w0 = colW(c);
                        const mv = (ev: MouseEvent) => setWidths((w) => ({ ...w, [c.name]: Math.max(30, w0 + ev.clientX - x0) }));
                        const up = () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
                        window.addEventListener("mousemove", mv);
                        window.addEventListener("mouseup", up);
                      }}
                    />
                  </th>
                );
              })}
              {table && (
                <th className="h-[22px] w-[110px] min-w-[110px] border-b border-r border-[#c6c6c6] bg-[#f3f3f3] px-1 text-left font-normal">
                  <button
                    type="button"
                    onClick={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      setAddMenu({ x: r.left, y: r.bottom + 2 });
                    }}
                    className="flex w-full items-center gap-1 text-gray-600 hover:text-black"
                  >
                    Click to Add <AccIcon name="chevronDown" size={10} />
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, ri) => {
              const isCur = row.key === curRow;
              const rowSel = sel.k === "row" && sel.obj === name && sel.row === row.key;
              const editingRow = edit?.row === row.key || dirtyNew === row.key;
              const bg = view?.altRow && ri % 2 === 1 && !row.isNew ? view.altRow : undefined;
              return (
                <tr key={row.key} style={{ height: rowH }}>
                  <td
                    className={`sticky left-0 z-[5] cursor-pointer border-b border-r border-[#c6c6c6] text-center ${rowSel ? "bg-[#c9daf0]" : isCur ? "bg-[#fde5b4]" : "bg-[#f3f3f3]"}`}
                    onMouseDown={(e) => {
                      if (e.button !== 0) return;
                      if (!row.isNew) { if (leaveNew(row.key)) onSelect({ selection: `row:${name}.${row.key}` }); }
                      else selectCell(row.key, 0);
                      focus();
                    }}
                    onContextMenu={(e) => rowMenu(e, row)}
                    aria-label={row.isNew ? "New record" : `Record selector ${ri + 1}`}
                  >
                    {editingRow && !row.isNew ? <AccIcon name="pencil" size={11} className="mx-auto" /> : row.isNew ? <AccIcon name="star" size={12} className="mx-auto" /> : isCur || rowSel ? <AccIcon name="arrow" size={10} className="mx-auto" /> : null}
                  </td>
                  {cols.map((c, ci) => {
                    const v = row.vals[ci];
                    const active = isCur && ci === curCol && sel.k === "cell";
                    const colSel = sel.k === "col" && sel.obj === name && sel.field === c.name;
                    const editing = edit && edit.row === row.key && edit.col === ci;
                    const isNum = c.type === "Number" || c.type === "Currency" || c.type === "AutoNumber" || c.type === "Large Number" || (typeof v === "number" && c.type !== "Short Text");
                    let text = c.field ? displayValue(c.field, v) : formatValue(v, c.type);
                    if (row.isNew && c.type === "AutoNumber") text = "(New)";
                    const look = c.field && table ? lookupValues(doc, c.field) : null;
                    return (
                      <td
                        key={c.name}
                        className={`relative overflow-hidden whitespace-nowrap ${cellBorder} ${editing ? "p-0" : "px-1"} ${active ? "outline outline-2 -outline-offset-2 outline-[#217346]" : ""} ${colSel || rowSel ? "bg-[#dce6f4]" : ""}`}
                        style={{ background: colSel || rowSel ? undefined : bg, textAlign: isNum && !editing ? "right" : undefined, maxWidth: colW(c) }}
                        onMouseDown={(e) => {
                          if (e.button !== 0) return;
                          if (editing) return;
                          if (c.type === "Yes/No" && (e.target as HTMLElement).tagName === "INPUT") return;
                          selectCell(row.key, ci);
                          focus();
                        }}
                        onDoubleClick={() => { if (!editing) startEdit(); }}
                        onContextMenu={(e) => cellMenu(e, row, ci)}
                      >
                        {editing ? (
                          look ? (
                            <select
                              autoFocus
                              aria-label={`${c.name} value`}
                              defaultValue={edit.text ?? ""}
                              onMouseDown={(e) => e.stopPropagation()}
                              onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Escape") setEdit(null); }}
                              onChange={(e) => commitValue(row, ci, e.target.value, "tab")}
                              onBlur={() => setEdit(null)}
                              className="h-full w-full border-0 bg-white text-[12px] outline-none"
                            >
                              <option value="" />
                              {look.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                          ) : c.field?.inputMask && c.field.type === "Short Text" ? (
                            <MaskedInput mask={c.field.inputMask} initial={edit.text ?? ""} selectAll={edit.text !== undefined && edit.text.length > 1} onCommit={(t, how) => commitValue(row, ci, t, how)} onCancel={() => { setEdit(null); focus(); }} />
                          ) : (
                            <div className="relative h-full">
                              <InlineEdit
                                ariaLabel={`${c.name} value`}
                                value={edit.text ?? ""}
                                selectAll={edit.text !== undefined && edit.text.length > 1}
                                maxLength={c.field?.type === "Short Text" ? Number(c.field.size ?? 255) || 255 : undefined}
                                onCommit={(t, how) => commitValue(row, ci, t, how)}
                                onCancel={() => { setEdit(null); focus(); }}
                                onKey={(e, setText) => {
                                  if ((e.ctrlKey || e.metaKey) && e.key === ";") { e.preventDefault(); setText(formatDateSerial(TODAY)); return true; }
                                  if ((e.ctrlKey || e.metaKey) && (e.key === "'" || e.key === '"')) {
                                    e.preventDefault();
                                    const prev = displayRows[ri - 1];
                                    if (prev && c.field) setText(prev.vals[ci] === null ? "" : canonical(c.field, toStored(c.field, prev.vals[ci])));
                                    return true;
                                  }
                                  return false;
                                }}
                              />
                              {c.type === "Date/Time" && (
                                <button type="button" aria-label="Date Picker" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setEdit({ ...edit, calendar: !edit.calendar }); }} className="absolute right-0 top-0 h-full px-0.5">
                                  <AccIcon name="calendar" size={13} />
                                </button>
                              )}
                              {edit.calendar && <MiniCalendar value={isDate(v) ? v.$d : null} onPick={(s) => commitValue(row, ci, formatDateSerial(s), "none")} onClose={() => setEdit({ ...edit, calendar: false })} />}
                            </div>
                          )
                        ) : c.type === "Yes/No" ? (
                          <input
                            type="checkbox"
                            aria-label={`${c.name}`}
                            checked={Boolean(v)}
                            onChange={() => {
                              selectCell(row.key, ci);
                              commitValue(row, ci, v ? "No" : "Yes", "none");
                            }}
                            className="mx-auto block"
                          />
                        ) : (
                          <span className={`block truncate ${row.isNew && !text ? "" : ""} ${row.isNew && c.type === "AutoNumber" ? "text-gray-600" : ""}`}>{text}</span>
                        )}
                        {active && !editing && c.type === "Date/Time" && c.editable && (
                          <button type="button" aria-label="Date Picker" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setEdit({ row: row.key, col: ci, text: v === null ? "" : canonical(c.field!, toStored(c.field!, v)), calendar: true }); }} className="absolute right-0.5 top-0.5">
                            <AccIcon name="calendar" size={13} />
                          </button>
                        )}
                      </td>
                    );
                  })}
                  {table && <td className={`${cellBorder}`} style={{ background: bg }} />}
                </tr>
              );
            })}
            {view?.totalsOn && (
              <tr style={{ height: rowH }}>
                <td className="sticky left-0 border-b border-r border-t-2 border-[#c6c6c6] border-t-[#8a8a8a] bg-[#f3f3f3] px-0.5 text-[10px]">Total</td>
                {cols.map((c, ci) => {
                  const nums = c.type === "Number" || c.type === "Currency" || c.type === "AutoNumber";
                  const fn = view.totals?.[c.name] ?? "None";
                  return (
                    <td key={c.name} className={`border-t-2 border-t-[#8a8a8a] ${cellBorder} p-0 text-right`}>
                      <select
                        aria-label={`Total for ${c.caption}`}
                        value={fn}
                        onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: `col:${name}.${c.name}` }); }}
                        onChange={(e) => onCommit(cmd("datasheet.total", `${c.name}=${e.target.value}`))}
                        className="h-full w-full cursor-pointer appearance-none bg-transparent px-1 text-right text-[12px] outline-none"
                        title={fn === "None" ? "Click to choose a total" : fn}
                      >
                        {(nums ? TOTAL_FNS_NUM : TOTAL_FNS_TEXT).map((o) => <option key={o} value={o}>{o === "None" ? (fn === "None" ? "" : "None") : o}</option>)}
                      </select>
                      <span className="pointer-events-none absolute" />
                      {fn !== "None" && <div className="pointer-events-none -mt-[19px] px-1 text-right">{total(ci)}</div>}
                    </td>
                  );
                })}
                {table && <td className={cellBorder} />}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Record navigator */}
      <div className="flex h-[22px] shrink-0 items-center gap-1 border-t border-[#c6c6c6] bg-[#f3f3f3] px-1 text-[11px]">
        <span className="pr-1">Record:</span>
        <NavBtn icon="first" label="First record" onClick={() => displayRows[0] && selectCell(displayRows[0].key, Math.max(0, curCol))} />
        <NavBtn icon="prev" label="Previous record" onClick={() => move(-1, 0)} />
        <span className="min-w-[64px] border border-[#c6c6c6] bg-white px-1 text-center">{rowIndex >= 0 && displayRows[rowIndex]?.isNew ? `${recCount + 1} of ${recCount + 1}` : `${recNo} of ${recCount}`}</span>
        <NavBtn icon="next" label="Next record" onClick={() => move(1, 0)} />
        <NavBtn icon="last" label="Last record" onClick={() => rows.length && selectCell(rows[rows.length - 1].key, Math.max(0, curCol))} />
        <NavBtn icon="newRec" label="New (blank) record" disabled={!data.canAdd} onClick={() => selectCell(newId, 0)} />
        <button type="button" onClick={() => onCommit(cmd("home.toggleFilter"))} className={`ml-2 flex items-center gap-1 px-1 ${filtered ? "bg-[#fde5b4]" : "text-gray-500"}`}>
          <AccIcon name={filtered ? "filterOn" : "filter"} size={12} /> {filtered ? "Filtered" : (view?.filter ?? []).length ? "Unfiltered" : "No Filter"}
        </button>
        <span className="ml-1 flex items-center border border-[#c6c6c6] bg-white">
          <input
            aria-label="Search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              const s = e.target.value;
              setSearch(s);
              if (!s) return;
              for (const r of rows) {
                const ci = r.vals.findIndex((v, i) => (cols[i].field ? displayValue(cols[i].field, v) : formatValue(v, cols[i].type)).toLowerCase().includes(s.toLowerCase()));
                if (ci >= 0) {
                  onSelect({ selection: `cell:${name}.${r.key}.${cols[ci].name}` });
                  break;
                }
              }
            }}
            onKeyDown={(e) => e.stopPropagation()}
            className="h-[16px] w-28 px-1 text-[11px] outline-none"
          />
          <AccIcon name="search" size={11} className="mr-0.5" />
        </span>
      </div>

      {menu && <Menu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}
      {addMenu && (
        <Menu
          x={addMenu.x}
          y={addMenu.y}
          onClose={() => setAddMenu(null)}
          items={[
            ...["Short Text", "Number", "Large Number", "Currency", "Date & Time", "Date & Time Extended", "Yes/No", "Lookup & Relationship", "Long Text", "Attachment", "Hyperlink"].map((t) => ({
              label: t,
              onPick: () => {
                if (t === "Lookup & Relationship") { openDialog("backstage:lookupWizard"); return; }
                pendingRename.current = table?.fields.length ?? 0;
                onCommit(cmd("fields.add", t === "Date & Time" ? "Date/Time" : t === "Date & Time Extended" ? "Date/Time Extended" : t));
              },
            })),
          ]}
        />
      )}
      {filterMenu && (
        <FilterMenu
          col={cols[filterMenu.col]}
          x={filterMenu.x}
          y={filterMenu.y}
          values={distinct(filterMenu.col)}
          view={view}
          onClose={() => setFilterMenu(null)}
          onCommit={(c) => { setFilterMenu(null); onCommit(c); }}
          onCustom={(op) => { setCustom({ col: filterMenu.col, op, text: "" }); setFilterMenu(null); }}
        />
      )}
      {custom && (
        <Win
          title="Custom Filter"
          width={300}
          onClose={() => setCustom(null)}
          footer={
            <>
              <Btn primary onClick={() => { const c = cols[custom.col]; setCustom(null); onCommit(cmd("datasheet.filter", `${c.name}:${custom.op}:${custom.text}`)); }}>OK</Btn>
              <Btn onClick={() => setCustom(null)}>Cancel</Btn>
            </>
          }
        >
          <label className="flex flex-col gap-1">
            <span>{cols[custom.col]?.caption} {custom.op.toLowerCase()}</span>
            <TextIn ariaLabel="Custom filter value" value={custom.text} onChange={(t) => setCustom({ ...custom, text: t })} onEnter={() => { const c = cols[custom.col]; setCustom(null); onCommit(cmd("datasheet.filter", `${c.name}:${custom.op}:${custom.text}`)); }} />
          </label>
        </Win>
      )}
    </div>
  );
}

function toStored(f: AccField, v: V): never {
  if (isDate(v)) return formatDateSerial(v.$d) as never;
  return v as never;
}

function NavBtn({ icon, label, onClick, disabled }: { icon: string; label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick} className="flex h-[16px] w-[16px] items-center justify-center hover:bg-[#dcdcdc] disabled:opacity-30">
      <AccIcon name={icon} size={10} />
    </button>
  );
}

function FilterMenu({ col, x, y, values, view, onClose, onCommit, onCustom }: { col: { name: string; caption: string; type?: string }; x: number; y: number; values: string[]; view?: DatasheetView; onClose: () => void; onCommit: (c: SimCommit) => void; onCustom: (op: string) => void }) {
  const current = (view?.filter ?? []).find((f) => f.field === col.name && f.op === "in");
  const [checked, setChecked] = useState<Set<string>>(() => new Set(current ? (current.values ?? []).map((v) => (v === null ? "(Blanks)" : String(v))) : values.map((v) => v || "(Blanks)")));
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const down = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", down); };
  }, [onClose]);
  const isText = !col.type || col.type === "Short Text" || col.type === "Long Text";
  const isDateT = col.type === "Date/Time";
  const items = values.map((v) => v || "(Blanks)");
  const all = items.every((v) => checked.has(v));
  const ops = isText ? ["Equals", "Does Not Equal", "Begins With", "Contains", "Does Not Contain"] : isDateT ? ["Equals", "Does Not Equal", "Less Than", "Greater Than", "Between"] : ["Equals", "Does Not Equal", "Less Than", "Greater Than", "Between"];
  return (
    <div ref={ref} role="menu" className="fixed z-[200] w-[230px] border border-gray-300 bg-white py-1 text-[12px] shadow-xl" style={{ left: Math.max(8, x), top: y }} onKeyDown={(e) => e.stopPropagation()}>
      <button type="button" className="flex w-full items-center gap-2 px-2 py-1 text-left hover:bg-[#e5f1fb]" onClick={() => onCommit({ kind: "command", id: "home.sortAsc" })}>
        {isText ? "Sort A to Z" : isDateT ? "Sort Oldest to Newest" : "Sort Smallest to Largest"}
      </button>
      <button type="button" className="flex w-full items-center gap-2 px-2 py-1 text-left hover:bg-[#e5f1fb]" onClick={() => onCommit({ kind: "command", id: "home.sortDesc" })}>
        {isText ? "Sort Z to A" : isDateT ? "Sort Newest to Oldest" : "Sort Largest to Smallest"}
      </button>
      <div className="my-1 border-t border-gray-200" />
      <button type="button" disabled={!(view?.filter ?? []).some((f) => f.field === col.name)} className="flex w-full px-2 py-1 text-left hover:bg-[#e5f1fb] disabled:opacity-40" onClick={() => onCommit({ kind: "command", id: "datasheet.filter", value: `${col.name}:clear` })}>
        Clear filter from {col.caption}
      </button>
      <div className="px-2 py-1 font-semibold text-gray-600">{isText ? "Text Filters" : isDateT ? "Date Filters" : "Number Filters"}</div>
      {ops.map((o) => (
        <button key={o} type="button" className="flex w-full px-5 py-[2px] text-left hover:bg-[#e5f1fb]" onClick={() => onCustom(o)}>
          {o}...
        </button>
      ))}
      <div className="my-1 border-t border-gray-200" />
      <div className="mx-2 max-h-[150px] overflow-auto border border-gray-300 px-1 py-0.5">
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={all} onChange={() => setChecked(all ? new Set() : new Set(items))} />
          (Select All)
        </label>
        {items.map((v) => (
          <label key={v} className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={checked.has(v)}
              onChange={() => setChecked((s) => {
                const n = new Set(s);
                if (n.has(v)) n.delete(v);
                else n.add(v);
                return n;
              })}
            />
            <span className="truncate">{v}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-end gap-1.5 px-2 pt-1.5">
        <Btn
          primary
          onClick={() => {
            if (all) onCommit({ kind: "command", id: "datasheet.filter", value: `${col.name}:clear` });
            else onCommit({ kind: "command", id: "datasheet.filter", value: `${col.name}=${items.filter((v) => checked.has(v)).join("|")}` });
          }}
        >
          OK
        </Btn>
        <Btn onClick={onClose}>Cancel</Btn>
      </div>
    </div>
  );
}

export { MsgBox };
