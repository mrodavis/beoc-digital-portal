"use client";

import { useRef, useState } from "react";
import type { SimCommit } from "@/types/sim";
import { relKey, relType } from "./data";
import { parseSel } from "./model";
import { AccIcon } from "./icons";
import { Menu } from "./ui";
import { AddTablesPane, listFields } from "./QueryDesign";
import type { ViewProps } from "./Datasheet";
import type { PopoverItem } from "../../chrome/Ribbon";

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });
const BOX_W = 160;
const HEAD_H = 22;
const ROW_H = 17;

export function Relationships({ doc, ui, onSelect, onCommit, openDialog }: ViewProps) {
  const layout = doc.relLayout ?? [];
  const sel = parseSel(ui.selection);
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>({});
  const [menu, setMenu] = useState<{ x: number; y: number; items: PopoverItem[] } | null>(null);
  const [drag, setDrag] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const posOf = (t: string, i: number) => pos[t] ?? { x: 24 + i * 220, y: 20 + (i % 2) * 34 };
  const fieldRowY = (t: string, f: string) => {
    const i = layout.indexOf(t);
    const p = posOf(t, i);
    const k = listFields(doc, t).findIndex((x) => x.name.toLowerCase() === f.toLowerCase());
    return p.y + HEAD_H + (k + 0.5) * ROW_H + 2;
  };

  const startMove = (e: React.MouseEvent, t: string, i: number) => {
    if (e.button !== 0) return;
    e.preventDefault();
    onSelect({ selection: `reltable:${t}` });
    const p0 = posOf(t, i);
    const x0 = e.clientX, y0 = e.clientY;
    const mv = (ev: MouseEvent) => setPos((p) => ({ ...p, [t]: { x: Math.max(0, p0.x + ev.clientX - x0), y: Math.max(0, p0.y + ev.clientY - y0) } }));
    const up = () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
  };

  const startFieldDrag = (e: React.MouseEvent, table: string, field: string) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const box = areaRef.current?.getBoundingClientRect();
    const ox = (box?.left ?? 0) - (areaRef.current?.scrollLeft ?? 0), oy = (box?.top ?? 0) - (areaRef.current?.scrollTop ?? 0);
    setDrag({ x1: e.clientX - ox, y1: e.clientY - oy, x2: e.clientX - ox, y2: e.clientY - oy });
    const mv = (ev: MouseEvent) => setDrag((d) => (d ? { ...d, x2: ev.clientX - ox, y2: ev.clientY - oy } : d));
    const up = (ev: MouseEvent) => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
      setDrag(null);
      const el = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
      const hit = el?.closest("[data-relfield]") as HTMLElement | null;
      if (!hit) return;
      const [t2, f2] = (hit.dataset.relfield ?? "").split("|");
      if (!t2 || t2 === table) return;
      openDialog(`backstage:editRelationship|${table}|${field}|${t2}|${f2}`);
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
  };

  const lineMenu = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect({ selection: key });
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { key: "e", label: "Edit Relationship...", icon: "smartart", onPick: () => openDialog("backstage:editRelationship|edit") },
        { key: "d", label: "Delete", icon: "deleteCells", onPick: () => onCommit(cmd("relationships.deleteRequest")) },
      ],
    });
  };

  const tableMenu = (e: React.MouseEvent, t: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect({ selection: `reltable:${t}` });
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { key: "d", label: "Table Design", icon: "layout", onPick: () => onCommit(cmd("nav.view", `table:${t}|Design View`)) },
        { key: "h", label: "Hide Table", icon: "close", onPick: () => onCommit(cmd("relationships.hideTable")) },
      ],
    });
  };

  return (
    <div className="flex h-full min-h-0 bg-white">
      <div
        ref={areaRef}
        tabIndex={0}
        className="relative min-h-0 min-w-0 flex-1 overflow-auto outline-none"
        onMouseDown={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "svg") onSelect({ selection: "" }); }}
        onKeyDown={(e) => {
          if (e.key === "Delete" && sel.k === "rel") { e.preventDefault(); e.stopPropagation(); onCommit(cmd("relationships.deleteRequest")); }
          if (e.key === "Delete" && sel.k === "reltable") { e.preventDefault(); e.stopPropagation(); onCommit(cmd("relationships.hideTable")); }
        }}
        onContextMenu={(e) => {
          if (e.target !== e.currentTarget && (e.target as HTMLElement).tagName !== "svg") return;
          e.preventDefault();
          setMenu({ x: e.clientX, y: e.clientY, items: [{ key: "a", label: "Add Tables...", icon: "table", onPick: () => onCommit(cmd("relationships.showTable")) }, { key: "s", label: "Show All", icon: "smartart", onPick: () => onCommit(cmd("relationships.all")) }] });
        }}
        aria-label="Relationships window"
      >
        <svg className="absolute left-0 top-0" width="1800" height="900" style={{ pointerEvents: "none" }}>
          {doc.relationships.map((r) => {
            const ia = layout.indexOf(r.table), ib = layout.indexOf(r.relatedTable);
            if (ia < 0 || ib < 0) return null;
            const pa = posOf(r.table, ia), pb = posOf(r.relatedTable, ib);
            const aLeft = pa.x <= pb.x;
            const x1 = aLeft ? pa.x + BOX_W : pa.x;
            const x2 = aLeft ? pb.x : pb.x + BOX_W;
            const y1 = fieldRowY(r.table, r.field);
            const y2 = fieldRowY(r.relatedTable, r.relatedField);
            const key = `rel:${relKey(r)}`;
            const on = ui.selection === key;
            const stub = aLeft ? 14 : -14;
            const d = `M${x1} ${y1} H${x1 + stub} L${x2 - stub} ${y2} H${x2}`;
            const type = relType(doc, r);
            return (
              <g key={key}>
                <path d={d} stroke="transparent" strokeWidth="10" fill="none" style={{ pointerEvents: "stroke", cursor: "pointer" }} onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: key }); }} onDoubleClick={() => { onSelect({ selection: key }); openDialog("backstage:editRelationship|edit"); }} onContextMenu={(e) => lineMenu(e as unknown as React.MouseEvent, key)} />
                <path d={d} stroke="#222" strokeWidth={on ? 3 : r.enforce ? 2 : 1.2} fill="none" />
                {r.enforce && <text x={x1 + (aLeft ? 3 : -10)} y={y1 - 4} fontSize="11" fontWeight="600" fill="#222">1</text>}
                {r.enforce && type === "One-To-Many" && <text x={x2 + (aLeft ? -14 : 3)} y={y2 - 3} fontSize="15" fill="#222">∞</text>}
                {r.enforce && type === "One-To-One" && <text x={x2 + (aLeft ? -10 : 3)} y={y2 - 4} fontSize="11" fontWeight="600" fill="#222">1</text>}
              </g>
            );
          })}
          {drag && <line x1={drag.x1} y1={drag.y1} x2={drag.x2} y2={drag.y2} stroke="#555" strokeDasharray="3 2" />}
        </svg>
        {layout.map((t, i) => {
          const p = posOf(t, i);
          const fl = listFields(doc, t);
          const on = sel.k === "reltable" && sel.table === t;
          return (
            <div key={t} className={`absolute border bg-white shadow ${on ? "border-[#a4373a]" : "border-[#8a8a8a]"}`} style={{ left: p.x, top: p.y, width: BOX_W }} onContextMenu={(e) => tableMenu(e, t)}>
              <div className={`flex h-[22px] cursor-move items-center px-1.5 ${on ? "bg-[#a4373a] text-white" : "bg-[#e6e6e6]"}`} onMouseDown={(e) => startMove(e, t, i)} onDoubleClick={() => onCommit(cmd("nav.view", `table:${t}|Design View`))}>
                <span className="truncate text-[12px]">{t}</span>
              </div>
              <div className="py-[2px]">
                {fl.map((f) => (
                  <div key={f.name} data-relfield={`${t}|${f.name}`} className="flex h-[17px] cursor-default items-center gap-1 px-1.5 text-[12px] hover:bg-[#e5f1fb]" onMouseDown={(e) => startFieldDrag(e, t, f.name)} title={`Drag ${f.name} onto the matching field in another table`}>
                    {f.pk ? <AccIcon name="key" size={10} /> : <span className="w-[10px]" />}
                    <span className="truncate">{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {!layout.length && <p className="absolute left-4 top-4 text-[12px] text-gray-500">Use Relationship Design › Add Tables to add tables to this window.</p>}
      </div>
      {doc.panes?.addTables && <AddTablesPane doc={doc} onAdd={(n) => onCommit(cmd("relationships.addTable", n))} onClose={() => onCommit(cmd("pane.close", "addTables"))} />}
      {menu && <Menu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}
    </div>
  );
}
