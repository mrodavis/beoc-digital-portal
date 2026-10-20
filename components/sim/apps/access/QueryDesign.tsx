"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { AccessDoc, AccQuery, AccQueryCol } from "./types";
import { TOTAL_FUNCS } from "./types";
import { fieldNames, findQuery, findTable, dataSource } from "./data";
import { colKey, normalizeFieldCell, queryText, splitField } from "./query";
import { parseSel } from "./model";
import { normalizeCriteria } from "./sql";
import { AccIcon } from "./icons";
import { Btn, Menu } from "./ui";
import type { ViewProps } from "./Datasheet";
import type { PopoverItem } from "../../chrome/Ribbon";

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });

/** Fields shown in a field list (tables or queries). */
export function listFields(doc: AccessDoc, name: string): { name: string; pk?: boolean }[] {
  const t = findTable(doc, name);
  if (t) return t.fields.map((f) => ({ name: f.name, pk: t.pk?.some((k) => k.toLowerCase() === f.name.toLowerCase()) }));
  const q = findQuery(doc, name);
  if (q) {
    try {
      const src = dataSource(doc).rows(q.name);
      return (src?.fields ?? []).map((f) => ({ name: f.name }));
    } catch {
      return [];
    }
  }
  return [];
}

/** The Add Tables pane (Query Design and the Relationships window). */
export function AddTablesPane({ doc, onAdd, onClose, exclude }: { doc: AccessDoc; onAdd: (name: string) => void; onClose: () => void; exclude?: string }) {
  const [tab, setTab] = useState<"Tables" | "Links" | "Queries" | "All">("Tables");
  const [pick, setPick] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const tables = doc.tables.filter((t) => t.saved !== false && !t.hidden).map((t) => t.name);
  const queries = doc.queries.filter((x) => x.saved !== false && x.name !== exclude).map((x) => x.name);
  const items = (tab === "Tables" ? tables : tab === "Queries" ? queries : tab === "Links" ? doc.tables.filter((t) => t.linked).map((t) => t.name) : [...tables, ...queries]).filter((n) => n.toLowerCase().includes(q.toLowerCase()));
  return (
    <aside className="flex w-[200px] shrink-0 flex-col border-l border-[#c6c6c6] bg-white text-[12px]" aria-label="Add Tables">
      <div className="flex h-7 items-center justify-between px-2">
        <span className="font-semibold">Add Tables</span>
        <button type="button" aria-label="Close Add Tables" onClick={onClose} className="px-1 hover:bg-gray-100">✕</button>
      </div>
      <div role="tablist" className="flex gap-2 border-b border-[#e1e1e1] px-2 text-[11.5px]">
        {(["Tables", "Links", "Queries", "All"] as const).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`pb-0.5 ${tab === t ? "border-b-2 border-[#a4373a] font-semibold" : "text-gray-600"}`}>{t}</button>
        ))}
      </div>
      <div className="m-2 flex items-center border border-[#c6c6c6] px-1">
        <input aria-label="Search tables" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-5 min-w-0 flex-1 text-[12px] outline-none" />
        <AccIcon name="search" size={11} />
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-1">
        {items.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setPick(n)}
            onDoubleClick={() => onAdd(n)}
            className={`flex w-full items-center gap-1.5 px-1 py-[2px] text-left ${pick === n ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`}
          >
            <AccIcon name={doc.tables.some((t) => t.name === n) ? "table" : "query"} size={14} />
            {n}
          </button>
        ))}
        {!items.length && <p className="px-1 py-2 text-gray-500">No objects.</p>}
      </div>
      <div className="p-2">
        <Btn primary disabled={!pick} onClick={() => pick && onAdd(pick)} className="w-full">Add Selected Tables</Btn>
      </div>
    </aside>
  );
}

const ROWS_FOR = (q: AccQuery): string[] => {
  const base = ["Field", "Table"];
  if (q.type === "Update") return [...base, "Update To", "Criteria", "Or"];
  if (q.type === "Delete") return [...base, "Delete", "Criteria", "Or"];
  if (q.type === "Crosstab") return [...base, "Total", "Crosstab", "Sort", "Criteria", "Or"];
  if (q.type === "Append") return [...base, ...(q.totals ? ["Total"] : []), "Sort", "Append To", "Criteria", "Or", "Or2"];
  return [...base, ...(q.totals ? ["Total"] : []), "Sort", "Show", "Criteria", "Or", "Or2"];
};

