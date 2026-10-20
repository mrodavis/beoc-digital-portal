"use client";

import { useMemo, useState } from "react";
import type { EhrOrder, EhrOrderKind, EhrPatient } from "../types";
import { IMAGING, LABS, MEDS, ORDER_SETS, REFERRALS } from "../catalog";
import { icdTitle } from "../codes";
import { providerOf } from "../model";
import { Badge, Btn, Empty, Icon, Panel, Row, Table, Td, useEhr } from "../ui";

type Cat = "all" | EhrOrderKind;

const KIND_LABEL: Record<EhrOrderKind, string> = { med: "Medication", lab: "Lab", img: "Imaging", ref: "Referral" };
const KIND_ICON: Record<EhrOrderKind, string> = { med: "pill", lab: "flask", img: "image", ref: "referral" };

const STATUS_TONE: Record<string, "slate" | "green" | "red" | "amber" | "blue" | "violet"> = {
  Unsigned: "amber",
  Alert: "red",
  Signed: "blue",
  "Pending cosign": "violet",
  "In progress": "blue",
  Resulted: "green",
  Canceled: "slate",
};

function daysAgo(mdy: string, todayIso: string): number {
  const [m, d, y] = mdy.split("/").map(Number);
  const [ty, tm, td] = todayIso.split("-").map(Number);
  return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(y, m - 1, d)) / 86400000);
}

