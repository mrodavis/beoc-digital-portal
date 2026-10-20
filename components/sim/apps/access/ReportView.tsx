"use client";

import { useEffect, useMemo, useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { AccControl, AccessDoc, AccReport } from "./types";
import { displayValue, findField, findReport, findTable } from "./data";
import { parseSel } from "./model";
import { sourceFieldDef, sourceFields } from "./build";
import { compare, formatDateSerial, formatValue, NOW, TODAY, type V } from "./sql";
import { AccIcon } from "./icons";
import { InlineEdit, Menu } from "./ui";
import { evalControl, headerColor, sourceRows } from "./FormView";
import { FieldList, PropertySheet } from "./Panes";
import type { ViewProps } from "./Datasheet";
import type { PopoverItem } from "../../chrome/Ribbon";

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });
const FN_LABEL: Record<string, string> = { Sum: "Sum", Avg: "Avg", Count: "Count", Min: "Min", Max: "Max" };

type Line =
  | { kind: "gh"; level: number; field: string; value: V; rows: Record<string, V>[] }
  | { kind: "d"; row: Record<string, V> }
  | { kind: "gf"; level: number; field: string; value: V; rows: Record<string, V>[] };

/** Totals repeated in each group footer (not the report-footer-only record count). */
const groupTotals = (r: AccReport) => (r.totals ?? []).filter((t) => t.scope !== "report");

function buildLines(r: AccReport, rows: Record<string, V>[]): Line[] {
  const groups = r.groups ?? [];
  const sorts = r.sorts ?? [];
  const keys = [...groups.map((g) => ({ field: g.field, dir: g.dir ?? "asc" })), ...sorts];
  const sorted = rows.slice().sort((a, b) => {
    for (const k of keys) {
      const c = compare(a[k.field] ?? null, b[k.field] ?? null) ?? (a[k.field] === null ? -1 : 1);
      if (c) return k.dir === "desc" ? -c : c;
    }
    return 0;
  });
  const out: Line[] = [];
  const walk = (set: Record<string, V>[], level: number) => {
    if (level >= groups.length) {
      if (!r.summaryOnly) for (const row of set) out.push({ kind: "d", row });
      return;
    }
    const g = groups[level];
    let i = 0;
    while (i < set.length) {
      const v = set[i][g.field] ?? null;
      let j = i;
      while (j < set.length && compare(set[j][g.field] ?? null, v) === 0) j++;
      if (j === i) j = i + 1;
      const chunk = set.slice(i, j);
      if (g.header !== false) out.push({ kind: "gh", level, field: g.field, value: v, rows: chunk });
      walk(chunk, level + 1);
      if (g.footer || groupTotals(r).length) out.push({ kind: "gf", level, field: g.field, value: v, rows: chunk });
      i = j;
    }
  };
  walk(sorted, 0);
  return out;
}

function agg(fn: string, rows: Record<string, V>[], field: string): V {
  const vals = rows.map((x) => x[field] ?? null).filter((x) => x !== null);
  if (fn === "Count") return rows.length;
  const nums = vals.map((x) => (typeof x === "number" ? x : Number(x))).filter((x) => !Number.isNaN(x));
  if (!nums.length) return null;
  if (fn === "Sum") return Math.round(nums.reduce((a, b) => a + b, 0) * 1e6) / 1e6;
  if (fn === "Avg") return nums.reduce((a, b) => a + b, 0) / nums.length;
  if (fn === "Min") return Math.min(...nums);
  if (fn === "Max") return Math.max(...nums);
  return null;
}

