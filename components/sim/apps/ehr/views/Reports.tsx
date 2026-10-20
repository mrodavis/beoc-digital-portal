"use client";

import { REPORT_NAMES } from "../forms";
import { money, runReport } from "../model";
import { Btn, Empty, Icon, Panel, Row, Table, Td, useEhr } from "../ui";
import { Tile } from "./Chart";

const DESCRIPTIONS: Record<string, string> = {
  "Patient tracking": "Today's visits and where each patient is now. Group by status or provider to see bottlenecks.",
  "No-shows": "Missed appointments over a period. Group by provider or visit type to find a pattern.",
  "A/R aging": "Money owed to the practice by payer, in 30-day buckets, with Days in A/R.",
  Denials: "Denied claims with reason codes. Group by reason to see which front-end process to fix.",
  "Diabetes care gaps": "Quality measure: patients with diabetes and whether they had a hemoglobin A1c in the last 6 months.",
};

export function ReportsView() {
  const { doc, sel, select, cmd, openForm } = useEhr();
  const run = doc.report;
  const out = run ? runReport(doc, run) : null;
  const picked = sel.startsWith("row:") ? sel.slice(4) : "";
  const pickedOk = Boolean(out?.rows.some((r) => r.key === picked));
  const [sortCol, sortDir] = (run?.sort ?? "").split(":");
  return (
    <div className="flex min-h-0 flex-1">
      <nav aria-label="Reports" className="w-56 shrink-0 overflow-auto border-r border-slate-300 bg-white py-1">
        <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Report library</div>
        {REPORT_NAMES.map((r) => (
          <button key={r} type="button" onClick={() => openForm("ehr.report.run", {}, { report: r })} className={`block w-full border-l-[3px] px-2 py-1.5 text-left text-[12px] ${run?.report === r ? "border-sky-700 bg-sky-50" : "border-transparent hover:bg-slate-50"}`}>
            <span className="flex items-center gap-1.5 font-semibold">
              <Icon name="report" size={13} className="text-slate-500" />
              {r}
            </span>
            <span className="block text-[10.5px] leading-snug text-slate-500">{DESCRIPTIONS[r]}</span>
          </button>
        ))}
      </nav>
      <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-auto p-2.5">
        {!run || !out ? (
          <Empty>Choose a report on the left to set its options and run it.</Empty>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-auto">
                <div className="text-[14px] font-bold">{out.title}</div>
                <div className="text-[11px] text-slate-500">
                  {run.period} · grouped by {run.groupBy.toLowerCase()} · run by {doc.session.user}
                </div>
              </div>
              <Btn small onClick={() => openForm("ehr.report.run", {}, { report: run.report, groupBy: run.groupBy, period: run.period })}>
                Change options…
              </Btn>
              <Btn small icon="flag" disabled={!pickedOk} onClick={() => cmd("ehr.report.flag")}>
                Flag for follow-up
              </Btn>
              <Btn small tone="warn" icon="logout" onClick={() => openForm("ehr.report.export")}>
                Export…
              </Btn>
            </div>
            {out.summary.length > 0 && (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {out.summary.map((s) => (
                  <Tile key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            )}
            <Panel title={`${out.rows.length} row${out.rows.length === 1 ? "" : "s"}`} bodyClass="p-0">
              {out.rows.length === 0 ? (
                <Empty>No rows for these options. Try a longer period.</Empty>
              ) : (
                <Table
                  head={out.columns.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => cmd("ehr.report.sort", `${c.key}:${sortCol === c.key && sortDir === "desc" ? "asc" : "desc"}`)}
                      className={`flex items-center gap-0.5 uppercase ${c.kind ? "ml-auto" : ""}`}
                      aria-label={`Sort by ${c.label}`}
                    >
                      {c.label}
                      {sortCol === c.key && <span aria-hidden="true">{sortDir === "desc" ? "▼" : "▲"}</span>}
                    </button>
                  ))}
                  dense
                >
                  {out.rows.map((r) => {
                    const flagged = run.flagged?.includes(r.key);
                    return (
                      <Row key={r.key} label={String(r.cells[out.columns[0].key] ?? r.key)} selected={picked === r.key} onClick={() => select(`row:${r.key}`)} tone={flagged ? "warn" : undefined}>
                        {out.columns.map((c, i) => {
                          const v = r.cells[c.key];
                          const text = c.kind === "money" ? money(Number(v ?? 0)) : c.kind === "pct" ? `${Number(v ?? 0).toFixed(1)}%` : String(v ?? "");
                          return (
                            <Td key={c.key} mono={Boolean(c.kind)} className={`${c.kind ? "text-right" : ""} ${i === 0 ? "font-semibold" : ""}`}>
                              {i === 0 && flagged && <Icon name="flag" size={12} className="mr-1 inline text-rose-600" />}
                              {text}
                            </Td>
                          );
                        })}
                      </Row>
                    );
                  })}
                </Table>
              )}
            </Panel>
            {out.note && <p className="text-[11px] text-slate-500">{out.note}</p>}
            {(doc.exports ?? []).length > 0 && (
              <Panel title="Exports this session" bodyClass="p-2">
                <ul className="space-y-0.5 text-[11.5px]">
                  {(doc.exports ?? []).map((x, i) => (
                    <li key={i}>
                      {x.report} · {x.format} · {x.recipient} · {x.deidentify ? "de-identified" : "contains PHI"}
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </>
        )}
      </div>
    </div>
  );
}