export function OrdersTab({ p }: { p: EhrPatient }) {
  const { doc, sel, select, cmd, openForm, menu } = useEhr();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat>("all");
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all");

  const catalog = useMemo(() => {
    const all: { kind: EhrOrderKind; id: string; name: string; sub?: string }[] = [
      ...MEDS.map((m) => ({ kind: "med" as const, id: m.id, name: m.name, sub: m.doses.join(", ") })),
      ...LABS.map((m) => ({ kind: "lab" as const, id: m.id, name: m.name, sub: m.specimen })),
      ...IMAGING.map((m) => ({ kind: "img" as const, id: m.id, name: m.name, sub: m.auth ? "Prior authorization may be required" : undefined })),
      ...REFERRALS.map((m) => ({ kind: "ref" as const, id: m.id, name: m.name })),
    ];
    const t = q.trim().toLowerCase();
    return all.filter((x) => (cat === "all" || x.kind === cat) && (!t || x.name.toLowerCase().includes(t)));
  }, [q, cat]);

  const orders = (doc.orders ?? []).filter((o) => o.patient === p.id);
  const toSign = orders.filter((o) => o.status === "Unsigned" || o.status === "Alert");
  const listed = orders
    .filter((o) => o.status !== "Unsigned" && o.status !== "Alert")
    .filter((o) => (filter === "active" ? o.status !== "Canceled" : filter === "pending" ? (o.kind === "lab" || o.kind === "img") && !o.result && o.status !== "Canceled" : true));
  const picked = sel.startsWith("order:") ? orders.find((o) => o.id === sel.slice(6)) : undefined;

  const orderRowMenu = (o: EhrOrder) => [
    { label: "Remove from orders to sign", onPick: () => cmd("ehr.order.remove"), disabled: o.status !== "Unsigned" },
    { label: "Send follow-up for missing result", onPick: () => cmd("ehr.order.followUp"), disabled: Boolean(o.result) || o.status === "Unsigned" || o.status === "Canceled" },
    { label: "Acknowledge result", onPick: () => cmd("ehr.result.ack"), disabled: !o.result || o.ack },
  ];

  const detail = (o: EhrOrder) => {
    const d = o.details;
    const parts = o.kind === "med" ? [d.dose, d.route, d.freq, d.duration] : [d.priority, d.laterality && d.laterality !== "Not applicable" ? d.laterality : "", d.reason];
    return parts.filter(Boolean).join(" · ");
  };

  return (
    <div className="flex min-h-0 flex-1 gap-2 p-2.5">
      <div className="flex w-[250px] shrink-0 flex-col gap-2">
        <Panel title="Place orders" bodyClass="p-0" className="flex min-h-0 flex-1 flex-col">
          <div className="space-y-1.5 border-b border-slate-200 p-2">
            <label className="relative block">
              <Icon name="search" size={13} className="absolute left-1.5 top-[6px] text-slate-400" />
              <input aria-label="Search the order catalog" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders" className="h-[26px] w-full rounded-[3px] border border-slate-300 pl-6 pr-1.5 text-[12.5px] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200" />
            </label>
            <div className="flex flex-wrap gap-1">
              {(["all", "med", "lab", "img", "ref"] as Cat[]).map((c) => (
                <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-[3px] px-1.5 py-0.5 text-[11px] font-semibold ${cat === c ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                  {c === "all" ? "All" : c === "med" ? "Meds" : c === "lab" ? "Labs" : c === "img" ? "Imaging" : "Referrals"}
                </button>
              ))}
            </div>
          </div>
          <ul className="min-h-0 flex-1 overflow-auto">
            {catalog.map((x) => (
              <li key={`${x.kind}:${x.id}`}>
                <button type="button" onClick={() => openForm(`ehr.order.${x.kind}`, { patient: p.id, item: x.id })} className="flex w-full items-start gap-2 border-b border-slate-100 px-2 py-1.5 text-left hover:bg-sky-50" aria-label={`Order ${x.name}`}>
                  <Icon name={KIND_ICON[x.kind]} size={15} className="mt-[1px] shrink-0 text-slate-500" />
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-semibold text-slate-900">{x.name}</span>
                    <span className="block text-[10.5px] text-slate-500">
                      {KIND_LABEL[x.kind]}
                      {x.sub ? ` · ${x.sub}` : ""}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Order sets" bodyClass="p-1">
          {ORDER_SETS.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-2 px-1.5 py-1 text-[12px]">
              <span>
                <span className="font-semibold">{s.name}</span>
                <span className="block text-[10.5px] text-slate-500">{s.items.length} orders</span>
              </span>
              <Btn small icon="set" onClick={() => cmd("ehr.orderset.add", `${p.id}:${s.id}`)} label={`Add ${s.name} order set`}>
                Add
              </Btn>
            </div>
          ))}
        </Panel>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-auto">
        <div className="grid gap-2 md:grid-cols-2">
          <Panel title="Allergies" className="text-[12px]">
            {(p.allergies ?? []).length ? (
              (p.allergies ?? []).map((a) => (
                <div key={a.substance}>
                  <span className="font-semibold text-rose-700">{a.substance}</span>
                  {a.reaction ? ` · ${a.reaction}` : ""}
                </div>
              ))
            ) : (
              <span className="text-slate-600">No known allergies</span>
            )}
          </Panel>
          <Panel title="Active medications" className="text-[12px]">
            {(p.meds ?? []).filter((m) => m.status !== "Discontinued").length ? (
              (p.meds ?? [])
                .filter((m) => m.status !== "Discontinued")
                .map((m) => (
                  <div key={m.id}>
                    <span className="font-semibold">{m.name}</span> · {m.sig}
                  </div>
                ))
            ) : (
              <span className="text-slate-500">None</span>
            )}
          </Panel>
        </div>

        <Panel
          title={`Orders to sign (${toSign.length})`}
          right={
            <>
              <Btn small disabled={!picked || picked.status !== "Unsigned"} onClick={() => cmd("ehr.order.remove")}>
                Remove
              </Btn>
              <Btn tone="primary" icon="pen" disabled={!toSign.some((o) => o.status === "Unsigned") || Boolean(doc.alert)} onClick={() => cmd("ehr.orders.sign", p.id)}>
                Sign orders
              </Btn>
            </>
          }
          bodyClass="p-0"
        >
          {toSign.length === 0 ? (
            <Empty>Nothing waiting. Choose an order from the catalog or add an order set.</Empty>
          ) : (
            <Table head={["Order", "Details", "Mode", "Ordering provider", "Diagnosis", "Status"]} dense>
              {toSign.map((o) => (
                <Row
                  key={o.id}
                  label={o.name}
                  selected={picked?.id === o.id}
                  onClick={() => select(`order:${o.id}`)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    select(`order:${o.id}`);
                    menu(e, orderRowMenu(o));
                  }}
                >
                  <Td className="font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Icon name={KIND_ICON[o.kind]} size={13} className="text-slate-500" />
                      {o.name}
                    </span>
                  </Td>
                  <Td>{detail(o)}</Td>
                  <Td>{o.mode}</Td>
                  <Td>{providerOf(doc, o.orderedBy)?.name ?? ""}</Td>
                  <Td className="font-mono text-[11.5px]">{o.details.dx ?? ""}</Td>
                  <Td>{o.status === "Alert" ? <Badge tone="red">Alert: respond</Badge> : <Badge tone="amber">Unsigned</Badge>}</Td>
                </Row>
              ))}
            </Table>
          )}
          <p className="border-t border-slate-200 px-2.5 py-1.5 text-[11px] text-slate-500">Search, configure, review, sign. An order is not an order until it is signed.</p>
        </Panel>

        <Panel
          title="Orders"
          right={
            <>
              <div className="flex gap-0.5 rounded-[3px] bg-slate-200 p-0.5">
                {(["all", "active", "pending"] as const).map((f) => (
                  <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className={`rounded-[2px] px-1.5 py-0.5 text-[11px] font-semibold ${filter === f ? "bg-white text-slate-900 shadow" : "text-slate-600"}`}>
                    {f === "all" ? "All" : f === "active" ? "Active" : "Pending results"}
                  </button>
                ))}
              </div>
              <Btn small disabled={!picked || Boolean(picked.result) || picked.status === "Unsigned" || picked.status === "Canceled"} onClick={() => cmd("ehr.order.followUp")}>
                Send follow-up
              </Btn>
              <Btn small disabled={!picked || !picked.result || picked.ack} onClick={() => cmd("ehr.result.ack")}>
                Acknowledge result
              </Btn>
            </>
          }
          bodyClass="p-0"
        >
          {listed.length === 0 ? (
            <Empty>No orders in this view.</Empty>
          ) : (
            <Table head={["Ordered", "Order", "Details", "Mode", "Status", "Result"]} dense>
              {listed.map((o) => {
                const age = daysAgo(o.date, doc.today);
                const overdue = (o.kind === "lab" || o.kind === "img") && !o.result && o.status !== "Canceled" && age >= 7;
                return (
                  <Row
                    key={o.id}
                    label={o.name}
                    selected={picked?.id === o.id}
                    onClick={() => select(`order:${o.id}`)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      select(`order:${o.id}`);
                      menu(e, orderRowMenu(o));
                    }}
                    tone={overdue ? "warn" : o.status === "Canceled" ? "muted" : undefined}
                  >
                    <Td className="whitespace-nowrap">
                      {o.date}
                      {age > 0 && <span className="block text-[10.5px] text-slate-500">{age} days ago</span>}
                    </Td>
                    <Td className="font-semibold">{o.name}</Td>
                    <Td>
                      {detail(o)}
                      {o.override && <span className="block text-[10.5px] text-rose-700">Override: {o.override}</span>}
                    </Td>
                    <Td>{o.mode}</Td>
                    <Td>
                      <Badge tone={STATUS_TONE[o.status] ?? "slate"}>{o.status}</Badge>
                      {o.followUp && <span className="ml-1 text-[10.5px] text-sky-700">Follow-up sent</span>}
                    </Td>
                    <Td>
                      {o.result ? (
                        <span>
                          {o.flag && <span className="mr-1 font-bold text-rose-700">{o.flag}</span>}
                          {o.result}
                          {o.ack && <span className="ml-1 text-[10.5px] text-emerald-700">Acknowledged</span>}
                        </span>
                      ) : overdue ? (
                        <span className="font-semibold text-amber-800">No result after {age} days</span>
                      ) : (
                        <span className="text-slate-400">Pending</span>
                      )}
                    </Td>
                  </Row>
                );
              })}
            </Table>
          )}
        </Panel>
        {(p.problems ?? []).length > 0 && (
          <p className="px-1 text-[11px] text-slate-500">
            Problem list: {(p.problems ?? []).map((c) => `${c} ${icdTitle(c)}`).join("; ")}
          </p>
        )}
      </div>
    </div>
  );
}