export function ReportView(props: ViewProps) {
  const { doc, ui, tab, onSelect, onCommit, openDialog } = props;
  const r = findReport(doc, tab.name);
  const view = tab.view;
  const sel = parseSel(ui.selection);
  const [menu, setMenu] = useState<{ x: number; y: number; items: PopoverItem[] } | null>(null);
  const [editLabel, setEditLabel] = useState<string | null>(null);
  const [placing, setPlacing] = useState<string | null>(null);
  useEffect(() => setEditLabel(null), [doc]);
  const data = useMemo(() => (r ? sourceRows(doc, r.recordSource, tab.params) : { rows: [], ids: [], fields: [] as string[] }), [doc, r, tab.params]);
  if (!r) return null;
  const isLayout = view === "Layout View";
  const isDesign = view === "Design View";
  const isPreview = view === "Print Preview";
  const interactive = isLayout || isDesign;
  const table = findTable(doc, r.recordSource);
  const fieldDef = (name: string) => (table ? findField(table, name) : sourceFieldDef(doc, r.recordSource, name));
  const cap = (f: string) => r.captions?.[f] ?? fieldDef(f)?.caption ?? f;
  const fmt = (f: string, v: V) => {
    const fd = fieldDef(f);
    return fd ? displayValue(fd, v) : formatValue(v);
  };
  const groups = r.groups ?? [];
  const cols = [...(r.layout === "Stepped" || r.layout === "Block" ? groups.map((g) => g.field) : []), ...r.fields];
  const lines = buildLines(r, data.rows);
  const color = headerColor(r.theme);
  const landscape = r.orientation === "Landscape";
  const pageW = landscape ? 1056 : 816;
  const pageH = landscape ? 816 : 1056;
  const pad = r.margins === "Wide" ? 72 : r.margins === "Narrow" ? 24 : 36;
  const colW = Math.max(70, Math.floor((pageW - pad * 2) / Math.max(1, cols.length)));
  const k = (id: string) => `ctl:${r.name}.${id}`;
  const isSel = (id: string) => interactive && ui.selection === k(id);
  const extra = (section: string) => (r.controls ?? []).filter((c) => (c.section ?? "Detail") === section);

  const pick = (id: string) => (e: React.MouseEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    onSelect({ selection: k(id) });
  };
  const menuFor = (e: React.MouseEvent, id: string, field?: string) => {
    if (!interactive) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect({ selection: k(id) });
    const items: PopoverItem[] = [
      { key: "x", label: "Cut", icon: "cut", onPick: () => undefined },
      { key: "c", label: "Copy", icon: "copy", onPick: () => undefined },
      { key: "s", separator: true },
    ];
    if (field) {
      items.push(
        { key: "g", label: `Group On ${field}`, icon: "group", onPick: () => onCommit(cmd("report.addGroup", field)) },
        { key: "sa", label: "Sort A to Z", icon: "sortAsc", onPick: () => onCommit(cmd("report.addSort", field)) },
        { key: "t1", label: `Total ${field}: Sum`, icon: "sum", onPick: () => onCommit(cmd("report.totals", "Sum")) },
        { key: "t2", label: `Total ${field}: Count Records`, icon: "sum", onPick: () => onCommit(cmd("report.totals", "Count Records")) },
        { key: "s2", separator: true },
        { key: "dc", label: "Delete Column", icon: "deleteCells", onPick: () => onCommit(cmd("form.deleteControl")) },
      );
    } else items.push({ key: "d", label: "Delete", icon: "deleteCells", onPick: () => onCommit(cmd("form.deleteControl")) });
    items.push({ key: "s3", separator: true }, { key: "p", label: "Properties", icon: "options", onPick: () => { if (!doc.panes?.propertySheet) onCommit(cmd("design.propertySheet")); } });
    setMenu({ x: e.clientX, y: e.clientY, items });
  };

  const editable = (id: string, text: string, cls: string, style?: React.CSSProperties, field?: string) =>
    editLabel === id ? (
      <span className={`inline-block min-w-[120px] border border-[#f0a30a] bg-white ${cls}`}>
        <InlineEdit ariaLabel="Label text" value={text} onCommit={(v) => { setEditLabel(null); if (v !== text) onCommit({ kind: "type", target: `label:${r.name}.${id}`, value: v }); }} onCancel={() => setEditLabel(null)} />
      </span>
    ) : (
      <span className={`${cls} ${isSel(id) ? "outline outline-2 outline-[#f0a30a]" : ""}`} style={style} onMouseDown={pick(id)} onDoubleClick={() => interactive && setEditLabel(id)} onContextMenu={(e) => menuFor(e, id, field)}>
        {text}
      </span>
    );

  const placeIn = (section: string) => (e: React.MouseEvent) => {
    if (!interactive) return;
    if (e.target !== e.currentTarget) return;
    if (doc.tool === "Text Box" || doc.tool === "Label") {
      // The new control's text box takes the focus; keep the browser from moving it back to the window.
      e.preventDefault();
      setPlacing(section);
      return;
    }
    if (doc.tool) {
      onCommit(cmd("form.placeControl", `${doc.tool}@${section}`));
      onCommit(cmd("form.tool", ""));
      return;
    }
    onSelect({ selection: `sec:${r.name}.${section}` });
  };
  const placeInput = (section: string) =>
    placing === section ? (
      <span className="inline-block w-[240px] border border-[#f0a30a] bg-white">
        <InlineEdit
          ariaLabel="Control source"
          value=""
          placeholder={doc.tool === "Label" ? "Type the label text" : "Unbound: type =Sum([Field])"}
          onCommit={(v) => { setPlacing(null); if (v.trim()) onCommit({ kind: "type", target: `section:${r.name}.${section}`, value: v.trim() }); onCommit(cmd("form.tool", "")); }}
          onCancel={() => { setPlacing(null); onCommit(cmd("form.tool", "")); }}
        />
      </span>
    ) : null;
  const extras = (section: string, rows: Record<string, V>[], row?: Record<string, V>) =>
    extra(section).map((c: AccControl) => (
      <span key={c.id} className={`mx-1 inline-block min-w-[60px] px-1 ${isSel(c.id) ? "outline outline-2 outline-[#f0a30a]" : ""} ${isDesign ? "border border-[#c8c8c8] bg-white" : ""}`} style={{ fontWeight: c.bold ? 700 : undefined }} onMouseDown={pick(c.id)} onDoubleClick={() => interactive && setEditLabel(c.id)} onContextMenu={(e) => menuFor(e, c.id)}>
        {editLabel === c.id ? <InlineEdit ariaLabel="Control source" value={c.kind === "label" ? c.caption ?? "" : c.source ?? ""} onCommit={(v) => { setEditLabel(null); onCommit({ kind: "type", target: `label:${r.name}.${c.id}`, value: v }); }} onCancel={() => setEditLabel(null)} /> : c.kind === "label" ? c.caption : isDesign ? c.source ?? "Unbound" : c.source?.startsWith("=") ? evalControl(c.source, row, rows) : formatValue((row?.[c.source ?? ""] ?? null) as V)}
      </span>
    ));

  const sectionBar = (name: string) =>
    isDesign ? (
      <div
        className={`flex h-[18px] cursor-pointer items-center px-1 text-[11px] ${ui.selection === `sec:${r.name}.${name}` ? "bg-[#1f1f1f] text-white" : "bg-[#d9d9d9] text-gray-800"}`}
        onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: `sec:${r.name}.${name}` }); }}
        style={{ width: pageW }}
      >
        ▼ {name}
      </div>
    ) : null;

  const totalsFor = (rows: Record<string, V>[], label: string, idPrefix: string, inGroup = false) => {
    const totals = inGroup ? groupTotals(r) : r.totals ?? [];
    if (!totals.length) return null;
    return (
      <div className="flex border-t border-gray-400 pt-0.5" style={{ fontWeight: 600 }}>
        {cols.map((c, i) => {
          const t = totals.filter((x) => x.field === c);
          return (
            <div key={c} className="truncate px-1" style={{ width: colW, textAlign: t.length && t[0].fn !== "Count" ? "right" : undefined }}>
              {i === 0 && !t.length && <span className="text-gray-700">{label}</span>}
              {t.map((x) => (
                <span key={x.fn} className={`block ${isSel(`Total_${x.fn}_${x.field}`) ? "outline outline-2 outline-[#f0a30a]" : ""}`} onMouseDown={pick(`Total_${x.fn}_${x.field}`)} onContextMenu={(e) => menuFor(e, `Total_${x.fn}_${x.field}`)}>
                  {isDesign ? `=${x.fn}([${x.field}])` : x.fn === "Count" ? String(agg("Count", rows, x.field)) : fmt(x.field, agg(x.fn, rows, x.field))}
                </span>
              ))}
            </div>
          );
        })}
        <span className="sr-only">{idPrefix}</span>
      </div>
    );
  };

  const titleBlock = (
    <div className="flex items-end gap-2 pb-2" style={{ borderBottom: `2px solid ${color}` }} onMouseDown={placeIn("Report Header")}>
      {r.logo && <AccIcon name="report" size={28} />}
      {r.title !== undefined && r.title !== "" ? editable("Title", r.title, "text-[22px] font-light", { color }) : interactive ? <span className="text-gray-400" onDoubleClick={() => setEditLabel("Title")}>{editLabel === "Title" ? editable("Title", "", "") : "(no title)"}</span> : null}
      <span className="flex-1" />
      {r.dateTime && (
        <span className={`text-right text-[11px] ${isSel("Date") ? "outline outline-2 outline-[#f0a30a]" : ""}`} onMouseDown={pick("Date")} onContextMenu={(e) => menuFor(e, "Date")}>
          {isDesign ? "=Date()" : r.dateTime.date ? formatDateSerial(TODAY, r.dateTime.date) : ""}
          <br />
          {isDesign ? (r.dateTime.time ? "=Time()" : "") : r.dateTime.time ? formatDateSerial(NOW - TODAY, r.dateTime.time) : ""}
        </span>
      )}
      {extras("Report Header", data.rows)}
      {placeInput("Report Header")}
    </div>
  );

  const pageHeader = (
    <div className="flex border-b border-gray-300 pb-0.5 pt-1.5 font-semibold" style={{ color }} onMouseDown={placeIn("Page Header")}>
      {r.layout !== "Columnar" && r.layout !== "Justified" && cols.map((c) => (
        <div key={c} className="truncate px-1" style={{ width: colW }}>
          {editable(`${c}_Label`, cap(c), "block truncate", undefined, c)}
        </div>
      ))}
      {extras("Page Header", data.rows)}
      {placeInput("Page Header")}
    </div>
  );

  const renderLine = (ln: Line, i: number) => {
    if (ln.kind === "gh") {
      const g = groups[ln.level];
      const text = fmt(g.field, ln.value);
      if (r.layout === "Outline") return <div key={i} className="mt-1.5 font-semibold" style={{ paddingLeft: ln.level * 16 }}>{cap(g.field)} <span className="ml-2" onMouseDown={pick(g.field)}>{text}</span></div>;
      if (r.layout === "Block") return null;
      const ci = cols.indexOf(g.field);
      return (
        <div key={i} className="mt-1 flex font-semibold" onMouseDown={placeIn(`${g.field} Header`)}>
          {cols.map((c, j) => <div key={c} className="truncate px-1" style={{ width: colW }}>{j === ci || (ci < 0 && j === 0) ? <span className={isSel(g.field) ? "outline outline-2 outline-[#f0a30a]" : ""} onMouseDown={pick(g.field)} onContextMenu={(e) => menuFor(e, g.field)}>{isDesign ? g.field : text}</span> : null}</div>)}
          {extras(`${g.field} Header`, ln.rows, ln.rows[0])}
        </div>
      );
    }
    if (ln.kind === "gf") {
      const g = groups[ln.level];
      const n = ln.rows.length;
      return (
        <div key={i} className="mb-1.5" onMouseDown={placeIn(`${g.field} Footer`)}>
          {r.summaryLine && groupTotals(r).length > 0 && <div className="px-1 text-[11px] italic text-gray-600">{isDesign ? `="Summary for " & "'${g.field}' = " & [${g.field}]` : `Summary for '${g.field}' = ${fmt(g.field, ln.value)} (${n} detail record${n === 1 ? "" : "s"})`}</div>}
          {totalsFor(ln.rows, "Sum", `gf-${g.field}`, true)}
          {extras(`${g.field} Footer`, ln.rows, ln.rows[0])}
          {placeInput(`${g.field} Footer`)}
        </div>
      );
    }
    const row = ln.row;
    if (r.layout === "Columnar" || r.layout === "Justified") {
      return (
        <div key={i} className="mb-2 border-b border-gray-200 pb-1">
          {r.fields.map((f) => (
            <div key={f} className="flex gap-3">
              <span className="w-[130px] text-right font-semibold" style={{ color }}>{cap(f)}</span>
              <span className={isSel(f) ? "outline outline-2 outline-[#f0a30a]" : ""} onMouseDown={pick(f)}>{isDesign ? f : fmt(f, row[f] ?? null)}</span>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div key={i} className="flex">
        {cols.map((c) => {
          const isGroupCol = groups.some((g) => g.field === c);
          const v = row[c] ?? null;
          const num = typeof v === "number";
          return (
            <div key={c} className={`truncate px-1 ${isSel(c) ? "bg-[#fff1cc]" : ""}`} style={{ width: colW, textAlign: num ? "right" : undefined }} onMouseDown={pick(c)} onContextMenu={(e) => menuFor(e, c, c)}>
              {isGroupCol && r.layout === "Stepped" ? "" : isDesign ? c : fmt(c, v)}
            </div>
          );
        })}
        {extras("Detail", data.rows, row)}
      </div>
    );
  };

  const pageFooter = (page: number, pages: number) => (
    <div className="mt-2 flex border-t border-gray-300 pt-1 text-[11px] text-gray-700" onMouseDown={placeIn("Page Footer")}>
      <span className={isSel("Date") ? "" : ""}>{isDesign ? "=Now()" : formatDateSerial(TODAY, "Long Date")}</span>
      <span className="flex-1" />
      {r.pageNumbers && (r.pageNumbers.first !== false || page > 1) && r.pageNumbers.position.startsWith("Bottom") && (
        <span className={isSel("PageNumber") ? "outline outline-2 outline-[#f0a30a]" : ""} onMouseDown={pick("PageNumber")} onContextMenu={(e) => menuFor(e, "PageNumber")}>
          {isDesign ? (r.pageNumbers.format.includes("of") ? `="Page " & [Page] & " of " & [Pages]` : `="Page " & [Page]`) : r.pageNumbers.format.includes("of") ? `Page ${page} of ${pages}` : `Page ${page}`}
        </span>
      )}
      {extras("Page Footer", data.rows)}
      {placeInput("Page Footer")}
    </div>
  );

  const reportFooter = (
    <div className="mt-2" onMouseDown={placeIn("Report Footer")}>
      {(r.totals ?? []).length > 0 && totalsFor(data.rows, groups.length ? "Grand Total" : "", "rf")}
      {extras("Report Footer", data.rows)}
      {placeInput("Report Footer")}
    </div>
  );

  const topNumbers = r.pageNumbers && r.pageNumbers.position.startsWith("Top") ? <div className="text-right text-[11px]">{r.pageNumbers.format.includes("of") ? "Page 1 of 1" : "Page 1"}</div> : null;

  let content: React.ReactNode;
  if (isDesign) {
    content = (
      <div className="m-3 bg-white text-[12px] shadow" style={{ width: pageW }}>
        {sectionBar("Report Header")}
        <div className="px-3 py-1" style={{ backgroundImage: "radial-gradient(#d0d0d0 1px, transparent 1px)", backgroundSize: "12px 12px" }}>{titleBlock}</div>
        {sectionBar("Page Header")}
        <div className="px-3">{pageHeader}</div>
        {groups.filter((g) => g.header !== false).map((g) => (
          <div key={`h${g.field}`}>
            {sectionBar(`${g.field} Header`)}
            <div className="min-h-[22px] px-3" onMouseDown={placeIn(`${g.field} Header`)}><span className="border border-[#c8c8c8] px-1" onMouseDown={pick(g.field)}>{g.field}</span>{extras(`${g.field} Header`, [])}{placeInput(`${g.field} Header`)}</div>
          </div>
        ))}
        {sectionBar("Detail")}
        <div className="min-h-[24px] px-3" onMouseDown={placeIn("Detail")}>
          <div className="flex">{r.fields.map((f) => <div key={f} className={`mx-0.5 truncate border border-[#c8c8c8] bg-white px-1 ${isSel(f) ? "outline outline-2 outline-[#f0a30a]" : ""}`} style={{ width: colW - 4 }} onMouseDown={pick(f)} onContextMenu={(e) => menuFor(e, f, f)}>{f}</div>)}</div>
          {extras("Detail", [])}
          {placeInput("Detail")}
        </div>
        {groups.slice().reverse().filter((g) => g.footer || groupTotals(r).length).map((g) => (
          <div key={`f${g.field}`}>
            {sectionBar(`${g.field} Footer`)}
            <div className="min-h-[24px] px-3" onMouseDown={placeIn(`${g.field} Footer`)}>{totalsFor([], "", "d", true)}{extras(`${g.field} Footer`, [])}{placeInput(`${g.field} Footer`)}</div>
          </div>
        ))}
        {sectionBar("Page Footer")}
        <div className="px-3">{pageFooter(1, 1)}</div>
        {sectionBar("Report Footer")}
        <div className="min-h-[24px] px-3" onMouseDown={placeIn("Report Footer")}>{(r.totals ?? []).length ? totalsFor([], "", "rf") : null}{extras("Report Footer", [])}{placeInput("Report Footer")}</div>
      </div>
    );
  } else if (isPreview) {
    const lineH = 19;
    const usable = pageH - pad * 2 - 60;
    const first = Math.max(5, Math.floor((usable - 70) / lineH));
    const per = Math.max(5, Math.floor(usable / lineH));
    const pages: Line[][] = [[]];
    // Force New Page (Before Section) on a group header starts that group on a fresh page.
    const breakBefore = (ln: Line) => {
      if (ln.kind !== "gh") return false;
      const g = (r.groups ?? [])[ln.level];
      const fp = g?.forceNewPage ?? r.sectionProps?.[`${ln.field} Header`]?.["Force New Page"];
      return Boolean(fp && /before/i.test(fp));
    };
    for (const ln of lines) {
      const cur = pages[pages.length - 1];
      const cap = pages.length === 1 ? first : per;
      if (cur.length && (cur.length >= cap || breakBefore(ln))) pages.push([ln]);
      else cur.push(ln);
    }
    const total = pages.length;
    const page = Math.min(total, Math.max(1, tab.page ?? 1));
    const zoom = (tab.zoom ?? 100) / 100;
    const scale = 0.62 * zoom;
    const two = zoom <= 0.5;
    const show = two ? [page, Math.min(total, page + 1)].filter((p, i, a) => a.indexOf(p) === i) : [page];
    content = (
      <div className="flex min-h-full flex-col items-center gap-4 bg-[#9b9b9b] p-4">
        <div className="flex gap-4">
          {show.map((p) => (
            <div key={p} className="bg-white shadow-xl" style={{ width: pageW * scale * (two ? 1.6 : 1), height: pageH * scale * (two ? 1.6 : 1), overflow: "hidden" }}>
              <div style={{ width: pageW, height: pageH, transform: `scale(${scale * (two ? 1.6 : 1)})`, transformOrigin: "top left", padding: pad, fontSize: 12 }} className="flex flex-col">
                {topNumbers}
                {p === 1 && titleBlock}
                {pageHeader}
                <div className="flex-1">{pages[p - 1]?.map(renderLine)}</div>
                {p === total && reportFooter}
                {pageFooter(p, total)}
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 flex items-center gap-1 rounded bg-[#f3f3f3] px-2 py-0.5 text-[11px] shadow">
          Page:
          <button type="button" aria-label="First page" onClick={() => onCommit(cmd("preview.page", "1"))} className="px-1 hover:bg-gray-200"><AccIcon name="first" size={10} /></button>
          <button type="button" aria-label="Previous page" onClick={() => onCommit(cmd("preview.page", String(Math.max(1, page - 1))))} className="px-1 hover:bg-gray-200"><AccIcon name="prev" size={10} /></button>
          <span className="border border-gray-300 bg-white px-2">{page}</span>
          <button type="button" aria-label="Next page" onClick={() => onCommit(cmd("preview.page", String(Math.min(total, page + 1))))} className="px-1 hover:bg-gray-200"><AccIcon name="next" size={10} /></button>
          <button type="button" aria-label="Last page" onClick={() => onCommit(cmd("preview.page", String(total)))} className="px-1 hover:bg-gray-200"><AccIcon name="last" size={10} /></button>
          <span className="ml-2 text-gray-600">{r.pageSize ?? "Letter"} · {r.orientation} · {r.margins ?? "Normal"} margins · {total} page{total === 1 ? "" : "s"}</span>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="m-3 bg-white p-4 text-[12px] shadow" style={{ width: pageW }} onMouseDown={(e) => { if (e.target === e.currentTarget && interactive) onSelect({ selection: `form:${r.name}` }); }}>
        {topNumbers}
        {titleBlock}
        {pageHeader}
        {lines.map(renderLine)}
        {reportFooter}
        {pageFooter(1, 1)}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 bg-[#e8e8e8]">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-auto">{content}</div>
        {interactive && doc.panes?.groupSort && <GroupSortPane doc={doc} report={r} onCommit={onCommit} />}
      </div>
      {interactive && doc.panes?.fieldList && <FieldList doc={doc} source={r.recordSource} onAdd={(v) => onCommit(cmd("form.addField", v))} onClose={() => onCommit(cmd("pane.close", "fieldList"))} />}
      {interactive && doc.panes?.propertySheet && <PropertySheet doc={doc} ui={ui} onCommit={onCommit} onSelect={onSelect} onClose={() => onCommit(cmd("pane.close", "propertySheet"))} />}
      {menu && <Menu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}
      <span className="hidden">{openDialog.name}</span>
    </div>
  );
}

function GroupSortPane({ doc, report, onCommit }: { doc: AccessDoc; report: AccReport; onCommit: (c: SimCommit) => void }) {
  // The field list is a floating menu: the pane scrolls, so an inline popup would be clipped.
  const [pickFor, setPickFor] = useState<{ kind: "group" | "sort"; x: number; y: number } | null>(null);
  const openPick = (kind: "group" | "sort", e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPickFor(pickFor?.kind === kind ? null : { kind, x: r.left, y: r.bottom });
  };
  const [more, setMore] = useState<string | null>(null);
  const fields = sourceFields(doc, report.recordSource).map((f) => f.name);
  const isText = (f: string) => {
    const t = sourceFields(doc, report.recordSource).find((x) => x.name === f)?.type;
    return !t || t === "Short Text" || t === "Long Text";
  };
  const order = (f: string, dir?: string) => (isText(f) ? (dir === "desc" ? "with Z on top" : "with A on top") : dir === "desc" ? "from largest to smallest" : "from smallest to largest");
  return (
    <div className="max-h-[42%] shrink-0 overflow-auto border-t border-[#c6c6c6] bg-white text-[12px]" aria-label="Group, Sort, and Total">
      <div className="flex h-6 items-center justify-between bg-[#f3f3f3] px-2 font-semibold">
        Group, Sort, and Total
        <button type="button" aria-label="Close Group, Sort, and Total" onClick={() => onCommit(cmd("report.groupSort"))} className="px-1 font-normal hover:bg-gray-200">✕</button>
      </div>
      <div className="flex flex-col gap-1 p-2">
        {(report.groups ?? []).map((g) => (
          <div key={`g${g.field}`} className="border border-[#d6d6d6] bg-[#fafafa] px-2 py-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span>Group on</span>
              <span className="font-semibold">{g.field}</span>
              <select aria-label={`Order for ${g.field}`} value={order(g.field, g.dir)} onChange={(e) => onCommit(cmd("report.groupOption", `${g.field}|${e.target.value}`))} onKeyDown={(e) => e.stopPropagation()} className="border border-gray-300 text-[12px]">
                {[order(g.field, "asc"), order(g.field, "desc")].map((o) => <option key={o}>{o}</option>)}
              </select>
              <button type="button" onClick={() => setMore(more === g.field ? null : g.field)} className="text-[#0063b1] hover:underline">{more === g.field ? "Less ◀" : "More ▶"}</button>
              <span className="flex-1" />
              <button type="button" aria-label={`Delete group on ${g.field}`} onClick={() => onCommit(cmd("report.deleteGroup", g.field))} className="px-1 hover:bg-red-100">✕</button>
            </div>
            {more === g.field && (
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11.5px]">
                <span>by entire value,</span>
                <span>{(report.totals ?? []).length ? `with ${(report.totals ?? []).map((t) => t.field).join(", ")} totaled` : "with no totals"},</span>
                <select aria-label="Header section" value={g.header === false ? "without a header section" : "with a header section"} onChange={(e) => onCommit(cmd("report.groupOption", `${g.field}|${e.target.value}`))} onKeyDown={(e) => e.stopPropagation()} className="border border-gray-300">
                  <option>with a header section</option>
                  <option>without a header section</option>
                </select>
                <select aria-label="Footer section" value={g.footer ? "with a footer section" : "without a footer section"} onChange={(e) => onCommit(cmd("report.groupOption", `${g.field}|${e.target.value}`))} onKeyDown={(e) => e.stopPropagation()} className="border border-gray-300">
                  <option>with a footer section</option>
                  <option>without a footer section</option>
                </select>
                <select aria-label="Keep together" value={g.keepTogether === "Whole Group" ? "keep whole group together on one page" : "do not keep group together on one page"} onChange={(e) => onCommit(cmd("report.groupOption", `${g.field}|${e.target.value}`))} onKeyDown={(e) => e.stopPropagation()} className="border border-gray-300">
                  <option>do not keep group together on one page</option>
                  <option>keep whole group together on one page</option>
                  <option>keep header and first record together on one page</option>
                </select>
              </div>
            )}
          </div>
        ))}
        {(report.sorts ?? []).map((s) => (
          <div key={`s${s.field}`} className="flex items-center gap-1.5 border border-[#d6d6d6] bg-[#fafafa] px-2 py-1">
            <span>Sort by</span>
            <span className="font-semibold">{s.field}</span>
            <select aria-label={`Order for ${s.field}`} value={order(s.field, s.dir)} onChange={(e) => onCommit(cmd("report.groupOption", `${s.field}|${e.target.value}`))} onKeyDown={(e) => e.stopPropagation()} className="border border-gray-300 text-[12px]">
              {[order(s.field, "asc"), order(s.field, "desc")].map((o) => <option key={o}>{o}</option>)}
            </select>
            <span className="flex-1" />
            <button type="button" aria-label={`Delete sort on ${s.field}`} onClick={() => onCommit(cmd("report.deleteGroup", s.field))} className="px-1 hover:bg-red-100">✕</button>
          </div>
        ))}
        <div className="relative flex gap-2 pt-1">
          <button type="button" onClick={(e) => openPick("group", e)} className="flex items-center gap-1 border border-[#c6c6c6] bg-white px-2 py-[2px] hover:bg-[#e5f1fb]"><AccIcon name="plus" size={11} />Add a group</button>
          <button type="button" onClick={(e) => openPick("sort", e)} className="flex items-center gap-1 border border-[#c6c6c6] bg-white px-2 py-[2px] hover:bg-[#e5f1fb]"><AccIcon name="plus" size={11} />Add a sort</button>
          {pickFor && (
            <Menu
              x={pickFor.x}
              y={pickFor.y}
              onClose={() => setPickFor(null)}
              items={fields.map((f) => ({ key: f, label: f, onPick: () => { const k = pickFor.kind; setPickFor(null); onCommit(cmd(k === "group" ? "report.addGroup" : "report.addSort", f)); } }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** Database Documenter output in Print Preview. */
export function DocumenterView({ tab }: { tab: { doc?: string[]; zoom?: number } }) {
  const lines = tab.doc ?? [];
  const scale = 0.62 * ((tab.zoom ?? 100) / 100);
  return (
    <div className="flex min-h-full justify-center bg-[#9b9b9b] p-4">
      <div className="bg-white shadow-xl" style={{ width: 816 * scale, minHeight: 1056 * scale }}>
        <div style={{ width: 816, transform: `scale(${scale})`, transformOrigin: "top left", padding: 48, fontSize: 12 }}>
          <div className="mb-3 flex justify-between text-[11px] text-gray-600"><span>C:\Users\Student\Documents</span><span>{formatDateSerial(TODAY, "Long Date")}</span></div>
          {lines.map((l, i) => {
            if (l.startsWith("#")) return <div key={i} className="mb-1 mt-4 border-b-2 border-black pb-0.5 text-[15px] font-bold">{l.slice(1)}</div>;
            const parts = l.split("|");
            return (
              <div key={i} className="grid grid-cols-[150px_1fr_160px_70px] gap-2 border-b border-gray-100 py-[1px]">
                {parts.map((p, j) => <span key={j} className={j === 0 ? "font-semibold" : ""}>{p}</span>)}
              </div>
            );
          })}
          <div className="mt-6 text-right text-[11px]">Page: 1</div>
        </div>
      </div>
    </div>
  );
}
