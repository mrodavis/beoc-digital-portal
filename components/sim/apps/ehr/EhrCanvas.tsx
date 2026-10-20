"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { CanvasProps, StatusBarProps } from "../../types";
import type { EhrDoc, EhrWorkspace } from "./types";
import { buildForm, type FormCtx } from "./forms";
import { nameOf, patientOf } from "./model";
import { EhrContext, FormModal, Icon, StarMark, useEhr as useEhrSafe, type Ehr, type MenuEntry } from "./ui";
import { AuditView, LockScreen, SearchView, SignInScreen } from "./views/Access";
import { ChartView } from "./views/Chart";
import { ScheduleView, TrackerView } from "./views/Schedule";
import { ChargesView, EncoderView, PreauthView } from "./views/Coding";
import { ClaimsView } from "./views/Billing";
import { ReportsView } from "./views/Reports";

const RAIL: { ws: EhrWorkspace; label: string; icon: string }[] = [
  { ws: "search", label: "Patients", icon: "search" },
  { ws: "chart", label: "Chart", icon: "chart" },
  { ws: "schedule", label: "Schedule", icon: "calendar" },
  { ws: "tracker", label: "Tracker", icon: "board" },
  { ws: "preauth", label: "Preauth", icon: "shield" },
  { ws: "encoder", label: "Encoder", icon: "book" },
  { ws: "charges", label: "Charges", icon: "receipt" },
  { ws: "claims", label: "Claims", icon: "claim" },
  { ws: "reports", label: "Reports", icon: "bars" },
  { ws: "audit", label: "Audit", icon: "eye" },
];

type OpenForm = { id: string; ctx: FormCtx; initial?: Record<string, SimValue> };
type OpenMenu = { x: number; y: number; items: MenuEntry[] };

