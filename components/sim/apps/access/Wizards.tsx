"use client";

import { useMemo, useState } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { BackstageProps } from "../../types";
import type { AccessDoc, AccRelationship } from "./types";
import { findForm, findTable, orientRel, relProblem, relType, findField } from "./data";
import { activeTab, BUTTON_ACTIONS, joinOptions, parseSel } from "./model";
import { sourceFields } from "./build";
import { AccIcon } from "./icons";
import { Btn, Check, Combo, FieldPicker, ListBox, MsgBox, Radio, TextIn, Win, Wizard, bridge } from "./ui";
import { FORM_LAYOUTS, FORM_OPEN, IMPORT_MODES, LOOKUP_SOURCES, PK_OPTIONS, QUERY_OPEN, QUERY_WIZARDS, REPORT_LAYOUTS, REPORT_OPEN } from "./dialogs";

const PAGES = ["formWizard", "reportWizard", "queryWizard", "importExcel", "exportExcel", "exportPdf", "exportText", "savedExports", "lookupWizard", "editRelationship", "documenter", "analyzeTable", "tabOrder", "buttonWizard"];
export const isWizardPage = (p: string) => PAGES.includes(p.split("|")[0]);

type Props = BackstageProps<AccessDoc> & { page: string };

/** Tables and saved queries, as wizards list them ("Table: X", "Query: Y"). */
function sources(doc: AccessDoc): string[] {
  return [...doc.tables.filter((t) => t.saved !== false).map((t) => `Table: ${t.name}`), ...doc.queries.filter((q) => q.saved !== false).map((q) => `Query: ${q.name}`)];
}
const srcName = (s: string) => s.replace(/^(Table|Query):\s*/, "");

/** The object a wizard starts on: the one selected in the Navigation Pane or open. */
function defaultSource(doc: AccessDoc): string {
  const s = parseSel(bridge.selection);
  const all = sources(doc);
  if (s.k === "nav" && (s.kind === "table" || s.kind === "query")) return `${s.kind === "table" ? "Table" : "Query"}: ${s.name}`;
  const t = activeTab(doc);
  if (t && (t.kind === "table" || t.kind === "query")) {
    const v = `${t.kind === "table" ? "Table" : "Query"}: ${t.name}`;
    if (all.includes(v)) return v;
  }
  return all[0] ?? "";
}

function defaultObject(doc: AccessDoc, ctx?: string): string {
  if (ctx) return ctx;
  const s = parseSel(bridge.selection);
  if (s.k === "nav" && s.kind !== "macro" && s.kind !== "module") return s.name;
  const t = activeTab(doc);
  if (t && t.kind !== "relationships" && t.kind !== "documenter" && t.kind !== "macro") return t.name;
  return doc.tables[0]?.name ?? "";
}

export function WizardHost(props: Props) {
  const [name, ...ctx] = props.page.split("|");
  switch (name) {
    case "formWizard": return <FormWizard {...props} />;
    case "reportWizard": return <ReportWizard {...props} />;
    case "queryWizard": return <QueryWizard {...props} />;
    case "importExcel": return <ImportWizard {...props} />;
    case "exportExcel":
    case "exportPdf":
    case "exportText": return <ExportDialog {...props} kind={name} object={defaultObject(props.doc, ctx[0])} />;
    case "savedExports": return <SavedExports {...props} />;
    case "lookupWizard": return <LookupWizard {...props} ctx={ctx} />;
    case "editRelationship": return <EditRelationships {...props} ctx={ctx} />;
    case "documenter": return <Documenter {...props} />;
    case "analyzeTable": return <TableAnalyzer {...props} />;
    case "tabOrder": return <TabOrder {...props} />;
    case "buttonWizard": return <ButtonWizard {...props} section={ctx[0]} />;
  }
  return null;
}

const finish = (p: Props, id: string, values: Record<string, SimValue>) => {
  p.onCommit({ kind: "dialog", id, values } as SimCommit);
  p.onClose();
};

/* ------------------------------------------------------------------ */
/* Form Wizard                                                         */
/* ------------------------------------------------------------------ */

function FormWizard(p: Props) {
  const { doc } = p;
  const [page, setPage] = useState(0);
  const [source, setSource] = useState(defaultSource(doc));
  const [fields, setFields] = useState<string[]>([]);
  const [layout, setLayout] = useState("Columnar");
  const [title, setTitle] = useState(srcName(defaultSource(doc)));
  const [open, setOpen] = useState(FORM_OPEN[0]);
  const avail = sourceFields(doc, srcName(source)).map((f) => f.name);
  const done = () => finish(p, "backstage:formWizard", { source, fields: fields.join(","), layout, title, open });
  return (
    <Wizard title="Form Wizard" page={page} pages={3} setPage={setPage} onCancel={p.onClose} onFinish={done} canNext={fields.length > 0} canFinish={fields.length > 0 && Boolean(title.trim())} heading={["Which fields do you want on your form?", "What layout would you like for your form?", "What title do you want for your form?"][page]}>
      {page === 0 && (
        <>
          <p className="text-gray-600">You can choose from more than one table or query.</p>
          <label className="flex flex-col gap-0.5">Tables/Queries<Combo ariaLabel="Tables/Queries" value={source} options={sources(doc)} onChange={(v) => { setSource(v); setFields([]); setTitle(srcName(v)); }} width={300} /></label>
          <FieldPicker available={avail} selected={fields} onChange={setFields} />
        </>
      )}
      {page === 1 && (
        <div className="flex gap-6">
          <div className="flex h-[150px] w-[200px] items-center justify-center border border-gray-300 bg-white">
            <div className="flex flex-col gap-1 p-2">{[0, 1, 2, 3].map((i) => <div key={i} className="flex gap-1">{layout === "Tabular" || layout === "Datasheet" ? [0, 1, 2].map((j) => <span key={j} className="h-3 w-12 bg-[#a4373a]/30" />) : <><span className="h-3 w-10 bg-gray-300" /><span className="h-3 w-24 bg-[#a4373a]/30" /></>}</div>)}</div>
          </div>
          <div className="flex flex-col gap-1.5">{FORM_LAYOUTS.map((l) => <Radio key={l} name="fl" label={l} checked={layout === l} onChange={() => setLayout(l)} />)}</div>
        </div>
      )}
      {page === 2 && (
        <>
          <TextIn ariaLabel="Form title" value={title} onChange={setTitle} width={320} />
          <p className="mt-2">That&apos;s all the information the wizard needs to create your form.</p>
          <p>Do you want to open the form or modify the form&apos;s design?</p>
          {FORM_OPEN.map((o) => <Radio key={o} name="fo" label={o} checked={open === o} onChange={() => setOpen(o)} />)}
        </>
      )}
    </Wizard>
  );
}

/* ------------------------------------------------------------------ */
/* Report Wizard                                                       */
/* ------------------------------------------------------------------ */