export function QueryDesign({ doc, ui, tab, onSelect, onCommit, openDialog, showMsg }: ViewProps) {
  const q = findQuery(doc, tab.name);
  const sel = parseSel(ui.selection);
  const [menu, setMenu] = useState<{ x: number; y: number; items: PopoverItem[] } | null>(null);
  const [drag, setDrag] = useState<{ table: string; field: string; x: number; y: number } | null>(null);
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>({});
  const upperRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(0.42);
  if (!q) return null;
  const tablePos = (t: string, i: number) => pos[t] ?? { x: 16 + i * 175, y: 12 };
  const rows = ROWS_FOR(q);
  const cols: (AccQueryCol | null)[] = [...q.cols, ...Array.from({ length: Math.max(4, 8 - q.cols.length) }).map(() => null)];
  const allFields = fieldNames(doc, q.tables);
  const target = q.target ? findTable(doc, q.target) : undefined;

  const ROW_H = 17;
  const fieldY = (t: string, f: string, i: number) => {
    const fl = listFields(doc, t);
    const k = fl.findIndex((x) => x.name.toLowerCase() === f.toLowerCase());
    return tablePos(t, i).y + 22 + (k + 1) * ROW_H + ROW_H / 2;
  };

  const startFieldDrag = (e: React.MouseEvent, table: string, field: string) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const box = upperRef.current?.getBoundingClientRect();
    const st = { table, field, x: e.clientX - (box?.left ?? 0), y: e.clientY - (box?.top ?? 0) };
    setDrag(st);
    const mv = (ev: MouseEvent) => setDrag((d) => (d ? { ...d, x: ev.clientX - (box?.left ?? 0), y: ev.clientY - (box?.top ?? 0) } : d));
    const up = (ev: MouseEvent) => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
      setDrag(null);
      const el = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
      const fieldEl = el?.closest("[data-qfield]") as HTMLElement | null;
      const colEl = el?.closest("[data-qgridcol]") as HTMLElement | null;
      if (fieldEl) {
        const [t2, f2] = (fieldEl.dataset.qfield ?? "").split("|");
        if (t2 && t2 !== table && f2 !== "*") onCommit(cmd("query.join", `${table}.${field}=${t2}.${f2}`));
      } else if (colEl) {
        onCommit(cmd("query.addField", `${table}.${field}`));
      }
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
  };

  const startMove = (e: React.MouseEvent, t: string, i: number) => {
    if (e.button !== 0) return;
    e.preventDefault();
    onSelect({ selection: `qtable:${q.name}.${t}` });
    const p0 = tablePos(t, i);
    const x0 = e.clientX, y0 = e.clientY;
    const mv = (ev: MouseEvent) => setPos((p) => ({ ...p, [t]: { x: Math.max(0, p0.x + ev.clientX - x0), y: Math.max(0, p0.y + ev.clientY - y0) } }));
    const up = () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
  };

  const commitCell = (col: AccQueryCol | null, row: string, raw: string) => {
    const key = col ? colKey(col) : "new";
    let v = raw;
    if (row === "Criteria" || row.startsWith("Or")) v = normalizeCriteria(raw, allFields);
    if (row === "Update To") v = normalizeCriteria(raw, allFields);
    if (row === "Field") v = normalizeFieldCell(raw);
    if (!col && row !== "Field") return;
    const cur = col ? cellValue(col, row) : "";
    if (cur === v) return;
    onCommit({ kind: "type", target: `qcell:${q.name}.${key}.${row}`, value: v });
  };

  const tableMenu = (e: React.MouseEvent, t: string) => {
    e.preventDefault();
    onSelect({ selection: `qtable:${q.name}.${t}` });
    setMenu({ x: e.clientX, y: e.clientY, items: [{ key: "r", label: "Remove Table", icon: "deleteCells", onPick: () => onCommit(cmd("query.removeTable")) }, { key: "p", label: "Properties...", icon: "options", onPick: () => onCommit(cmd("design.propertySheet")) }] });
  };

  const joinMenu = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect({ selection: key });
    setMenu({ x: e.clientX, y: e.clientY, items: [{ key: "j", label: "Join Properties", icon: "options", onPick: () => openDialog("joinProperties") }, { key: "d", label: "Delete", icon: "deleteCells", onPick: () => onCommit(cmd("query.deleteJoin")) }] });
  };

  return (
    <div className="flex h-full min-h-0 bg-white text-[12px]">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Upper pane */}
        <div
          ref={upperRef}
          className="relative min-h-0 overflow-auto border-b border-[#c6c6c6] bg-[#fafafa]"
          style={{ flex: `${split} 1 0` }}
          tabIndex={0}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onSelect({ selection: `qprops:${q.name}` }); }}
          onKeyDown={(e) => {
            if (e.key === "Delete" && sel.k === "qtable") { e.preventDefault(); e.stopPropagation(); onCommit(cmd("query.removeTable")); }
            if (e.key === "Delete" && sel.k === "qjoin") { e.preventDefault(); e.stopPropagation(); onCommit(cmd("query.deleteJoin")); }
          }}
          aria-label="Query design tables"
        >
          <svg className="pointer-events-none absolute left-0 top-0" width="2000" height="600">
            {(q.joins ?? []).map((j, k) => {
              const li = q.tables.indexOf(j.left), ri = q.tables.indexOf(j.right);
              if (li < 0 || ri < 0) return null;
              const lp = tablePos(j.left, li), rp = tablePos(j.right, ri);
              const leftIsLeft = lp.x <= rp.x;
              const x1 = leftIsLeft ? lp.x + 150 : lp.x, x2 = leftIsLeft ? rp.x : rp.x + 150;
              const y1 = fieldY(j.left, j.leftField, li), y2 = fieldY(j.right, j.rightField, ri);
              const key = `qjoin:${q.name}.${j.left}.${j.leftField}-${j.right}.${j.rightField}`;
              const on = ui.selection === key;
              const rel = doc.relationships.find((r) => r.enforce && r.table === j.left && r.relatedTable === j.right && r.field === j.leftField);
              const d = `M${x1} ${y1} H${(x1 + x2) / 2} V${y2} H${x2}`;
              return (
                <g key={k}>
                  <path d={d} stroke="transparent" strokeWidth="9" fill="none" style={{ pointerEvents: "stroke", cursor: "pointer" }} onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: key }); }} onDoubleClick={() => { onSelect({ selection: key }); openDialog("joinProperties"); }} onContextMenu={(e) => joinMenu(e as unknown as React.MouseEvent, key)} />
                  <path d={d} stroke="#333" strokeWidth={on ? 2.6 : 1.2} fill="none" />
                  {j.type === "left" && <path d={`M${x2 - 7} ${y2 - 4} L${x2} ${y2} L${x2 - 7} ${y2 + 4}`} fill="#333" />}
                  {j.type === "right" && <path d={`M${x1 + (leftIsLeft ? 7 : -7)} ${y1 - 4} L${x1} ${y1} L${x1 + (leftIsLeft ? 7 : -7)} ${y1 + 4}`} fill="#333" />}
                  {rel && <text x={x1 + (leftIsLeft ? 4 : -10)} y={y1 - 3} fontSize="10" fill="#333">1</text>}
                  {rel && <text x={x2 + (leftIsLeft ? -12 : 4)} y={y2 - 3} fontSize="12" fill="#333">∞</text>}
                </g>
              );
            })}
            {drag && <line x1={drag.x - 2} y1={drag.y - 2} x2={drag.x} y2={drag.y} stroke="#333" />}
          </svg>
          {q.tables.map((t, i) => {
            const p = tablePos(t, i);
            const on = sel.k === "qtable" && sel.table === t;
            const fl = listFields(doc, t);
            return (
              <div key={t} className={`absolute w-[150px] border bg-white shadow-sm ${on ? "border-[#a4373a]" : "border-[#9a9a9a]"}`} style={{ left: p.x, top: p.y }} onContextMenu={(e) => tableMenu(e, t)}>
                <div className={`flex h-[22px] cursor-move items-center justify-between px-1.5 ${on ? "bg-[#a4373a] text-white" : "bg-[#e9e9e9]"}`} onMouseDown={(e) => startMove(e, t, i)}>
                  <span className="truncate">{t}</span>
                  <button type="button" aria-label={`Remove ${t}`} onMouseDown={(e) => e.stopPropagation()} onClick={() => { onSelect({ selection: `qtable:${q.name}.${t}` }); onCommit(cmd("query.removeTable")); }} className="ml-1 text-[10px] opacity-60 hover:opacity-100">✕</button>
                </div>
                <div className="max-h-[150px] overflow-auto">
                  {[{ name: "*" }, ...fl].map((f) => (
                    <div
                      key={f.name}
                      data-qfield={`${t}|${f.name}`}
                      className="flex h-[17px] cursor-default items-center gap-1 px-1.5 hover:bg-[#e5f1fb]"
                      onMouseDown={(e) => startFieldDrag(e, t, f.name)}
                      onDoubleClick={() => onCommit(cmd("query.addField", `${t}.${f.name}`))}
                      title={`Double-click to add ${f.name} to the grid`}
                    >
                      {"pk" in f && f.pk ? <AccIcon name="key" size={10} /> : <span className="w-[10px]" />}
                      <span className="truncate">{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {!q.tables.length && <p className="absolute left-4 top-4 text-gray-500">Add tables from the Add Tables pane (Query Design › Add Tables).</p>}
        </div>
        <div
          className="h-[4px] shrink-0 cursor-row-resize bg-[#e1e1e1]"
          onMouseDown={(e) => {
            e.preventDefault();
            const parent = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
            const mv = (ev: MouseEvent) => setSplit(Math.max(0.2, Math.min(0.75, (ev.clientY - parent.top) / parent.height)));
            const up = () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
            window.addEventListener("mousemove", mv);
            window.addEventListener("mouseup", up);
          }}
        />
        {/* Design grid */}
        <div className="min-h-0 overflow-auto" style={{ flex: `${1 - split} 1 0` }}>
          <table className="border-separate border-spacing-0" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-[72px] min-w-[72px] bg-white" />
                {cols.map((c, i) => (
                  <th
                    key={i}
                    data-qgridcol={i}
                    className={`h-[9px] w-[132px] min-w-[132px] cursor-pointer border-r border-[#c6c6c6] ${sel.k === "qcol" && sel.n === i + 1 ? "bg-[#1f1f1f]" : "bg-[#d6d6d6] hover:bg-[#bdbdbd]"}`}
                    onMouseDown={() => c && onSelect({ selection: `qcol:${q.name}.${i + 1}` })}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (!c) return;
                      onSelect({ selection: `qcol:${q.name}.${i + 1}` });
                      setMenu({ x: e.clientX, y: e.clientY, items: [{ key: "x", label: "Cut", icon: "cut", onPick: () => undefined }, { key: "c", label: "Copy", icon: "copy", onPick: () => undefined }, { key: "s", separator: true }, { key: "i", label: "Insert Columns", icon: "insertCells", onPick: () => onCommit(cmd("query.insertColumns")) }, { key: "d", label: "Delete Columns", icon: "deleteCells", onPick: () => onCommit(cmd("query.deleteColumns")) }, { key: "p", label: "Properties...", icon: "options", onPick: () => onCommit(cmd("design.propertySheet")) }] });
                    }}
                    aria-label={`Column selector ${i + 1}`}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r} className="h-[20px]">
                  <th className="sticky left-0 z-10 border-b border-r border-[#e1e1e1] bg-white px-1.5 text-left font-normal text-gray-700">{r === "Or2" ? "" : r === "Or" ? "or:" : `${r}:`}</th>
                  {cols.map((c, i) => (
                    <td key={i} data-qgridcol={i} className={`border-b border-r border-[#e1e1e1] p-0 ${sel.k === "qcol" && sel.n === i + 1 ? "bg-[#dce6f4]" : ""}`}>
                      <GridCell q={q} col={c} row={r} tables={q.tables} fields={c ? listFields(doc, c.table ?? q.tables[0] ?? "").map((f) => f.name) : []} allFields={q.tables.flatMap((t) => [`${t}.*`, ...listFields(doc, t).map((f) => f.name)])} targetFields={target?.fields.map((f) => f.name) ?? []} onCommit={(v) => commitCell(c, r, v)} onFocus={() => c && onSelect({ selection: `qcol:${q.name}.${i + 1}` })} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {doc.panes?.addTables && <AddTablesPane doc={doc} exclude={q.name} onAdd={(n) => onCommit(cmd("query.addTable", n))} onClose={() => onCommit(cmd("pane.close", "addTables"))} />}
      {menu && <Menu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}
    </div>
  );
}

function cellValue(c: AccQueryCol, row: string): string {
  switch (row) {
    case "Field": return c.field;
    case "Table": return c.table ?? "";
    case "Total": return c.total ?? "Group By";
    case "Sort": return c.sort ?? "";
    case "Show": return c.show === false ? "No" : "Yes";
    case "Criteria": return c.criteria ?? "";
    case "Update To": return c.updateTo ?? "";
    case "Append To": return c.appendTo ?? "";
    case "Crosstab": return c.crosstab ?? "";
    case "Delete": return c.total === "Where" || c.criteria ? "Where" : "From";
    case "Or": return c.or?.[0] ?? "";
    case "Or2": return c.or?.[1] ?? "";
  }
  return "";
}

function GridCell({ q, col, row, tables, fields, allFields, targetFields, onCommit, onFocus }: { q: AccQuery; col: AccQueryCol | null; row: string; tables: string[]; fields: string[]; allFields: string[]; targetFields: string[]; onCommit: (v: string) => void; onFocus: () => void }) {
  const value = col ? cellValue(col, row) : "";
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  const sel = (opts: string[], v: string, blank = false) => (
    <select aria-label={`${row}${col ? ` for ${colKey(col)}` : ""}`} disabled={!col} value={v} onFocus={onFocus} onMouseDown={stop} onKeyDown={stop} onChange={(e) => onCommit(e.target.value)} className="h-[19px] w-full bg-transparent px-0.5 text-[12px] outline-none disabled:opacity-0">
      {blank && <option value="" />}
      {opts.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
  if (row === "Table") return sel(tables, col?.table ?? "", !col?.table);
  if (row === "Total") return sel([...TOTAL_FUNCS], value);
  if (row === "Sort") return sel(["(not sorted)", "Ascending", "Descending"], value || "(not sorted)");
  if (row === "Crosstab") return sel(["Row Heading", "Column Heading", "Value", "(not shown)"], value, !value);
  if (row === "Append To") return sel(targetFields, value, true);
  if (row === "Delete") return <div className="h-[19px] px-1 text-gray-700">{col ? value : ""}</div>;
  if (row === "Show")
    return (
      <div className="flex h-[19px] items-center justify-center">
        {col && <input type="checkbox" aria-label={`Show ${colKey(col)}`} checked={col.show !== false} onFocus={onFocus} onMouseDown={stop} onChange={(e) => onCommit(e.target.checked ? "Yes" : "No")} />}
      </div>
    );
  const listId = row === "Field" ? `qf-${q.name.replace(/\W/g, "")}` : undefined;
  return (
    <>
      <input
        aria-label={`${row}${col ? ` for ${colKey(col)}` : ""}`}
        list={listId}
        disabled={!col && row !== "Field"}
        value={text}
        onFocus={onFocus}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => { if (text !== value) onCommit(text); }}
        onMouseDown={stop}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          if (e.key === "Escape") { setText(value); (e.target as HTMLInputElement).blur(); }
        }}
        className="h-[19px] w-full bg-transparent px-1 text-[12px] outline-none focus:bg-[#fffbe6]"
      />
      {listId && (
        <datalist id={listId}>
          {Array.from(new Set(col ? fields : allFields)).map((f) => <option key={f} value={f} />)}
        </datalist>
      )}
    </>
  );
}

/** SQL view: the learner types SQL; edits are kept as they type. */
export function SqlView({ doc, tab, onCommit }: ViewProps) {
  const q = findQuery(doc, tab.name);
  const source = useMemo(() => {
    if (!q) return "";
    try {
      return queryText(doc, q);
    } catch {
      return "SELECT\nFROM;";
    }
  }, [doc, q]);
  const [text, setText] = useState(source);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const last = useRef(source);
  useEffect(() => {
    if (source !== last.current) {
      setText(source);
      last.current = source;
    }
  }, [source]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  if (!q) return null;
  const flush = (v: string) => {
    if (timer.current) clearTimeout(timer.current);
    if (v !== last.current) {
      last.current = v;
      onCommit({ kind: "command", id: "sql.edit", value: v });
    }
  };
  return (
    <div className="flex h-full flex-col bg-white">
      <textarea
        aria-label={`SQL view for ${q.name}`}
        spellCheck={false}
        value={text}
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => flush(v), 300);
        }}
        onBlur={() => flush(text)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
            e.preventDefault();
            flush(text);
            onCommit({ kind: "command", id: "file.save" });
          }
        }}
        className="h-full w-full resize-none p-2 font-mono text-[13px] leading-[1.45] text-[#1f1f1f] outline-none"
        style={{ fontFamily: "Consolas, 'Courier New', monospace" }}
      />
    </div>
  );
}

export { splitField };