export function EhrCanvas({ doc, ui, onSelect, onCommit }: CanvasProps<EhrDoc>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<OpenForm | null>(null);
  const [menu, setMenu] = useState<OpenMenu | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!doc.toast) return;
    setToast(doc.toast);
    const t = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(t);
  }, [doc.toast, doc.audit.length, doc.clock]);

  const select = useCallback((s: string) => onSelect({ selection: s }), [onSelect]);
  const commit = useCallback((c: SimCommit) => onCommit(c), [onCommit]);
  const cmd = useCallback((id: string, value?: SimValue) => onCommit({ kind: "command", id, value }), [onCommit]);
  const type = useCallback((target: string, value: string) => onCommit({ kind: "type", target, value }), [onCommit]);
  const openForm = useCallback((id: string, ctx: FormCtx = {}, initial?: Record<string, SimValue>) => {
    setMenu(null);
    setForm({ id, ctx, initial });
  }, []);
  const openMenu = useCallback((e: { clientX: number; clientY: number }, items: MenuEntry[]) => {
    const r = rootRef.current?.getBoundingClientRect();
    setMenu({ x: e.clientX - (r?.left ?? 0), y: e.clientY - (r?.top ?? 0), items });
  }, []);
  const openPatient = useCallback(
    (pid: string) => {
      const p = patientOf(doc, pid);
      if (!p) return;
      if (p.restricted && !doc.btg?.[pid] && doc.nav.chart !== pid) {
        onSelect({ selection: `pt:${pid}` });
        setForm({ id: "ehr.btg", ctx: { patient: pid } });
        return;
      }
      onCommit({ kind: "command", id: doc.judgeAccess ? "ehr.access.open" : "ehr.chart.open", value: pid });
    },
    [doc, onCommit, onSelect],
  );

  const ehr: Ehr = useMemo(
    () => ({ doc, ui, sel: ui.selection ?? "", select, commit, cmd, type, openForm, menu: openMenu, openPatient }),
    [doc, ui, select, commit, cmd, type, openForm, openMenu, openPatient],
  );

  const activeForm = form ? buildForm(form.id, doc, form.ctx) : undefined;
  const alertForm = doc.alert ? buildForm("ehr.alert", doc) : undefined;

  let body: React.ReactNode;
  if (!doc.session.signedIn) body = <SignInScreen />;
  else if (doc.session.locked) body = <LockScreen />;
  else body = <Workstation />;

  return (
    <EhrContext.Provider value={ehr}>
      <div
        ref={rootRef}
        className="relative flex h-full flex-col overflow-hidden bg-slate-100 text-slate-900"
        onClick={() => menu && setMenu(null)}
        style={{ fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif" }}
      >
        {body}

        {toast && doc.session.signedIn && !doc.session.locked && (
          <div role="status" className="pointer-events-auto absolute bottom-3 right-3 z-30 flex max-w-sm items-start gap-2 rounded-[4px] border border-emerald-700 bg-emerald-800 px-3 py-2 text-[12px] text-white shadow-lg">
            <Icon name="check" size={15} className="mt-[1px] shrink-0" />
            <span className="flex-1">{toast}</span>
            <button type="button" aria-label="Dismiss" onClick={() => setToast(null)} className="opacity-70 hover:opacity-100">
              <Icon name="x" size={13} />
            </button>
          </div>
        )}

        {menu && (
          <div
            role="menu"
            className="absolute z-50 min-w-[190px] rounded-[3px] border border-slate-400 bg-white py-1 text-[12.5px] shadow-xl"
            style={{ left: Math.min(menu.x, (rootRef.current?.clientWidth ?? 800) - 200), top: Math.min(menu.y, (rootRef.current?.clientHeight ?? 600) - 24 * menu.items.length - 10) }}
            onClick={(e) => e.stopPropagation()}
          >
            {menu.items.map((m, i) =>
              "separator" in m ? (
                <div key={i} className="my-1 border-t border-slate-200" />
              ) : (
                <button
                  key={i}
                  type="button"
                  role="menuitem"
                  disabled={m.disabled}
                  onClick={() => {
                    setMenu(null);
                    m.onPick();
                  }}
                  className={`block w-full px-3 py-1 text-left hover:bg-sky-100 disabled:text-slate-400 disabled:hover:bg-transparent ${m.danger ? "text-rose-700" : ""}`}
                >
                  {m.label}
                </button>
              ),
            )}
          </div>
        )}

        {activeForm && !doc.alert && (
          <FormModal
            key={`${form?.id}-${JSON.stringify(form?.ctx)}`}
            form={activeForm}
            initial={form?.initial}
            onCancel={() => setForm(null)}
            onOk={(values) => {
              const id = form!.id;
              setForm(null);
              onCommit({ kind: "dialog", id, values });
            }}
          />
        )}
        {alertForm && <FormModal key={`alert-${doc.alert?.order}`} form={alertForm} onOk={(values) => onCommit({ kind: "dialog", id: "ehr.alert", values })} />}
      </div>
    </EhrContext.Provider>
  );
}

function Workstation() {
  return (
    <>
      <TopBar />
      <div className="flex shrink-0 items-center justify-between gap-3 bg-orange-800 px-3 py-[3px] text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-50">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-orange-300" />
          Training environment
        </span>
        <span className="hidden normal-case tracking-normal text-orange-100 sm:inline">Synthetic patients only · Every chart you open is written to the audit log</span>
      </div>
      <div className="flex min-h-0 flex-1">
        <Rail />
        <main className="flex min-w-0 flex-1 flex-col">
          <Content />
        </main>
      </div>
    </>
  );
}

function TopBar() {
  const { doc, cmd, openForm } = useEhrSafe();
  const initials = doc.session.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex h-9 shrink-0 items-center gap-2 bg-slate-900 px-2.5 text-white">
      <StarMark size={20} />
      <div className="mr-1 leading-tight">
        <div className="text-[12.5px] font-bold tracking-tight">Northstar EHR</div>
        <div className="text-[10px] text-slate-400">{doc.facility}</div>
      </div>
      {doc.workspaces.includes("search") && (
        <button
          type="button"
          onClick={() => cmd("ehr.nav", "search")}
          aria-label="Patient search"
          className="ml-2 hidden h-6 min-w-[200px] items-center gap-2 rounded-[3px] bg-slate-700/80 px-2 text-left text-[11.5px] text-slate-300 hover:bg-slate-700 md:flex"
        >
          <Icon name="search" size={13} />
          <span className="flex-1">Search patients</span>
          <kbd className="rounded bg-slate-800 px-1 text-[10px] text-slate-400">Ctrl+K</kbd>
        </button>
      )}
      <div className="flex-1" />
      <div className="hidden text-right leading-tight sm:block">
        <div className="text-[11.5px] font-semibold">{doc.session.name}</div>
        <div className="text-[10px] text-slate-400">
          {doc.session.role} · {doc.department}
        </div>
      </div>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-600 text-[10.5px] font-bold" title={doc.session.user}>
        {initials}
      </span>
      <button type="button" onClick={() => openForm("ehr.incident")} aria-label="Report a privacy concern" title="Report a privacy or compliance concern" className="flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-amber-200 hover:bg-white/10">
        <Icon name="shield" size={15} />
        <span className="hidden lg:inline">Report concern</span>
      </button>
      <button type="button" onClick={() => cmd("ehr.lock")} aria-label="Secure workstation" title="Secure workstation (lock the screen)" className="flex items-center gap-1 rounded px-1.5 py-1 text-[11px] hover:bg-white/10">
        <Icon name="lock" size={15} />
        <span className="hidden lg:inline">Secure</span>
      </button>
      <button type="button" onClick={() => cmd("ehr.signout")} aria-label="Log out" title="Log out" className="flex items-center gap-1 rounded px-1.5 py-1 text-[11px] hover:bg-white/10">
        <Icon name="logout" size={15} />
        <span className="hidden lg:inline">Log out</span>
      </button>
    </div>
  );
}