function ReportWizard(p: Props) {
  const { doc } = p;
  const [page, setPage] = useState(0);
  const [source, setSource] = useState(defaultSource(doc));
  const [fields, setFields] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [sorts, setSorts] = useState<{ field: string; dir: "Ascending" | "Descending" }[]>([{ field: "", dir: "Ascending" }]);
  const [summary, setSummary] = useState<Record<string, string[]>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [summaryMode, setSummaryMode] = useState("Detail and Summary");
  const [layout, setLayout] = useState("Stepped");
  const [orientation, setOrientation] = useState("Portrait");
  const [title, setTitle] = useState(srcName(defaultSource(doc)));
  const [open, setOpen] = useState(REPORT_OPEN[0]);
  const [groupPick, setGroupPick] = useState<string | null>(null);
  const all = sourceFields(doc, srcName(source));
  const avail = all.map((f) => f.name);
  const numeric = fields.filter((f) => ["Number", "Currency"].includes(all.find((x) => x.name === f)?.type ?? "") && !groups.includes(f));
  const detail = fields.filter((f) => !groups.includes(f));
  const effLayout = groups.length ? layout : layout === "Stepped" || layout === "Block" || layout === "Outline" ? "Tabular" : layout;
  const done = () =>
    finish(p, "backstage:reportWizard", {
      source,
      fields: fields.join(","),
      groups: groups.join(","),
      sorts: sorts.filter((s) => s.field).map((s) => `${s.field}:${s.dir === "Descending" ? "desc" : "asc"}`).join(","),
      summary: Object.entries(summary).flatMap(([f, fns]) => fns.map((fn) => `${f}:${fn}`)).join(","),
      summaryMode,
      layout: effLayout,
      orientation,
      title,
      open,
    });
  const heads = ["Which fields do you want on your report?", "Do you want to add any grouping levels?", "What sort order and summary information do you want for detail records?", "How would you like to lay out your report?", "What title do you want for your report?"];
  return (
    <Wizard title="Report Wizard" page={page} pages={5} setPage={setPage} onCancel={p.onClose} onFinish={done} canNext={fields.length > 0} canFinish={fields.length > 0 && Boolean(title.trim())} heading={heads[page]} width={600}>
      {page === 0 && (
        <>
          <p className="text-gray-600">You can choose from more than one table or query.</p>
          <label className="flex flex-col gap-0.5">Tables/Queries<Combo ariaLabel="Tables/Queries" value={source} options={sources(doc)} onChange={(v) => { setSource(v); setFields([]); setGroups([]); setTitle(srcName(v)); }} width={300} /></label>
          <FieldPicker available={avail} selected={fields} onChange={(f) => { setFields(f); setGroups((g) => g.filter((x) => f.includes(x))); }} />
        </>
      )}
      {page === 1 && (
        <div className="flex gap-3">
          <div className="w-44">
            <ListBox ariaLabel="Fields" items={fields.filter((f) => !groups.includes(f))} value={groupPick} onPick={setGroupPick} onDouble={(f) => setGroups((g) => [...g, f])} height={170} />
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <Btn className="!min-w-[36px]" onClick={() => groupPick && setGroups((g) => (g.includes(groupPick) ? g : [...g, groupPick]))} title="Add a grouping level">&gt;</Btn>
            <Btn className="!min-w-[36px]" onClick={() => setGroups((g) => g.slice(0, -1))} title="Remove a grouping level">&lt;</Btn>
          </div>
          <div className="flex-1 border border-gray-300 bg-white p-2">
            {groups.map((g, i) => <div key={g} className="font-semibold text-[#1f4e79]" style={{ paddingLeft: i * 14 }}>{g}</div>)}
            <div className="text-gray-600" style={{ paddingLeft: groups.length * 14 }}>{detail.join(", ")}</div>
          </div>
        </div>
      )}
      {page === 2 && (
        <>
          <p className="text-gray-600">You can sort records by up to four fields, in either ascending or descending order.</p>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-4 text-right">{i + 1}</span>
              <Combo ariaLabel={`Sort field ${i + 1}`} value={sorts[i]?.field ?? ""} options={["", ...detail]} onChange={(v) => setSorts((s) => { const n = s.slice(); n[i] = { field: v, dir: n[i]?.dir ?? "Ascending" }; return n; })} width={220} />
              <Btn className="!min-w-[90px]" onClick={() => setSorts((s) => { const n = s.slice(); if (n[i]) n[i] = { ...n[i], dir: n[i].dir === "Ascending" ? "Descending" : "Ascending" }; return n; })}>{sorts[i]?.dir ?? "Ascending"}</Btn>
            </div>
          ))}
          {numeric.length > 0 && <Btn className="mt-2 w-36" onClick={() => setShowSummary(true)}>Summary Options...</Btn>}
          {showSummary && (
            <Win title="Summary Options" width={460} onClose={() => setShowSummary(false)} footer={<><Btn primary onClick={() => setShowSummary(false)}>OK</Btn><Btn onClick={() => setShowSummary(false)}>Cancel</Btn></>}>
              <p className="mb-2">What summary values would you like calculated?</p>
              <div className="grid grid-cols-[1fr_repeat(4,48px)] gap-1">
                <span className="font-semibold">Field</span>
                {["Sum", "Avg", "Min", "Max"].map((h) => <span key={h} className="text-center font-semibold">{h}</span>)}
                {numeric.map((f) => (
                  <div key={f} className="contents">
                    <span>{f}</span>
                    {["Sum", "Avg", "Min", "Max"].map((fn) => (
                      <span key={fn} className="text-center">
                        <input type="checkbox" aria-label={`${fn} of ${f}`} checked={(summary[f] ?? []).includes(fn)} onChange={(e) => setSummary((s) => ({ ...s, [f]: e.target.checked ? [...(s[f] ?? []), fn] : (s[f] ?? []).filter((x) => x !== fn) }))} />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <fieldset className="mt-2 flex flex-col gap-1 border border-gray-300 p-2">
                <legend className="px-1">Show</legend>
                {["Detail and Summary", "Summary Only"].map((m) => <Radio key={m} name="sm" label={m} checked={summaryMode === m} onChange={() => setSummaryMode(m)} />)}
              </fieldset>
            </Win>
          )}
        </>
      )}
      {page === 3 && (
        <div className="flex gap-6">
          <fieldset className="flex flex-col gap-1 border border-gray-300 p-2">
            <legend className="px-1">Layout</legend>
            {(groups.length ? ["Stepped", "Block", "Outline"] : ["Columnar", "Tabular", "Justified"]).map((l) => <Radio key={l} name="rl" label={l} checked={effLayout === l} onChange={() => setLayout(l)} />)}
          </fieldset>
          <fieldset className="flex flex-col gap-1 border border-gray-300 p-2">
            <legend className="px-1">Orientation</legend>
            {["Portrait", "Landscape"].map((o) => <Radio key={o} name="ro" label={o} checked={orientation === o} onChange={() => setOrientation(o)} />)}
          </fieldset>
          <span className="sr-only">{REPORT_LAYOUTS.join()}</span>
        </div>
      )}
      {page === 4 && (
        <>
          <TextIn ariaLabel="Report title" value={title} onChange={setTitle} width={320} />
          <p className="mt-2">That&apos;s all the information the wizard needs to create your report.</p>
          <p>Do you want to preview the report or modify the report&apos;s design?</p>
          {REPORT_OPEN.map((o) => <Radio key={o} name="ropen" label={o} checked={open === o} onChange={() => setOpen(o)} />)}
        </>
      )}
    </Wizard>
  );
}

/* ------------------------------------------------------------------ */
/* Query Wizard                                                        */
/* ------------------------------------------------------------------ */

function QueryWizard(p: Props) {
  const { doc } = p;
  const [kind, setKind] = useState<string | null>(null);
  const [pick, setPick] = useState(QUERY_WIZARDS[0]);
  const [page, setPage] = useState(0);
  const [source, setSource] = useState(defaultSource(doc));
  const [fields, setFields] = useState<string[]>([]);
  const [detail, setDetail] = useState("Detail (shows every field of every record)");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(QUERY_OPEN[0]);
  const [rows, setRows] = useState<string[]>([]);
  const [colH, setColH] = useState("");
  const [value, setValue] = useState("");
  const [fn, setFn] = useState("Count");
  const [rowSums, setRowSums] = useState(true);
  const [dups, setDups] = useState<string[]>([]);
  const [related, setRelated] = useState("");
  const [match, setMatch] = useState("");
  const [relField, setRelField] = useState("");
  const [sumOpts, setSumOpts] = useState<Record<string, string>>({});
  const flds = sourceFields(doc, srcName(source));
  const avail = flds.map((f) => f.name);
  if (!kind) {
    return (
      <Win title="New Query" width={480} onClose={p.onClose} footer={<><Btn primary onClick={() => { setKind(pick); setTitle(`${srcName(source)} ${pick.startsWith("Simple") ? "Query" : pick.startsWith("Crosstab") ? "_Crosstab" : pick.includes("Duplicates") ? "Duplicates" : "Without Matching"}`.replace(" _", "_")); }}>OK</Btn><Btn onClick={p.onClose}>Cancel</Btn></>}>
        <div className="flex gap-3">
          <div className="flex w-44 flex-col items-center justify-center border border-gray-300 bg-white p-2 text-center text-[11px] text-gray-600">
            {pick === "Simple Query Wizard" ? "This wizard creates a select query from the fields you pick." : pick === "Crosstab Query Wizard" ? "This wizard creates a crosstab query that displays data in a compact, spreadsheet-like format." : pick === "Find Duplicates Query Wizard" ? "This wizard creates a query that finds records with duplicate field values in a single table or query." : "This wizard creates a query that finds records (rows) in one table that have no related records in another table."}
          </div>
          <div className="flex-1"><ListBox ariaLabel="New Query" items={QUERY_WIZARDS} value={pick} onPick={setPick} onDouble={(v) => { setPick(v); setKind(v); }} height={120} /></div>
        </div>
      </Win>
    );
  }
  const name = title.trim();
  if (kind === "Simple Query Wizard") {
    const numeric = fields.filter((f) => ["Number", "Currency"].includes(flds.find((x) => x.name === f)?.type ?? ""));
    const done = () => finish(p, "backstage:queryWizard", { wizard: kind, source, fields: fields.join(","), detail, summary: Object.entries(sumOpts).filter(([, v]) => v).map(([f, v]) => `${f}:${v}`).join(","), title: name, open });
    const pages = numeric.length ? 3 : 2;
    return (
      <Wizard title="Simple Query Wizard" page={page} pages={pages} setPage={setPage} onCancel={p.onClose} onFinish={done} canNext={fields.length > 0} canFinish={fields.length > 0 && Boolean(name)} heading={page === 0 ? "Which fields do you want in your query?" : page === 1 && numeric.length ? "Would you like a detail or summary query?" : "What title do you want for your query?"}>
        {page === 0 && (
          <>
            <p className="text-gray-600">You can choose from more than one table or query.</p>
            <label className="flex flex-col gap-0.5">Tables/Queries<Combo ariaLabel="Tables/Queries" value={source} options={sources(doc)} onChange={(v) => { setSource(v); setFields([]); setTitle(`${srcName(v)} Query`); }} width={300} /></label>
            <FieldPicker available={avail} selected={fields} onChange={setFields} />
          </>
        )}
        {page === 1 && numeric.length > 0 && (
          <div className="flex flex-col gap-2">
            {["Detail (shows every field of every record)", "Summary"].map((d) => <Radio key={d} name="ds" label={d} checked={detail === d} onChange={() => setDetail(d)} />)}
            {detail === "Summary" && (
              <div className="ml-6 grid grid-cols-[1fr_repeat(4,44px)] gap-1 border border-gray-300 bg-white p-2">
                <span className="font-semibold">Field</span>
                {["Sum", "Avg", "Min", "Max"].map((h) => <span key={h} className="text-center font-semibold">{h}</span>)}
                {numeric.map((f) => (
                  <div key={f} className="contents">
                    <span>{f}</span>
                    {["Sum", "Avg", "Min", "Max"].map((x) => <span key={x} className="text-center"><input type="radio" name={`s-${f}`} aria-label={`${x} of ${f}`} checked={sumOpts[f] === x} onChange={() => setSumOpts((s) => ({ ...s, [f]: x }))} /></span>)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {page === pages - 1 && (
          <>
            <TextIn ariaLabel="Query title" value={title} onChange={setTitle} width={320} />
            <p className="mt-2">That&apos;s all the information the wizard needs to create your query.</p>
            <p>Do you want to open the query or modify the query&apos;s design?</p>
            {QUERY_OPEN.map((o) => <Radio key={o} name="qo" label={o} checked={open === o} onChange={() => setOpen(o)} />)}
          </>
        )}
      </Wizard>
    );
  }
  if (kind === "Crosstab Query Wizard") {
    const done = () => finish(p, "backstage:queryWizard", { wizard: kind, source, rowHeadings: rows.join(","), columnHeading: colH, value, fn, rowSums, title: name, open });
    const heads = ["Which table or query contains the fields you want for the crosstab query results?", "Which fields' values do you want as row headings?", "Which field's values do you want as column headings?", "What number do you want calculated for each column and row intersection?", "What do you want to name your query?"];
    return (
      <Wizard title="Crosstab Query Wizard" page={page} pages={5} setPage={setPage} onCancel={p.onClose} onFinish={done} canNext={page === 1 ? rows.length > 0 : page === 2 ? Boolean(colH) : page === 3 ? Boolean(value) : true} canFinish={rows.length > 0 && Boolean(colH) && Boolean(value) && Boolean(name)} heading={heads[page]}>
        {page === 0 && <ListBox ariaLabel="Tables/Queries" items={sources(doc)} value={source} onPick={(v) => { setSource(v); setRows([]); setColH(""); setValue(""); setTitle(`${srcName(v)}_Crosstab`); }} height={170} />}
        {page === 1 && (<><p className="text-gray-600">You can select up to three fields.</p><FieldPicker available={avail} selected={rows} onChange={(r) => setRows(r.slice(0, 3))} height={150} /></>)}
        {page === 2 && <ListBox ariaLabel="Column heading" items={avail.filter((f) => !rows.includes(f))} value={colH} onPick={setColH} height={170} />}
        {page === 3 && (
          <div className="flex gap-4">
            <div className="flex-1"><div className="mb-0.5">Fields:</div><ListBox ariaLabel="Fields" items={avail.filter((f) => !rows.includes(f) && f !== colH)} value={value} onPick={setValue} height={150} /></div>
            <div className="flex-1"><div className="mb-0.5">Functions:</div><ListBox ariaLabel="Functions" items={["Avg", "Count", "First", "Last", "Max", "Min", "StDev", "Sum", "Var"]} value={fn} onPick={setFn} height={150} /></div>
            <div className="w-40"><p className="mb-1">Do you want to summarize each row?</p><Check checked={rowSums} onChange={setRowSums} label="Yes, include row sums." /></div>
          </div>
        )}
        {page === 4 && (
          <>
            <TextIn ariaLabel="Query name" value={title} onChange={setTitle} width={320} />
            <p className="mt-2">That&apos;s all the information the wizard needs to create the query.</p>
            {["View the query.", "Modify the design."].map((o, i) => <Radio key={o} name="co" label={o} checked={open === QUERY_OPEN[i]} onChange={() => setOpen(QUERY_OPEN[i])} />)}
          </>
        )}
      </Wizard>
    );
  }
  if (kind === "Find Duplicates Query Wizard") {
    const done = () => finish(p, "backstage:queryWizard", { wizard: kind, source, dupFields: dups.join(","), fields: fields.join(","), title: name, open });
    const heads = ["Which table or query do you want to search for duplicate field values?", "Which fields might contain duplicate information?", "Do you want the query to show fields in addition to those with duplicate values?", "What do you want to name your query?"];
    return (
      <Wizard title="Find Duplicates Query Wizard" page={page} pages={4} setPage={setPage} onCancel={p.onClose} onFinish={done} canNext={page !== 1 || dups.length > 0} canFinish={dups.length > 0 && Boolean(name)} heading={heads[page]}>
        {page === 0 && <ListBox ariaLabel="Tables/Queries" items={sources(doc)} value={source} onPick={(v) => { setSource(v); setDups([]); setFields([]); setTitle(`Find duplicates for ${srcName(v)}`); }} height={170} />}
        {page === 1 && <FieldPicker available={avail} selected={dups} onChange={setDups} height={150} />}
        {page === 2 && <FieldPicker available={avail.filter((f) => !dups.includes(f))} selected={fields} onChange={setFields} height={150} />}
        {page === 3 && (
          <>
            <TextIn ariaLabel="Query name" value={title} onChange={setTitle} width={320} />
            {["View the results.", "Modify the design."].map((o, i) => <Radio key={o} name="do" label={o} checked={open === QUERY_OPEN[i]} onChange={() => setOpen(QUERY_OPEN[i])} />)}
          </>
        )}
      </Wizard>
    );
  }
  // Find Unmatched
  const relFields = sourceFields(doc, srcName(related)).map((f) => f.name);
  const done = () => finish(p, "backstage:queryWizard", { wizard: kind, source, relatedTable: srcName(related), matchField: match, relatedField: relField || match, fields: fields.join(","), title: name, open });
  const heads = ["Which table or query contains records you want in the query results?", "Which table or query contains the related records?", "What piece of information is in both tables?", "What fields do you want to see in the query results?", "What would you like to name your query?"];
  return (
    <Wizard title="Find Unmatched Query Wizard" page={page} pages={5} setPage={setPage} onCancel={p.onClose} onFinish={done} canNext={page === 1 ? Boolean(related) : page === 2 ? Boolean(match) : true} canFinish={Boolean(related) && Boolean(match) && fields.length > 0 && Boolean(name)} heading={heads[page]}>
      {page === 0 && <ListBox ariaLabel="Tables/Queries" items={sources(doc)} value={source} onPick={(v) => { setSource(v); setFields([]); setTitle(`${srcName(v)} Without Matching ${srcName(related)}`); }} height={170} />}
      {page === 1 && <ListBox ariaLabel="Related table" items={sources(doc).filter((s) => s !== source)} value={related} onPick={(v) => { setRelated(v); setTitle(`${srcName(source)} Without Matching ${srcName(v)}`); }} height={170} />}
      {page === 2 && (
        <div className="flex items-start gap-3">
          <div className="flex-1"><div className="mb-0.5">Fields in &apos;{srcName(source)}&apos;:</div><ListBox ariaLabel="Fields in first table" items={avail} value={match} onPick={(v) => { setMatch(v); if (relFields.includes(v)) setRelField(v); }} height={140} /></div>
          <span className="mt-16 text-[16px]">&lt;=&gt;</span>
          <div className="flex-1"><div className="mb-0.5">Fields in &apos;{srcName(related)}&apos;:</div><ListBox ariaLabel="Fields in related table" items={relFields} value={relField} onPick={setRelField} height={140} /></div>
        </div>
      )}
      {page === 3 && <FieldPicker available={avail} selected={fields} onChange={setFields} height={150} />}
      {page === 4 && (
        <>
          <TextIn ariaLabel="Query name" value={title} onChange={setTitle} width={360} />
          {["View the results.", "Modify the design."].map((o, i) => <Radio key={o} name="uo" label={o} checked={open === QUERY_OPEN[i]} onChange={() => setOpen(QUERY_OPEN[i])} />)}
        </>
      )}
    </Wizard>
  );
}

/* ------------------------------------------------------------------ */
/* Import Spreadsheet Wizard                                           */
/* ------------------------------------------------------------------ */

function ImportWizard(p: Props) {
  const { doc } = p;
  const files = (doc.files ?? []).filter((f) => f.kind === "xlsx" || f.kind === "csv");
  const [stage, setStage] = useState<"source" | "wizard" | "save">("source");
  const [file, setFile] = useState(files[0] ? `C:\\Users\\Student\\Documents\\${files[0].name}` : "C:\\Users\\Student\\Documents\\");
  const [browse, setBrowse] = useState(false);
  const [mode, setMode] = useState(IMPORT_MODES[0]);
  const [appendTo, setAppendTo] = useState(doc.tables[0]?.name ?? "");
  const [page, setPage] = useState(0);
  const [sheet, setSheet] = useState("");
  const [headings, setHeadings] = useState(true);
  const [skip, setSkip] = useState<string[]>([]);
  const [pk, setPk] = useState(PK_OPTIONS[0]);
  const [pkField, setPkField] = useState("");
  const [table, setTable] = useState("");
  const [save, setSave] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const f = files.find((x) => x.name.toLowerCase() === file.replace(/^.*[\\/]/, "").toLowerCase());
  const sh = f?.sheets?.find((s) => s.name === sheet) ?? f?.sheets?.[0];
  const heads = sh ? (headings ? sh.rows[0].map((h, i) => String(h ?? `Field${i + 1}`)) : sh.rows[0].map((_, i) => `Field${i + 1}`)) : [];
  const append = mode === IMPORT_MODES[1];
  const link = mode === IMPORT_MODES[2];
  const commit = (saveSteps: boolean) =>
    finish(p, "backstage:importExcel", { file, sheet: sh?.name ?? "", headings, mode, appendTo: append ? appendTo : "", pk: append || link ? "No primary key" : pk, pkField, table: table || sh?.name || "Sheet1", skip: skip.join(","), saveSteps, saveName: saveName || `Import-${table || sh?.name}` });

  if (stage === "source") {
    return (
      <Win
        title="Get External Data - Excel Spreadsheet"
        width={600}
        onClose={p.onClose}
        footer={<><Btn primary onClick={() => { if (!f) { setErr(`The Microsoft Access database engine could not find the object '${file.replace(/^.*[\\/]/, "")}'. Make sure the object exists and that you spell its name and the path name correctly.`); return; } setSheet(f.sheets?.[0]?.name ?? ""); setTable(f.name.replace(/\.[^.]+$/, "")); setStage("wizard"); setPage(0); }}>OK</Btn><Btn onClick={p.onClose}>Cancel</Btn></>}
      >
        <p className="mb-2 font-semibold">Select the source and destination of the data</p>
        <p className="mb-1">Specify the source of the definition of the objects.</p>
        <label className="mb-3 flex items-center gap-2">File name: <TextIn ariaLabel="File name" value={file} onChange={setFile} className="h-[22px] flex-1 border border-[#7a7a7a] bg-white px-1 outline-none" /> <Btn onClick={() => setBrowse(true)}>Browse...</Btn></label>
        <p className="mb-1">Specify how and where you want to store the data in the current database.</p>
        <div className="flex flex-col gap-2">
          <Radio name="im" label={IMPORT_MODES[0]} checked={mode === IMPORT_MODES[0]} onChange={() => setMode(IMPORT_MODES[0])} />
          <p className="ml-6 text-[11px] text-gray-600">If the specified table does not exist, Access will create it. If the specified table already exists, Access might overwrite its contents with the imported data.</p>
          <div className="flex items-center gap-2">
            <Radio name="im" label={IMPORT_MODES[1]} checked={append} onChange={() => setMode(IMPORT_MODES[1])} />
            <Combo ariaLabel="Append to table" value={appendTo} options={doc.tables.filter((t) => t.saved !== false).map((t) => t.name)} onChange={setAppendTo} width={180} />
          </div>
          <Radio name="im" label={IMPORT_MODES[2]} checked={link} onChange={() => setMode(IMPORT_MODES[2])} />
        </div>
        {browse && (
          <Win title="File Open" width={460} onClose={() => setBrowse(false)} footer={<><Btn primary onClick={() => setBrowse(false)}>Open</Btn><Btn onClick={() => setBrowse(false)}>Cancel</Btn></>}>
            <div className="mb-1 flex items-center gap-1 text-[11px]"><AccIcon name="folder" size={12} />C:\Users\Student\Documents</div>
            <div className="h-[150px] overflow-auto border border-gray-400 bg-white">
              {files.map((x) => (
                <button key={x.name} type="button" onClick={() => setFile(`C:\\Users\\Student\\Documents\\${x.name}`)} onDoubleClick={() => { setFile(`C:\\Users\\Student\\Documents\\${x.name}`); setBrowse(false); }} className={`flex w-full items-center gap-1.5 px-1.5 py-[2px] text-left ${file.endsWith(x.name) ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`}>
                  <AccIcon name={x.kind === "xlsx" ? "excel" : "text"} size={14} />
                  {x.name}
                </button>
              ))}
              {!files.length && <p className="p-2 text-gray-500">No Excel files in this folder.</p>}
            </div>
          </Win>
        )}
        {err && <MsgBox text={err} buttons={[{ label: "OK", onClick: () => setErr(null) }]} />}
      </Win>
    );
  }
  if (stage === "save") {
    return (
      <Win title="Get External Data - Excel Spreadsheet" width={540} onClose={() => commit(false)} footer={save ? <><Btn primary onClick={() => commit(true)}>Save Import</Btn><Btn onClick={() => commit(false)}>Cancel</Btn></> : <Btn primary onClick={() => commit(false)}>Close</Btn>}>
        <p className="mb-2 font-semibold">Save Import Steps</p>
        <p className="mb-2">Finished importing file &apos;{file}&apos; to table &apos;{append ? appendTo : table}&apos;.</p>
        <p className="mb-2">Do you want to save these import steps? This will allow you to quickly repeat the operation without using the wizard.</p>
        <Check checked={save} onChange={setSave} label="Save import steps" />
        {save && <label className="ml-6 mt-2 flex items-center gap-2">Save as: <TextIn ariaLabel="Save as" value={saveName || `Import-${table}`} onChange={setSaveName} width={260} /></label>}
      </Win>
    );
  }
  const lastPage = append ? 2 : 4;
  const hdr = ["Your spreadsheet file contains more than one worksheet or range. Which worksheet or range would you like?", "Microsoft Access can use your column headings as field names for your table. Does the first row specified contain column headings?", append ? "That's all the information the wizard needs to import your data." : "You can specify information about each of the fields you are importing.", "Microsoft Access recommends that you define a primary key for your new table. A primary key is used to uniquely identify each record in your table. It allows you to retrieve data more quickly.", "That's all the information the wizard needs to import your data."];
  return (
    <Wizard title="Import Spreadsheet Wizard" width={640} page={page} pages={lastPage + 1} setPage={setPage} onCancel={p.onClose} onFinish={() => setStage("save")} heading={page === lastPage ? hdr[4] : hdr[page]}>
      {page === 0 && (
        <div className="flex gap-3">
          <div className="flex w-40 flex-col gap-1">
            <Radio name="ws" label="Show Worksheets" checked onChange={() => undefined} />
            <Radio name="ws" label="Show Named Ranges" checked={false} onChange={() => undefined} />
          </div>
          <ListBox ariaLabel="Worksheets" items={(f?.sheets ?? []).map((s) => s.name)} value={sh?.name ?? null} onPick={setSheet} height={90} />
        </div>
      )}
      {page === 1 && <Check checked={headings} onChange={setHeadings} label="First Row Contains Column Headings" />}
      {page === 2 && !append && (
        <div className="flex flex-col gap-1">
          {heads.map((h) => (
            <label key={h} className="flex items-center gap-2"><span className="w-40 truncate font-semibold">{h}</span><Check checked={skip.includes(h)} onChange={(v) => setSkip((s) => (v ? [...s, h] : s.filter((x) => x !== h)))} label="Do not import field (Skip)" /></label>
          ))}
        </div>
      )}
      {page === 3 && !append && (
        <div className="flex flex-col gap-1.5">
          {PK_OPTIONS.map((o) => (
            <div key={o} className="flex items-center gap-2">
              <Radio name="pk" label={o} checked={pk === o} onChange={() => setPk(o)} />
              {o === "Choose my own primary key" && <Combo ariaLabel="Primary key field" value={pkField || heads[0] || ""} options={heads} onChange={setPkField} width={160} />}
            </div>
          ))}
        </div>
      )}
      {page === lastPage && !append && <label className="flex items-center gap-2">Import to Table: <TextIn ariaLabel="Import to Table" value={table} onChange={setTable} width={260} /></label>}
      {page === lastPage && append && <p>Import to Table: <span className="font-semibold">{appendTo}</span></p>}
      {sh && page < 3 && (
        <div className="mt-2 max-h-[120px] overflow-auto border border-gray-400 bg-white text-[11px]">
          <table className="border-collapse">
            <tbody>
              {sh.rows.slice(0, 7).map((r, i) => (
                <tr key={i} className={i === 0 && headings ? "bg-[#f3f3f3] font-semibold" : ""}>
                  <td className="border border-gray-200 px-1 text-gray-400">{i + 1}</td>
                  {r.map((c, j) => <td key={j} className="border border-gray-200 px-1">{c ?? ""}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Wizard>
  );
}

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */

function ExportDialog(p: Props & { kind: string; object: string }) {
  const { doc, kind } = p;
  const [object] = useState(p.object);
  const ext = kind === "exportPdf" ? "pdf" : kind === "exportText" ? "txt" : "xlsx";
  const [file, setFile] = useState(`C:\\Users\\Student\\Documents\\${object}.${ext}`);
  const [format, setFormat] = useState("Excel Workbook (*.xlsx)");
  const [formatting, setFormatting] = useState(false);
  const [open, setOpen] = useState(false);
  const [optimize, setOptimize] = useState("Standard (publishing online and printing)");
  const [stage, setStage] = useState<"dest" | "text" | "save">("dest");
  const [delim, setDelim] = useState("Comma");
  const [txtFmt, setTxtFmt] = useState("Delimited");
  const [headings, setHeadings] = useState(true);
  const [save, setSave] = useState(false);
  const [saveName, setSaveName] = useState(`Export-${object}`);
  const [desc, setDesc] = useState("");
  const id = `backstage:${kind}`;
  const commit = (saveSteps: boolean) =>
    finish(p, id, kind === "exportExcel" ? { object, file, format, formatting, open, saveSteps, saveName, description: desc } : kind === "exportPdf" ? { object, file, optimize, open, saveSteps, saveName, description: desc } : { object, file, format: txtFmt, delimiter: delim, headings, qualifier: '"', saveSteps, saveName, description: desc });
  const what = kind === "exportExcel" ? "Excel Spreadsheet" : kind === "exportPdf" ? "PDF" : "Text File";
  if (!object) return <MsgBox text="Select a table, query, form, or report in the Navigation Pane first." buttons={[{ label: "OK", onClick: p.onClose }]} />;
  if (stage === "save") {
    return (
      <Win title={`Export - ${what}`} width={560} onClose={() => commit(false)} footer={save ? <><Btn primary onClick={() => commit(true)}>Save Export</Btn><Btn onClick={() => commit(false)}>Cancel</Btn></> : <Btn primary onClick={() => commit(false)}>Close</Btn>}>
        <p className="mb-2 font-semibold">Save Export Steps</p>
        <p className="mb-2">Finished exporting &apos;{object}&apos; to file &apos;{file}&apos; successfully.</p>
        <p className="mb-2">Do you want to save these export steps? This will allow you to quickly repeat the operation without using the wizard.</p>
        <Check checked={save} onChange={setSave} label="Save export steps" />
        {save && (
          <div className="ml-6 mt-2 flex flex-col gap-1.5">
            <label className="flex items-center gap-2"><span className="w-20">Save as:</span><TextIn ariaLabel="Save as" value={saveName} onChange={setSaveName} width={280} /></label>
            <label className="flex items-center gap-2"><span className="w-20">Description:</span><TextIn ariaLabel="Description" value={desc} onChange={setDesc} width={280} /></label>
          </div>
        )}
      </Win>
    );
  }
  if (stage === "text") {
    return (
      <Win title="Export Text Wizard" width={560} onClose={p.onClose} footer={<><Btn onClick={p.onClose}>Cancel</Btn><Btn primary onClick={() => setStage("save")}>Finish</Btn></>}>
        <p className="mb-2">This wizard allows you to specify details on how Microsoft Access should export your data. Which export format would you like?</p>
        <div className="mb-2 flex flex-col gap-1">
          <Radio name="tf" label="Delimited - Characters such as comma or tab separate each field" checked={txtFmt === "Delimited"} onChange={() => setTxtFmt("Delimited")} />
          <Radio name="tf" label="Fixed Width - Fields are aligned in columns with spaces between each field" checked={txtFmt === "Fixed Width"} onChange={() => setTxtFmt("Fixed Width")} />
        </div>
        {txtFmt === "Delimited" && (
          <fieldset className="mb-2 flex gap-3 border border-gray-300 p-2">
            <legend className="px-1">Choose the delimiter that separates your fields:</legend>
            {["Tab", "Semicolon", "Comma", "Space", "Other"].map((d) => <Radio key={d} name="dl" label={d} checked={delim === d} onChange={() => setDelim(d)} />)}
          </fieldset>
        )}
        <Check checked={headings} onChange={setHeadings} label="Include Field Names on First Row" />
        <label className="mt-2 flex items-center gap-2">Export to File: <TextIn ariaLabel="Export to File" value={file} onChange={setFile} className="h-[22px] flex-1 border border-[#7a7a7a] bg-white px-1 outline-none" /></label>
      </Win>
    );
  }
  if (kind === "exportPdf") {
    return (
      <Win title="Publish as PDF or XPS" width={540} onClose={p.onClose} footer={<><Btn primary onClick={() => setStage("save")}>Publish</Btn><Btn onClick={p.onClose}>Cancel</Btn></>}>
        <div className="mb-2 flex items-center gap-1 border border-[#c6c6c6] bg-white px-2 py-1 text-[11.5px]"><AccIcon name="folder" size={13} />{file.replace(/[\\/][^\\/]*$/, "")}</div>
        <label className="mb-1 flex items-center gap-2"><span className="w-24">File name:</span><TextIn ariaLabel="File name" value={file.replace(/^.*[\\/]/, "")} onChange={(v) => setFile(`${file.replace(/[\\/][^\\/]*$/, "")}\\${v}`)} className="h-[22px] flex-1 border border-[#7a7a7a] bg-white px-1 outline-none" /></label>
        <label className="mb-2 flex items-center gap-2"><span className="w-24">Save as type:</span><span className="flex-1 border border-[#7a7a7a] bg-white px-1">PDF (*.pdf)</span></label>
        <div className="flex gap-4">
          <Check checked={open} onChange={setOpen} label="Open file after publishing" />
          <fieldset className="flex flex-col gap-1 border border-gray-300 p-2">
            <legend className="px-1">Optimize for:</legend>
            {["Standard (publishing online and printing)", "Minimum size (publishing online)"].map((o) => <Radio key={o} name="op" label={o} checked={optimize === o} onChange={() => setOptimize(o)} />)}
          </fieldset>
        </div>
      </Win>
    );
  }
  return (
    <Win title={`Export - ${what}`} width={600} onClose={p.onClose} footer={<><Btn primary onClick={() => setStage(kind === "exportText" ? "text" : "save")}>OK</Btn><Btn onClick={p.onClose}>Cancel</Btn></>}>
      <p className="mb-2 font-semibold">Select the destination for the data you want to export</p>
      <p className="mb-1">Specify the destination file name and format.</p>
      <label className="mb-1 flex items-center gap-2"><span className="w-20">File name:</span><TextIn ariaLabel="File name" value={file} onChange={setFile} className="h-[22px] flex-1 border border-[#7a7a7a] bg-white px-1 outline-none" /><Btn>Browse...</Btn></label>
      {kind === "exportExcel" && <label className="mb-2 flex items-center gap-2"><span className="w-20">File format:</span><Combo ariaLabel="File format" value={format} options={["Excel Workbook (*.xlsx)", "Excel Binary Workbook (*.xlsb)", "Excel 97 - Excel 2003 Workbook (*.xls)"]} onChange={setFormat} width={280} /></label>}
      <p className="mb-1">Specify export options.</p>
      <div className="flex flex-col gap-1.5">
        <Check checked={formatting} onChange={setFormatting} label="Export data with formatting and layout." />
        <Check checked={open} onChange={setOpen} label="Open the destination file after the export operation is complete." />
        <Check checked={false} onChange={() => undefined} label="Export only the selected records." />
      </div>
      <p className="mt-2 text-[11px] text-gray-600">Exporting: {object} ({doc.tables.some((t) => t.name === object) ? "table" : doc.queries.some((q) => q.name === object) ? "query" : "object"})</p>
    </Win>
  );
}

function SavedExports(p: Props) {
  const { doc } = p;
  const [tab, setTab] = useState<"Saved Imports" | "Saved Exports">("Saved Exports");
  const list = tab === "Saved Exports" ? doc.savedExports ?? [] : doc.savedImports ?? [];
  const [pick, setPick] = useState<string | null>(list[0]?.name ?? null);
  const [done, setDone] = useState(false);
  const cur = list.find((x) => x.name === pick);
  return (
    <Win title="Manage Data Tasks" width={580} onClose={p.onClose} footer={<Btn onClick={p.onClose}>Close</Btn>}>
      <div role="tablist" className="mb-2 flex gap-0.5 border-b border-gray-300">
        {(["Saved Imports", "Saved Exports"] as const).map((t) => <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`border border-b-0 px-3 py-0.5 ${tab === t ? "border-gray-300 bg-white" : "border-transparent"}`}>{t}</button>)}
      </div>
      <p className="mb-1 text-gray-600">Click to select the saved {tab === "Saved Exports" ? "export" : "import"} to manage.</p>
      <div className="h-[150px] overflow-auto border border-gray-400 bg-white">
        {list.map((s) => (
          <button key={s.name} type="button" onClick={() => setPick(s.name)} className={`block w-full border-b border-gray-100 px-2 py-1 text-left ${pick === s.name ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`}>
            <div className="font-semibold">{s.name}</div>
            <div className="text-[11px] text-gray-600">{s.file}</div>
            {s.description && <div className="text-[11px] text-gray-500">{s.description}</div>}
          </button>
        ))}
        {!list.length && <p className="p-2 text-gray-500">There are no saved {tab === "Saved Exports" ? "exports" : "imports"} in this database.</p>}
      </div>
      <div className="mt-2 flex gap-2">
        <Btn primary disabled={!cur || tab !== "Saved Exports"} onClick={() => { if (cur) { p.onCommit({ kind: "command", id: "external.runSavedExport", value: cur.name }); setDone(true); } }}>Run</Btn>
        <Btn disabled={!cur || tab !== "Saved Exports"} onClick={() => cur && p.onCommit({ kind: "command", id: "external.deleteSavedExport", value: cur.name })}>Delete</Btn>
      </div>
      {done && <MsgBox icon="info" text={`All objects were exported successfully.`} buttons={[{ label: "OK", onClick: () => { setDone(false); p.onClose(); } }]} />}
    </Win>
  );
}

/* ------------------------------------------------------------------ */
/* Lookup Wizard                                                       */
/* ------------------------------------------------------------------ */

function LookupWizard(p: Props & { ctx: string[] }) {
  const { doc } = p;
  const s = parseSel(bridge.selection);
  const tableName = p.ctx[0] ?? (s.k === "field" ? s.table : s.k === "col" || s.k === "cell" ? s.obj : activeTab(doc)?.name ?? "");
  const fieldName = p.ctx[1] ?? (s.k === "field" ? s.field : "");
  const isNew = !p.ctx[1] && (s.k === "col" || s.k === "cell");
  const [page, setPage] = useState(0);
  const [source, setSource] = useState(LOOKUP_SOURCES[0]);
  const [vals, setVals] = useState<string[]>(["", "", "", ""]);
  const [lt, setLt] = useState(sources(doc).find((x) => !x.endsWith(`: ${tableName}`)) ?? "");
  const [lf, setLf] = useState<string[]>([]);
  const [hideKey, setHideKey] = useState(true);
  const [label, setLabel] = useState(isNew ? "Field1" : fieldName);
  const [limit, setLimit] = useState(false);
  const [multi, setMulti] = useState(false);
  const typed = source === LOOKUP_SOURCES[1];
  const pages = typed ? 3 : 4;
  const done = () =>
    finish(p, "backstage:lookupWizard", {
      table: tableName,
      field: isNew ? "" : fieldName,
      source,
      values: vals.map((v) => v.trim()).filter(Boolean).join(";"),
      lookupTable: srcName(lt),
      lookupField: lf.find((f) => !/id$/i.test(f)) ?? lf[0] ?? "",
      label,
      limitToList: typed ? limit : true,
      multi,
      storeKey: !typed && hideKey && lf.some((f) => /id$/i.test(f)),
    });
  const heads = typed
    ? ["This wizard creates a lookup field, which displays a list of values you can choose from. How do you want your lookup field to get its values?", "What values do you want to see in your lookup field? Enter the number of columns you want in the list, and then type the values you want in each cell.", "What label would you like for your lookup field?"]
    : ["This wizard creates a lookup field, which displays a list of values you can choose from. How do you want your lookup field to get its values?", "Which table or query should provide the values for your lookup field?", "Which fields contain the values you want included in your lookup field?", "What label would you like for your lookup field?"];
  return (
    <Wizard title="Lookup Wizard" page={page} pages={pages} setPage={setPage} onCancel={p.onClose} onFinish={done} canFinish={Boolean(label.trim()) && (typed ? vals.some((v) => v.trim()) : lf.length > 0)} heading={heads[page]}>
      {page === 0 && <div className="flex flex-col gap-2">{LOOKUP_SOURCES.map((o) => <Radio key={o} name="ls" label={o} checked={source === o} onChange={() => setSource(o)} />)}</div>}
      {typed && page === 1 && (
        <div className="flex flex-col">
          <label className="mb-1 flex items-center gap-2">Number of columns: <span className="border border-gray-400 bg-white px-2">1</span></label>
          <div className="max-h-[170px] overflow-auto border border-gray-400 bg-white">
            <div className="bg-[#f3f3f3] px-2 text-[11px]">Col1</div>
            {vals.map((v, i) => (
              <input key={i} aria-label={`Value ${i + 1}`} value={v} onChange={(e) => setVals((s) => { const n = s.slice(); n[i] = e.target.value; if (i === n.length - 1 && e.target.value) n.push(""); return n; })} onKeyDown={(e) => e.stopPropagation()} className="block h-[20px] w-full border-b border-gray-200 px-2 text-[12px] outline-none focus:bg-[#fffbe6]" />
            ))}
          </div>
        </div>
      )}
      {!typed && page === 1 && <ListBox ariaLabel="Tables/Queries" items={sources(doc)} value={lt} onPick={(v) => { setLt(v); setLf([]); }} height={170} />}
      {!typed && page === 2 && (
        <>
          <FieldPicker available={sourceFields(doc, srcName(lt)).map((f) => f.name)} selected={lf} onChange={setLf} height={140} />
          <Check checked={hideKey} onChange={setHideKey} label="Hide key column (recommended)" />
        </>
      )}
      {page === pages - 1 && (
        <div className="flex flex-col gap-2">
          <TextIn ariaLabel="Lookup field label" value={label} onChange={setLabel} width={260} />
          {typed && <Check checked={limit} onChange={setLimit} label="Limit To List" />}
          <Check checked={multi} onChange={setMulti} label="Allow Multiple Values" />
          <p className="text-gray-600">Those are all the answers the wizard needs to create your lookup field.</p>
        </div>
      )}
    </Wizard>
  );
}

/* ------------------------------------------------------------------ */
/* Edit Relationships                                                  */
/* ------------------------------------------------------------------ */

function EditRelationships(p: Props & { ctx: string[] }) {
  const { doc } = p;
  const s = parseSel(bridge.selection);
  const existing = s.k === "rel" ? doc.relationships.find((r) => `${r.table}.${r.field}-${r.relatedTable}.${r.relatedField}`.toLowerCase() === `${s.table}.${s.field}-${s.relatedTable}.${s.relatedField}`.toLowerCase()) : undefined;
  const fromDrag = p.ctx.length >= 4 ? orientRel(doc, { table: p.ctx[0], field: p.ctx[1], relatedTable: p.ctx[2], relatedField: p.ctx[3] }) : null;
  const start: AccRelationship | null = fromDrag ?? (p.ctx[0] === "edit" || !p.ctx.length ? existing ?? null : null);
  const [rel, setRel] = useState<AccRelationship | null>(start ? { enforce: false, cascadeUpdate: false, cascadeDelete: false, join: 1, ...start } : null);
  const [createNew, setCreateNew] = useState(!start);
  const [cn, setCn] = useState({ left: doc.relLayout?.[0] ?? doc.tables[0]?.name ?? "", right: doc.relLayout?.[1] ?? doc.tables[1]?.name ?? "" });
  const [joinDlg, setJoinDlg] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const tables = doc.tables.filter((t) => t.saved !== false).map((t) => t.name);
  if (createNew || !rel) {
    return (
      <Win title="Create New" width={380} onClose={p.onClose} footer={<><Btn primary onClick={() => { const a = findTable(doc, cn.left), b = findTable(doc, cn.right); if (!a || !b) return; setRel({ table: a.name, field: a.pk?.[0] ?? a.fields[0]?.name ?? "", relatedTable: b.name, relatedField: b.fields.find((f) => f.name === (a.pk?.[0] ?? ""))?.name ?? b.fields[0]?.name ?? "", enforce: false, join: 1 }); setCreateNew(false); }}>OK</Btn><Btn onClick={p.onClose}>Cancel</Btn></>}>
        <label className="mb-2 flex items-center gap-2"><span className="w-36">Left Table Name</span><Combo ariaLabel="Left Table Name" value={cn.left} options={tables} onChange={(v) => setCn({ ...cn, left: v })} width={180} /></label>
        <label className="flex items-center gap-2"><span className="w-36">Right Table Name</span><Combo ariaLabel="Right Table Name" value={cn.right} options={tables} onChange={(v) => setCn({ ...cn, right: v })} width={180} /></label>
      </Win>
    );
  }
  const a = findTable(doc, rel.table), b = findTable(doc, rel.relatedTable);
  const type = relType(doc, rel);
  const create = () => {
    const prob = relProblem(doc, rel);
    if (prob) {
      setErr(prob);
      return;
    }
    finish(p, "backstage:editRelationship", { table: rel.table, field: rel.field, relatedTable: rel.relatedTable, relatedField: rel.relatedField, enforce: Boolean(rel.enforce), cascadeUpdate: Boolean(rel.enforce && rel.cascadeUpdate), cascadeDelete: Boolean(rel.enforce && rel.cascadeDelete), join: String(rel.join ?? 1) });
  };
  const opts = joinOptions(rel.table, rel.relatedTable);
  return (
    <Win title="Edit Relationships" width={520} onClose={p.onClose}>
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="grid grid-cols-2 border border-[#7a7a7a] bg-white">
            <div className="border-b border-r border-gray-300 bg-[#f3f3f3] px-1.5">Table/Query:</div>
            <div className="border-b border-gray-300 bg-[#f3f3f3] px-1.5">Related Table/Query:</div>
            <div className="border-b border-r border-gray-300 px-1.5 font-semibold">{rel.table}</div>
            <div className="border-b border-gray-300 px-1.5 font-semibold">{rel.relatedTable}</div>
            <div className="border-r border-gray-300 p-0"><select aria-label="Field" value={rel.field} onChange={(e) => setRel({ ...rel, field: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-[20px] w-full text-[12px]">{(a?.fields ?? []).map((f) => <option key={f.name}>{f.name}</option>)}</select></div>
            <div className="p-0"><select aria-label="Related Field" value={rel.relatedField} onChange={(e) => setRel({ ...rel, relatedField: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-[20px] w-full text-[12px]">{(b?.fields ?? []).map((f) => <option key={f.name}>{f.name}</option>)}</select></div>
            <div className="h-[40px] border-r border-t border-gray-300" />
            <div className="h-[40px] border-t border-gray-300" />
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <Check checked={Boolean(rel.enforce)} onChange={(v) => setRel({ ...rel, enforce: v })} label="Enforce Referential Integrity" />
            <span className={rel.enforce ? "" : "opacity-40"}><Check checked={Boolean(rel.cascadeUpdate)} onChange={(v) => rel.enforce && setRel({ ...rel, cascadeUpdate: v })} label="Cascade Update Related Fields" /></span>
            <span className={rel.enforce ? "" : "opacity-40"}><Check checked={Boolean(rel.cascadeDelete)} onChange={(v) => rel.enforce && setRel({ ...rel, cascadeDelete: v })} label="Cascade Delete Related Records" /></span>
          </div>
          <div className="mt-2 flex gap-4"><span>Relationship Type:</span><span className="font-semibold">{type}</span></div>
          {findField(a, rel.field) && findField(b, rel.relatedField) && <span className="sr-only">fields ok</span>}
        </div>
        <div className="flex w-[110px] flex-col gap-1.5">
          <Btn primary onClick={create}>{existing && !fromDrag ? "OK" : "Create"}</Btn>
          <Btn onClick={p.onClose}>Cancel</Btn>
          <Btn onClick={() => setJoinDlg(true)}>Join Type...</Btn>
          <Btn onClick={() => setCreateNew(true)}>Create New...</Btn>
        </div>
      </div>
      {joinDlg && (
        <Win title="Join Properties" width={500} onClose={() => setJoinDlg(false)} footer={<><Btn primary onClick={() => setJoinDlg(false)}>OK</Btn><Btn onClick={() => setJoinDlg(false)}>Cancel</Btn></>}>
          <div className="mb-2 grid grid-cols-2 gap-1 text-[11.5px]"><span>Left Table Name: <b>{rel.table}</b></span><span>Right Table Name: <b>{rel.relatedTable}</b></span><span>Left Column Name: <b>{rel.field}</b></span><span>Right Column Name: <b>{rel.relatedField}</b></span></div>
          {opts.map((o, i) => <Radio key={o} name="jt" label={o} checked={(rel.join ?? 1) === i + 1} onChange={() => setRel({ ...rel, join: (i + 1) as 1 | 2 | 3 })} />)}
        </Win>
      )}
      {err && <MsgBox text={err} buttons={[{ label: "OK", onClick: () => setErr(null) }]} />}
    </Win>
  );
}

/* ------------------------------------------------------------------ */
/* Documenter, Table Analyzer, Tab Order, Command Button               */
/* ------------------------------------------------------------------ */

function Documenter(p: Props) {
  const { doc } = p;
  const groups: Record<string, string[]> = {
    Tables: doc.tables.filter((t) => t.saved !== false).map((t) => t.name),
    Queries: doc.queries.filter((q) => q.saved !== false).map((q) => q.name),
    Forms: doc.forms.filter((f) => f.saved !== false).map((f) => f.name),
    Reports: doc.reports.filter((r) => r.saved !== false).map((r) => r.name),
    Macros: doc.macros.map((m) => m.name),
    Modules: doc.modules.map((m) => m.name),
  };
  const [tab, setTab] = useState("Tables");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const list = tab === "All Object Types" ? Object.values(groups).flat() : groups[tab] ?? [];
  return (
    <Win title="Documenter" width={560} onClose={p.onClose}>
      <div role="tablist" className="mb-2 flex flex-wrap gap-0.5 border-b border-gray-300">
        {[...Object.keys(groups), "Current Database", "All Object Types"].map((t) => <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`border border-b-0 px-2 py-0.5 text-[11.5px] ${tab === t ? "border-gray-300 bg-white" : "border-transparent"}`}>{t}</button>)}
      </div>
      <div className="flex gap-3">
        <div className="h-[170px] flex-1 overflow-auto border border-gray-400 bg-white">
          {list.map((n) => (
            <label key={n} className="flex items-center gap-1.5 px-1.5 py-[1px]">
              <input type="checkbox" checked={checked.has(n)} onChange={(e) => setChecked((s) => { const x = new Set(s); if (e.target.checked) x.add(n); else x.delete(n); return x; })} />
              <AccIcon name={groups.Tables.includes(n) ? "table" : groups.Queries.includes(n) ? "query" : groups.Forms.includes(n) ? "form" : groups.Reports.includes(n) ? "report" : "macro"} size={13} />
              {n}
            </label>
          ))}
          {tab === "Current Database" && <p className="p-2 text-gray-600">Properties and Relationships</p>}
        </div>
        <div className="flex w-[100px] flex-col gap-1.5">
          <Btn primary disabled={!checked.size} onClick={() => finish(p, "backstage:documenter", { objects: Array.from(checked).join(",") })}>OK</Btn>
          <Btn onClick={p.onClose}>Cancel</Btn>
          <Btn onClick={() => setChecked(new Set([...checked, ...list]))}>Select All</Btn>
          <Btn onClick={() => setChecked(new Set())}>Deselect All</Btn>
          <Btn>Options...</Btn>
        </div>
      </div>
    </Win>
  );
}

function TableAnalyzer(p: Props) {
  const { doc } = p;
  const [page, setPage] = useState(0);
  const [table, setTable] = useState(doc.tables[0]?.name ?? "");
  const [decide, setDecide] = useState("Yes, let the wizard decide.");
  const t = findTable(doc, table);
  const repeated = useMemo(() => {
    if (!t) return [] as string[];
    return t.fields.filter((f) => {
      if (t.pk?.includes(f.name) || f.type !== "Short Text") return false;
      const vals = t.rows.map((r) => String(r[f.name] ?? "")).filter(Boolean);
      return vals.length > 3 && new Set(vals.map((v) => v.toLowerCase())).size <= Math.ceil(vals.length / 2);
    }).map((f) => f.name);
  }, [t]);
  const heads = ["The Table Analyzer: Looking At the Problem", "The Table Analyzer: Solving the Problem", "Which table contains fields with values that are repeated in many records?", "Do you want the wizard to decide what fields go in what tables?", "Is the wizard grouping information correctly?"];
  return (
    <Wizard title="Table Analyzer Wizard" page={page} pages={5} setPage={setPage} onCancel={p.onClose} onFinish={() => finish(p, "backstage:analyzeTable", { table, decision: decide })} heading={heads[page]}>
      {page === 0 && <p>Your table or spreadsheet may store the same information many times. Duplicating information can cause problems: it wastes space, and it can lead to mistakes when the same value is typed slightly differently.</p>}
      {page === 1 && <p>The wizard splits the original table into new tables so that each piece of information is stored only once. The new tables are related by a key, so a change in one place updates everywhere.</p>}
      {page === 2 && <ListBox ariaLabel="Tables" items={doc.tables.filter((x) => x.saved !== false).map((x) => x.name)} value={table} onPick={setTable} height={150} />}
      {page === 3 && <div className="flex flex-col gap-1.5">{["Yes, let the wizard decide.", "No, I want to decide."].map((o) => <Radio key={o} name="ad" label={o} checked={decide === o} onChange={() => setDecide(o)} />)}</div>}
      {page === 4 && (
        <div className="flex flex-col gap-2">
          {repeated.length ? (
            <>
              <p>The wizard suggests moving these fields with repeated values to their own table:</p>
              <div className="flex gap-3">
                <div className="border border-gray-400 bg-white"><div className="bg-[#a4373a] px-2 text-white">Table1</div>{t?.fields.filter((f) => !repeated.includes(f.name)).map((f) => <div key={f.name} className="px-2">{f.name}</div>)}<div className="px-2 text-gray-500">Lookup to Table2</div></div>
                <div className="border border-gray-400 bg-white"><div className="bg-[#a4373a] px-2 text-white">Table2</div><div className="px-2">Generated Unique ID</div>{repeated.map((f) => <div key={f} className="px-2">{f}</div>)}</div>
              </div>
            </>
          ) : (
            <p>The wizard does not recommend splitting this table. Each value is stored only once.</p>
          )}
        </div>
      )}
    </Wizard>
  );
}

function TabOrder(p: Props) {
  const { doc } = p;
  const t = activeTab(doc);
  const f = t?.kind === "form" ? findForm(doc, t.name) : undefined;
  const detail = (f?.controls ?? []).filter((c) => (c.section ?? "Detail") === "Detail" && c.kind !== "label").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((c) => c.id);
  const initial = f?.tabOrder?.length ? [...f.tabOrder.filter((x) => detail.includes(x)), ...detail.filter((x) => !f.tabOrder!.includes(x))] : detail;
  const [order, setOrder] = useState(initial);
  const [pick, setPick] = useState<string | null>(order[0] ?? null);
  const [section, setSection] = useState("Detail");
  if (!f) return <MsgBox text="Open a form in Design view to set its tab order." buttons={[{ label: "OK", onClick: p.onClose }]} />;
  const move = (d: number) => {
    if (!pick) return;
    const i = order.indexOf(pick);
    const j = i + d;
    if (j < 0 || j >= order.length) return;
    const n = order.slice();
    [n[i], n[j]] = [n[j], n[i]];
    setOrder(n);
  };
  return (
    <Win title="Tab Order" width={420} onClose={p.onClose}>
      <div className="flex gap-3">
        <fieldset className="flex flex-col gap-1 border border-gray-300 p-2">
          <legend className="px-1">Section</legend>
          {["Form Header", "Detail", "Form Footer"].map((s) => <Radio key={s} name="tos" label={s} checked={section === s} onChange={() => setSection(s)} />)}
        </fieldset>
        <div className="flex-1">
          <div className="mb-0.5">Custom Order:</div>
          <ListBox ariaLabel="Custom Order" items={order} value={pick} onPick={setPick} height={160} />
          <p className="mt-1 text-[11px] text-gray-600">Select a row, then use Move Up and Move Down (or drag) to change the order.</p>
        </div>
        <div className="flex w-[100px] flex-col gap-1.5">
          <Btn primary onClick={() => finish(p, "backstage:tabOrder", { form: f.name, order: order.join(",") })}>OK</Btn>
          <Btn onClick={p.onClose}>Cancel</Btn>
          <Btn onClick={() => setOrder(detail)}>Auto Order</Btn>
          <Btn onClick={() => move(-1)}>Move Up</Btn>
          <Btn onClick={() => move(1)}>Move Down</Btn>
        </div>
      </div>
    </Win>
  );
}

function ButtonWizard(p: Props & { section?: string }) {
  const { doc } = p;
  const t = activeTab(doc);
  const f = t?.kind === "form" ? findForm(doc, t.name) : undefined;
  const [page, setPage] = useState(0);
  const [cat, setCat] = useState("Record Navigation");
  const [action, setAction] = useState(BUTTON_ACTIONS["Record Navigation"][4]);
  const needs = ["Open Form", "Open Report", "Preview Report", "Run Query", "Run Macro", "Print Report"].includes(action);
  const objects = action === "Open Form" ? doc.forms.filter((x) => x.saved !== false && x.name !== f?.name).map((x) => x.name) : action.includes("Report") ? doc.reports.map((x) => x.name) : action === "Run Query" ? doc.queries.map((x) => x.name) : action === "Run Macro" ? doc.macros.map((x) => x.name) : [];
  const [object, setObject] = useState("");
  const [text, setText] = useState(action);
  const [name, setName] = useState(`Command${(f?.controls.filter((c) => c.kind === "button").length ?? 0) + 1}`);
  if (!f) return <MsgBox text="Open a form in Layout or Design view first." buttons={[{ label: "OK", onClick: p.onClose }]} />;
  const pages = needs ? 4 : 3;
  const textPage = needs ? 2 : 1;
  const done = () => finish(p, "backstage:buttonWizard", { category: cat, action, object: needs ? object || objects[0] || "" : "", text, name, section: p.section ?? "Form Footer" });
  return (
    <Wizard title="Command Button Wizard" page={page} pages={pages} setPage={setPage} onCancel={p.onClose} onFinish={done} canFinish={Boolean(name.trim())} heading={page === 0 ? "What action do you want to happen when the button is pressed?" : needs && page === 1 ? `What ${action.includes("Form") ? "form would you like the command button to open" : action.includes("Report") ? "report would you like the command button to preview" : action.includes("Query") ? "query would you like the command button to run" : "macro would you like the command button to run"}?` : page === textPage ? "Do you want text or a picture on the button?" : "What do you want to name the button?"}>
      {page === 0 && (
        <div className="flex gap-3">
          <div className="flex-1"><div className="mb-0.5">Categories:</div><ListBox ariaLabel="Categories" items={Object.keys(BUTTON_ACTIONS)} value={cat} onPick={(c) => { setCat(c); setAction(BUTTON_ACTIONS[c][0]); setText(BUTTON_ACTIONS[c][0]); }} height={150} /></div>
          <div className="flex-1"><div className="mb-0.5">Actions:</div><ListBox ariaLabel="Actions" items={BUTTON_ACTIONS[cat]} value={action} onPick={(a) => { setAction(a); setText(a); }} height={150} /></div>
        </div>
      )}
      {needs && page === 1 && <ListBox ariaLabel="Objects" items={objects} value={object || objects[0] || null} onPick={setObject} height={150} />}
      {page === textPage && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2"><Radio name="btxt" label="Text:" checked onChange={() => undefined} /><TextIn ariaLabel="Button text" value={text} onChange={setText} width={240} /></div>
          <Radio name="btxt" label="Picture:" checked={false} onChange={() => undefined} />
          <div className="ml-6 mt-2"><span className="inline-block min-w-[96px] border border-[#8a8a8a] bg-[#f0f0f0] px-3 py-[3px]">{text}</span></div>
        </div>
      )}
      {page === pages - 1 && (
        <div className="flex flex-col gap-2">
          <p>A meaningful name will help you to refer to the button later.</p>
          <TextIn ariaLabel="Button name" value={name} onChange={setName} width={240} />
          <p>That&apos;s all the information the wizard needs to create your command button.</p>
        </div>
      )}
    </Wizard>
  );
}