function Rail() {
  const { doc, cmd } = useEhrSafe();
  const chartP = patientOf(doc, doc.nav.chart);
  return (
    <nav aria-label="Workspaces" className="flex w-[70px] shrink-0 flex-col gap-0.5 overflow-y-auto bg-slate-800 py-1.5">
      {RAIL.filter((r) => doc.workspaces.includes(r.ws)).map((r) => {
        const active = doc.nav.ws === r.ws;
        const disabled = r.ws === "chart" && !chartP;
        return (
          <button
            key={r.ws}
            type="button"
            disabled={disabled}
            aria-label={r.ws === "chart" && chartP ? `Chart: ${nameOf(chartP)}` : r.label}
            aria-current={active ? "page" : undefined}
            onClick={() => cmd("ehr.nav", r.ws)}
            className={`mx-1 flex flex-col items-center gap-0.5 rounded-[3px] border-l-[3px] px-0.5 py-1.5 text-[10px] leading-tight disabled:opacity-35 ${active ? "border-orange-500 bg-slate-700 text-white" : "border-transparent text-slate-300 hover:bg-slate-700/60 hover:text-white"}`}
          >
            <Icon name={r.icon} size={18} />
            <span className="max-w-[58px] truncate">{r.ws === "chart" && chartP ? chartP.last : r.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Content() {
  const { doc } = useEhrSafe();
  switch (doc.nav.ws) {
    case "search":
      return <SearchView />;
    case "chart":
      return doc.nav.chart ? <ChartView /> : <SearchView />;
    case "schedule":
      return <ScheduleView />;
    case "tracker":
      return <TrackerView />;
    case "preauth":
      return <PreauthView />;
    case "encoder":
      return <EncoderView />;
    case "charges":
      return <ChargesView />;
    case "claims":
      return <ClaimsView />;
    case "reports":
      return <ReportsView />;
    case "audit":
      return <AuditView />;
  }
  return null;
}

export function EhrStatusBar(_props: StatusBarProps<EhrDoc>) {
  return null;
}
