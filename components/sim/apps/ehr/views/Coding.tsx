"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { EhrEncounter } from "../types";
import {
  CODESET_NOTICE,
  CPT_SECTIONS,
  HCPCS_LETTERS,
  ICD_CATEGORIES,
  ICD_INDEX,
  icdBillable,
  icdNode,
  icdTitle,
  MODIFIERS,
  PROC_CODES,
  procCode,
  type CptSection,
  type IcdCategory,
  type IcdIndexEntry,
  type IcdNode,
  type IcdNote,
} from "../codes";
import { authMissing, claimTotal, LETTERS, money, patientOf, payerOf, providerOf } from "../model";
import { Badge, Btn, EField, Empty, Icon, Panel, Row, Table, Td, useEhr } from "../ui";

/* ------------------------------------------------------------------ */
/* Shared: which encounter is being coded                              */
/* ------------------------------------------------------------------ */

function useEncounter(): EhrEncounter | undefined {
  const { doc } = useEhr();
  const list = doc.encounters ?? [];
  return list.find((e) => e.id === doc.nav.enc) ?? list.find((e) => e.status === "Open") ?? list[0];
}

function EncounterPicker({ enc }: { enc?: EhrEncounter }) {
  const { doc, cmd } = useEhr();
  const list = doc.encounters ?? [];
  if (!list.length) return <span className="text-[12px] text-slate-500">Lookup only: no encounter is open for coding.</span>;
  return (
    <label className="flex items-center gap-1.5 text-[12px]">
      <span className="font-semibold text-slate-600">Coding for</span>
      <select aria-label="Encounter being coded" value={enc?.id ?? ""} onChange={(e) => cmd("ehr.enc.open", e.target.value)} className="h-[26px] max-w-[340px] rounded-[3px] border border-slate-300 bg-white px-1 text-[12px] font-semibold">
        {list.map((e) => {
          const p = patientOf(doc, e.patient);
          return (
            <option key={e.id} value={e.id}>
              {p ? `${p.last}, ${p.first}` : e.patient} · {e.date} · {e.status}
            </option>
          );
        })}
      </select>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Encoder                                                             */
/* ------------------------------------------------------------------ */

const NOTE_STYLE: Record<IcdNote["kind"], { label: string; cls: string }> = {
  includes: { label: "Includes", cls: "border-slate-300 bg-slate-50 text-slate-800" },
  inclusion: { label: "Inclusion terms", cls: "border-slate-300 bg-slate-50 text-slate-800" },
  excludes1: { label: "Excludes1", cls: "border-rose-300 bg-rose-50 text-rose-900" },
  excludes2: { label: "Excludes2", cls: "border-amber-300 bg-amber-50 text-amber-900" },
  codeAlso: { label: "Code also", cls: "border-sky-300 bg-sky-50 text-sky-900" },
  useAdditional: { label: "Use additional code", cls: "border-sky-300 bg-sky-50 text-sky-900" },
  codeFirst: { label: "Code first", cls: "border-violet-300 bg-violet-50 text-violet-900" },
  note: { label: "Note", cls: "border-slate-300 bg-white text-slate-800" },
};

function Notes({ notes }: { notes?: IcdNote[] }) {
  if (!notes?.length) return null;
  return (
    <div className="mt-1 flex flex-col gap-1">
      {notes.map((n, i) => (
        <div key={i} className={`rounded-[3px] border px-2 py-1 text-[11.5px] leading-snug ${NOTE_STYLE[n.kind].cls}`}>
          <span className="font-bold">{NOTE_STYLE[n.kind].label}:</span>
          {n.partial && <span className="ml-1 text-[10.5px] font-normal opacity-75">(partial)</span>}
          <ul className="ml-4 list-disc">
            {n.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function matchesEntry(e: IcdIndexEntry, q: string): boolean {
  if (`${e.term} ${e.mods ?? ""}`.toLowerCase().includes(q)) return true;
  return (e.sub ?? []).some((s) => matchesEntry(s, q));
}

function IndexEntryView({ e, depth, onCode }: { e: IcdIndexEntry; depth: number; onCode: (code: string) => void }) {
  return (
    <div style={{ paddingLeft: depth * 16 }}>
      <div className="py-[2px] text-[12.5px]">
        {depth > 0 && <span className="mr-1 text-slate-400">-</span>}
        <span className={depth === 0 ? "font-bold" : ""}>{e.term}</span>
        {e.mods && <span className="text-slate-500"> {e.mods}</span>}
        {e.code && (
          <button type="button" onClick={() => onCode(e.code!)} className="ml-1.5 font-mono font-semibold text-sky-700 underline decoration-dotted underline-offset-2 hover:text-sky-900" aria-label={`Go to ${e.code} in the Tabular List`}>
            {e.code}
          </button>
        )}
        {e.see && <span className="ml-1.5 italic text-slate-600">see {e.see}</span>}
      </div>
      {(e.sub ?? []).map((s) => (
        <IndexEntryView key={s.term} e={s} depth={depth + 1} onCode={onCode} />
      ))}
    </div>
  );
}

function TreeNode({ node, cat, depth, selected, target, onPick }: { node: IcdNode; cat: IcdCategory; depth: number; selected: string; target: string; onPick: (c: string) => void }) {
  const leaf = !node.children?.length;
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (target === node.code) ref.current?.scrollIntoView({ block: "center" });
  }, [target, node.code]);
  return (
    <div style={{ paddingLeft: depth ? 14 : 0 }}>
      <button
        ref={ref}
        type="button"
        onClick={() => onPick(node.code)}
        aria-label={`${node.code} ${node.title}`}
        className={`flex w-full items-start gap-2 rounded-[3px] px-1.5 py-[3px] text-left text-[12.5px] ${selected === node.code ? "bg-sky-100 ring-1 ring-sky-500" : target === node.code ? "bg-amber-50" : "hover:bg-slate-50"}`}
      >
        <span className={`w-[70px] shrink-0 font-mono font-bold ${leaf ? "text-slate-900" : "text-slate-500"}`}>{node.code}</span>
        <span className="flex-1">{node.title}</span>
        {leaf ? cat.seventh ? <Badge tone="violet">7th character</Badge> : <Badge tone="green">Billable</Badge> : null}
      </button>
      {node.notes && <div className="ml-[80px]"><Notes notes={node.notes} /></div>}
      {(node.children ?? []).map((ch) => (
        <TreeNode key={ch.code} node={ch} cat={cat} depth={depth + 1} selected={selected} target={target} onPick={onPick} />
      ))}
    </div>
  );
}

type EncTab = "icd" | "cpt" | "hcpcs" | "mod";

export function EncoderView() {
  const { doc, cmd } = useEhr();
  const enc = useEncounter();
  const initTab = (["icd", "cpt", "hcpcs", "mod"] as EncTab[]).find((t) => doc.nav.sub?.startsWith(t)) ?? "icd";
  const [tab, setTab] = useState<EncTab>(initTab);
  const [icdView, setIcdView] = useState<"index" | "tabular">(doc.nav.sub === "icd:tabular" ? "tabular" : "index");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>(ICD_CATEGORIES[0].code);
  const [target, setTarget] = useState("");
  const [picked, setPicked] = useState("");
  const [seventh, setSeventh] = useState("");
  const [goTo, setGoTo] = useState("");
  const [section, setSection] = useState<CptSection>("Evaluation and Management");
  const [letter, setLetter] = useState("J");
  const [cq, setCq] = useState("");
  const [proc, setProc] = useState("");

  const category = ICD_CATEGORIES.find((c) => c.code === cat) ?? ICD_CATEGORIES[0];
  const pickedNode = picked ? icdNode(picked) : undefined;
  const full = pickedNode?.leaf && pickedNode.category.seventh ? (seventh ? `${picked}${seventh}` : "") : pickedNode?.leaf ? picked : "";
  const fullOk = full ? icdBillable(full).ok : false;

  const jump = (code0: string) => {
    const code = code0.replace(/-$/, "").toUpperCase();
    const n = icdNode(code) ?? icdNode(code.slice(0, 3));
    if (!n) return;
    setCat(n.category.code);
    setTarget(n.code);
    setPicked(n.code);
    setSeventh("");
    setIcdView("tabular");
  };

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return ICD_INDEX.filter((e) => matchesEntry(e, t));
  }, [q]);

  const chapters = Array.from(new Set(ICD_CATEGORIES.map((c) => c.chapter)));
  const procs = PROC_CODES.filter((p) => (tab === "cpt" ? p.set === "CPT" && (cq.trim() ? true : p.section === section) : p.set === "HCPCS" && (cq.trim() ? true : p.section === letter))).filter((p) => {
    const t = cq.trim().toLowerCase();
    return !t || p.code.toLowerCase().includes(t) || p.text.toLowerCase().includes(t);
  });
  const procSel = proc ? procCode(proc) : undefined;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-300 bg-white px-2.5 py-1.5">
        <EncounterPicker enc={enc} />
        {enc && (
          <div className="flex flex-wrap items-center gap-1 text-[11px]">
            <span className="text-slate-500">Diagnoses:</span>
            {enc.dx.length === 0 && <span className="text-slate-400">none yet</span>}
            {enc.dx.map((d, i) => (
              <Badge key={d} tone="blue">
                {LETTERS[i]}: {d}
              </Badge>
            ))}
            <span className="ml-1 text-slate-500">Lines:</span>
            {enc.lines.map((l) => (
              <Badge key={l.id}>{l.code}</Badge>
            ))}
          </div>
        )}
        <div className="flex-1" />
        {doc.workspaces.includes("charges") && enc && (
          <Btn small icon="receipt" onClick={() => cmd("ehr.nav", "charges")}>
            Open charge entry
          </Btn>
        )}
      </div>
      <div role="tablist" aria-label="Code sets" className="flex shrink-0 gap-0.5 border-b border-slate-300 bg-slate-200 px-2 pt-1">
        {(
          [
            ["icd", "ICD-10-CM"],
            ["cpt", "CPT"],
            ["hcpcs", "HCPCS Level II"],
            ["mod", "Modifiers"],
          ] as [EncTab, string][]
        ).map(([t, l]) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-t-[3px] border border-b-0 px-3 py-1 text-[12px] font-semibold ${tab === t ? "border-slate-300 bg-slate-100 text-slate-900" : "border-transparent text-slate-600 hover:bg-slate-100/70"}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === "icd" && (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-2.5 py-1.5">
            <div className="flex gap-0.5 rounded-[3px] bg-slate-200 p-0.5">
              {(["index", "tabular"] as const).map((v) => (
                <button key={v} type="button" aria-pressed={icdView === v} onClick={() => setIcdView(v)} className={`rounded-[2px] px-2 py-0.5 text-[11.5px] font-semibold ${icdView === v ? "bg-white text-slate-900 shadow" : "text-slate-600"}`}>
                  {v === "index" ? "Alphabetic Index" : "Tabular List"}
                </button>
              ))}
            </div>
            {icdView === "index" ? (
              <label className="relative">
                <Icon name="search" size={13} className="absolute left-1.5 top-[6px] text-slate-400" />
                <input aria-label="Search the Alphabetic Index" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Main term, e.g. sprain" className="h-[26px] w-64 rounded-[3px] border border-slate-300 pl-6 pr-1.5 text-[12.5px] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200" />
              </label>
            ) : (
              <form
                className="flex items-center gap-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  jump(goTo);
                }}
              >
                <input aria-label="Go to code" value={goTo} onChange={(e) => setGoTo(e.target.value)} placeholder="Go to code, e.g. S93" className="h-[26px] w-40 rounded-[3px] border border-slate-300 px-1.5 font-mono text-[12.5px] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200" />
                <Btn small>Go</Btn>
              </form>
            )}
            <span className="text-[11px] text-slate-500">{icdView === "index" ? "The Index points you to a code. Always confirm it in the Tabular List." : "The Tabular List holds the code and the notes that govern it."}</span>
          </div>
          {icdView === "index" ? (
            <div className="min-h-0 flex-1 overflow-auto bg-white p-3">
              {q.trim().length < 2 ? (
                <Empty>Type a main term (the condition, not the body part): sprain, pneumonia, diabetes, osteoarthritis.</Empty>
              ) : results.length === 0 ? (
                <Empty>No main term in the training index matches “{q}”. Try the condition: for a sprained ankle, look up “sprain”.</Empty>
              ) : (
                results.map((e) => (
                  <div key={e.term} className="mb-2 border-b border-slate-100 pb-2 last:border-b-0">
                    <IndexEntryView e={e} depth={0} onCode={jump} />
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="flex min-h-0 flex-1">
              <nav aria-label="Tabular categories" className="w-52 shrink-0 overflow-auto border-r border-slate-300 bg-white py-1">
                {chapters.map((ch) => (
                  <div key={ch} className="mb-1">
                    <div className="px-2 py-0.5 text-[10px] font-semibold uppercase leading-tight tracking-wide text-slate-500">{ch.replace(/^Chapter (\d+):.*\((.*)\)$/, "Ch. $1 ($2)")}</div>
                    {ICD_CATEGORIES.filter((c) => c.chapter === ch).map((c) => (
                      <button key={c.code} type="button" onClick={() => (setCat(c.code), setTarget(""), setPicked(""), setSeventh(""))} className={`block w-full px-2 py-[2px] text-left text-[11.5px] ${cat === c.code ? "bg-sky-100 font-semibold text-sky-900" : "text-slate-700 hover:bg-slate-50"}`}>
                        <span className="font-mono">{c.code}</span> {c.title}
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-auto bg-white p-3">
                  <div className="text-[10.5px] font-semibold uppercase tracking-wide text-slate-500">{category.chapter}</div>
                  {category.block && (
                    <div className="mt-0.5 text-[11.5px] font-semibold text-slate-700">
                      {category.block.title}
                      {category.block.range ? ` (${category.block.range})` : ""}
                      <Notes notes={category.block.notes} />
                    </div>
                  )}
                  <h4 className="mt-1.5 text-[14px] font-bold text-slate-900">
                    <span className="font-mono">{category.code}</span> {category.title}
                  </h4>
                  <Notes notes={category.notes} />
                  {category.seventh && (
                    <div className="mt-1.5 rounded-[3px] border border-violet-300 bg-violet-50 px-2 py-1 text-[11.5px] text-violet-950">
                      <span className="font-bold">The appropriate 7th character is to be added to each code from category {category.code}:</span>
                      <ul className="mt-0.5 grid gap-x-3 sm:grid-cols-2">
                        {category.seventh.map((s) => (
                          <li key={s.char}>
                            <span className="font-mono font-bold">{s.char}</span> {s.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-2 border-t border-slate-200 pt-1.5">
                    {category.children?.length ? (
                      category.children.map((n) => <TreeNode key={n.code} node={n} cat={category} depth={0} selected={picked} target={target} onPick={(c) => (setPicked(c), setSeventh(""))} />)
                    ) : (
                      <TreeNode node={category} cat={category} depth={0} selected={picked} target={target} onPick={(c) => (setPicked(c), setSeventh(""))} />
                    )}
                  </div>
                  <p className="mt-3 text-[10.5px] leading-snug text-slate-500">{CODESET_NOTICE}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t border-slate-300 bg-slate-50 px-2.5 py-1.5 text-[12px]">
                  {!pickedNode ? (
                    <span className="text-slate-500">Select a code in the list.</span>
                  ) : !pickedNode.leaf ? (
                    <span>
                      <span className="font-mono font-bold">{pickedNode.code}</span> is a heading, not a reportable code. Choose a code below it that has all its characters.
                    </span>
                  ) : (
                    <>
                      <span className="font-mono font-bold">{pickedNode.code}</span>
                      {pickedNode.category.seventh && (
                        <select aria-label="7th character" value={seventh} onChange={(e) => setSeventh(e.target.value)} className="h-[26px] max-w-[320px] rounded-[3px] border border-violet-400 bg-white px-1 text-[12px]">
                          <option value="">Choose 7th character…</option>
                          {pickedNode.category.seventh.map((s) => (
                            <option key={s.char} value={s.char}>
                              {s.char}: {s.label}
                            </option>
                          ))}
                        </select>
                      )}
                      {full && (
                        <span className="min-w-0 flex-1 truncate">
                          <span className="font-mono font-bold text-emerald-800">{full}</span> {icdTitle(full)}
                        </span>
                      )}
                      <div className="flex-1" />
                      {enc ? (
                        <Btn tone="primary" icon="plus" disabled={!fullOk || enc.status === "Billed"} onClick={() => cmd("ehr.dx.add", `${enc.id}:${full}`)}>
                          Add to encounter
                        </Btn>
                      ) : (
                        <span className="text-[11px] text-slate-500">Lookup only</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {(tab === "cpt" || tab === "hcpcs") && (
        <div className="flex min-h-0 flex-1">
          <nav aria-label={tab === "cpt" ? "CPT sections" : "HCPCS categories"} className="w-56 shrink-0 overflow-auto border-r border-slate-300 bg-white py-1">
            {tab === "cpt" ? (
              <>
                <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Category I sections</div>
                {CPT_SECTIONS.map((s) => (
                  <button key={s.name} type="button" onClick={() => (setSection(s.name), setCq(""), setProc(""))} className={`block w-full px-2 py-1 text-left text-[12px] ${section === s.name && !cq ? "bg-sky-100 font-semibold text-sky-900" : "text-slate-700 hover:bg-slate-50"}`}>
                    {s.name}
                    <span className="block font-mono text-[10.5px] text-slate-500">{s.range}</span>
                  </button>
                ))}
                <div className="mx-2 mt-2 rounded-[3px] bg-slate-50 p-1.5 text-[10.5px] leading-snug text-slate-600">
                  <div>
                    <span className="font-semibold">Category II</span>: four digits plus F, for performance measurement (supplemental).
                  </div>
                  <div className="mt-0.5">
                    <span className="font-semibold">Category III</span>: four digits plus T, for emerging technology.
                  </div>
                </div>
              </>
            ) : (
              HCPCS_LETTERS.map((h) => (
                <button key={h.letter} type="button" onClick={() => (setLetter(h.letter), setCq(""), setProc(""))} className={`block w-full px-2 py-1 text-left text-[12px] ${letter === h.letter && !cq ? "bg-sky-100 font-semibold text-sky-900" : "text-slate-700 hover:bg-slate-50"}`}>
                  <span className="font-mono font-bold">{h.letter}</span> {h.covers}
                  <span className="block text-[10.5px] text-slate-500">{h.example}</span>
                </button>
              ))
            )}
          </nav>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-2.5 py-1.5">
              <label className="relative">
                <Icon name="search" size={13} className="absolute left-1.5 top-[6px] text-slate-400" />
                <input aria-label={tab === "cpt" ? "Search CPT" : "Search HCPCS"} value={cq} onChange={(e) => setCq(e.target.value)} placeholder="Code or words" className="h-[26px] w-56 rounded-[3px] border border-slate-300 pl-6 pr-1.5 text-[12.5px] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200" />
              </label>
              <span className="text-[11px] text-slate-500">
                {tab === "cpt" ? CPT_SECTIONS.find((s) => s.name === section)?.note : "HCPCS Level II: one letter and four digits, maintained by CMS. Drug codes are billed in units of the amount shown."}
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-auto bg-white">
              {procs.length === 0 ? (
                <Empty>{tab === "cpt" && section === "Anesthesia" && !cq ? "No anesthesia codes are used in this clinic's training set." : "No codes match."}</Empty>
              ) : (
                <Table head={["Code", tab === "cpt" ? "Training summary" : "Item", tab === "hcpcs" ? "Unit" : "", "Fee"]} dense>
                  {procs.map((p) => (
                    <Row key={p.code} label={`${p.code} ${p.text}`} selected={proc === p.code} onClick={() => setProc(p.code)} onDoubleClick={() => enc && enc.status !== "Billed" && cmd("ehr.chg.add", `${enc.id}:${p.code}`)}>
                      <Td mono className="font-bold">
                        {p.code}
                      </Td>
                      <Td>{p.text}</Td>
                      <Td className="whitespace-nowrap text-slate-600">{p.per ?? ""}</Td>
                      <Td mono className="text-right">
                        {money(p.fee)}
                      </Td>
                    </Row>
                  ))}
                </Table>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-300 bg-slate-50 px-2.5 py-1.5 text-[12px]">
              {procSel ? (
                <>
                  <span className="font-mono font-bold">{procSel.code}</span>
                  <span className="min-w-0 flex-1 truncate">{procSel.text}</span>
                  {enc ? (
                    <Btn tone="primary" icon="plus" disabled={enc.status === "Billed"} onClick={() => cmd("ehr.chg.add", `${enc.id}:${procSel.code}`)}>
                      Add charge
                    </Btn>
                  ) : (
                    <span className="text-[11px] text-slate-500">Lookup only</span>
                  )}
                </>
              ) : (
                <span className="text-slate-500">Select a code to add it as a charge line.</span>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === "mod" && (
        <div className="min-h-0 flex-1 overflow-auto p-3">
          <Panel title="Modifiers" bodyClass="p-0">
            <Table head={["Modifier", "Means", "Attaches to"]}>
              {MODIFIERS.map((m) => (
                <Row key={m.code}>
                  <Td mono className="font-bold">
                    {m.code}
                  </Td>
                  <Td>{m.means}</Td>
                  <Td>{m.attaches}</Td>
                </Row>
              ))}
            </Table>
            <p className="border-t border-slate-200 px-2.5 py-2 text-[11.5px] leading-snug text-slate-600">A modifier adds a fact about the circumstances without changing what the code means. 25 goes on the E/M code; 59 (or a more specific X modifier) goes on the procedure. Never append 59 just to get a denied claim paid.</p>
          </Panel>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Charge entry (encounter / superbill)                                */
/* ------------------------------------------------------------------ */

export function ChargesView() {
  const { doc, sel, select, cmd, openForm, menu } = useEhr();
  const enc = useEncounter();
  const list = doc.encounters ?? [];
  if (!enc) return <Empty>No encounters to code.</Empty>;
  const p = patientOf(doc, enc.patient);
  const prov = providerOf(doc, enc.provider);
  const cov = p?.coverage?.find((c) => c.priority === 1);
  const billed = enc.status === "Billed";
  const selDx = sel.startsWith(`dx:${enc.id}:`) ? sel.slice(`dx:${enc.id}:`.length) : "";
  const selLine = sel.startsWith(`chg:${enc.id}:`) ? sel.slice(`chg:${enc.id}:`.length) : "";
  const sbDx = (enc.superbill ?? []).filter((c) => icdBillable(c).ok);
  const sbProc = (enc.superbill ?? []).filter((c) => procCode(c));
  return (
    <div className="flex min-h-0 flex-1">
      {list.length > 1 && (
        <nav aria-label="Encounters" className="w-48 shrink-0 overflow-auto border-r border-slate-300 bg-white py-1">
          <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Encounters</div>
          {list.map((e) => {
            const ep = patientOf(doc, e.patient);
            return (
              <button key={e.id} type="button" onClick={() => cmd("ehr.enc.open", e.id)} className={`block w-full border-l-[3px] px-2 py-1.5 text-left text-[12px] ${e.id === enc.id ? "border-sky-700 bg-sky-50" : "border-transparent hover:bg-slate-50"}`}>
                <span className="font-semibold">
                  {ep?.last}, {ep?.first}
                </span>
                <span className="block text-[10.5px] text-slate-500">
                  {e.date} · {e.status}
                </span>
              </button>
            );
          })}
        </nav>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-auto p-2.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-[3px] border border-slate-300 bg-white px-3 py-1.5 text-[12px]">
          <span className="text-[13px] font-bold">
            {p?.last}, {p?.first}
          </span>
          <span>DOS {enc.date}</span>
          <span>{prov ? `${prov.name}, ${prov.credentials}` : enc.provider}</span>
          <span>POS {enc.pos ?? "11"} (Office)</span>
          <span>{payerOf(doc, cov?.payer)?.name ?? "Self-pay"}</span>
          <div className="flex-1" />
          {billed ? <Badge tone="green">Billed on claim {enc.claim}</Badge> : <Badge tone="amber">Open</Badge>}
        </div>

        <Panel title="Provider documentation" right={<Btn small onClick={() => openForm("ehr.query", { enc: enc.id })}>Query provider…</Btn>}>
          <p className="whitespace-pre-line text-[12.5px] leading-relaxed">{enc.note}</p>
          {enc.query && (
            <div className="mt-2 rounded-[3px] border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-[12px]">
              <div>
                <span className="font-semibold">Your query:</span> {enc.query.question}
              </div>
              <div className="mt-0.5">
                <span className="font-semibold">{prov?.name ?? "Provider"} replied:</span> {enc.query.answer}
              </div>
            </div>
          )}
        </Panel>

        <div className="grid gap-2 lg:grid-cols-[1fr_250px]">
          <div className="flex min-w-0 flex-col gap-2">
            <Panel
              title="Diagnoses (Box 21)"
              right={
                <>
                  <Btn small disabled={!selDx || billed || enc.dx.indexOf(selDx) === 0} onClick={() => cmd("ehr.dx.first")}>
                    Make primary (A)
                  </Btn>
                  <Btn small disabled={!selDx || billed} onClick={() => cmd("ehr.dx.remove")}>
                    Remove
                  </Btn>
                  {doc.workspaces.includes("encoder") && (
                    <Btn small icon="book" onClick={() => cmd("ehr.nav", "encoder")}>
                      Encoder
                    </Btn>
                  )}
                </>
              }
              bodyClass="p-0"
            >
              {enc.dx.length === 0 ? (
                <Empty>No diagnoses yet. Look them up in the Encoder.</Empty>
              ) : (
                <Table head={["Ptr", "ICD-10-CM", "Description"]} dense>
                  {enc.dx.map((d, i) => (
                    <Row
                      key={d}
                      label={`Diagnosis ${LETTERS[i]} ${d}`}
                      selected={selDx === d}
                      onClick={() => select(`dx:${enc.id}:${d}`)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        select(`dx:${enc.id}:${d}`);
                        menu(e, [
                          { label: "Make primary (A)", onPick: () => cmd("ehr.dx.first"), disabled: billed || i === 0 },
                          { label: "Remove diagnosis", onPick: () => cmd("ehr.dx.remove"), disabled: billed, danger: true },
                        ]);
                      }}
                    >
                      <Td className="font-bold">{LETTERS[i]}</Td>
                      <Td mono className="font-semibold">
                        {d}
                      </Td>
                      <Td>{icdTitle(d)}</Td>
                    </Row>
                  ))}
                </Table>
              )}
            </Panel>

            <Panel
              title="Charges"
              right={
                <Btn small disabled={!selLine || billed} onClick={() => cmd("ehr.chg.remove")}>
                  Remove line
                </Btn>
              }
              bodyClass="p-0"
            >
              {enc.lines.length === 0 ? (
                <Empty>No charge lines. Add services from the superbill or the Encoder.</Empty>
              ) : (
                <Table head={["#", "CPT/HCPCS", "Mod 1", "Mod 2", "Dx pointer", "Units", "Fee", "Total"]} dense>
                  {enc.lines.map((l, i) => (
                    <Row key={l.id} label={`Line ${i + 1} ${l.code}`} selected={selLine === l.id} onClick={() => select(`chg:${enc.id}:${l.id}`)}>
                      <Td className="font-bold">{i + 1}</Td>
                      <Td>
                        <EField target={`${enc.id}.${l.id}.code`} value={l.code} label={`Line ${i + 1} code`} mono width={74} disabled={billed} />
                        <span className="mt-0.5 block max-w-[220px] text-[10.5px] leading-tight text-slate-500">{procCode(l.code)?.text ?? "Not in the code set"}</span>
                      </Td>
                      <Td>
                        <EField target={`${enc.id}.${l.id}.mod1`} value={l.mod1} label={`Line ${i + 1} modifier 1`} mono width={44} disabled={billed} />
                      </Td>
                      <Td>
                        <EField target={`${enc.id}.${l.id}.mod2`} value={l.mod2} label={`Line ${i + 1} modifier 2`} mono width={44} disabled={billed} />
                      </Td>
                      <Td>
                        <EField target={`${enc.id}.${l.id}.ptr`} value={l.ptr} label={`Line ${i + 1} diagnosis pointer`} mono width={52} disabled={billed} />
                      </Td>
                      <Td>
                        <EField target={`${enc.id}.${l.id}.units`} value={l.units} label={`Line ${i + 1} units`} mono width={44} disabled={billed} />
                      </Td>
                      <Td mono className="text-right">
                        {money(l.fee)}
                      </Td>
                      <Td mono className="text-right font-semibold">
                        {money(l.fee * l.units)}
                      </Td>
                    </Row>
                  ))}
                </Table>
              )}
              <div className="flex items-center justify-between border-t border-slate-200 px-2.5 py-1.5 text-[12px]">
                <span className="text-slate-500">Each line points to the diagnosis letter(s) that justify it, primary first (for example A or AB).</span>
                <span className="font-semibold">Total {money(claimTotal(enc))}</span>
              </div>
            </Panel>
            <div className="flex justify-end gap-2">
              {billed ? (
                doc.workspaces.includes("claims") && (
                  <Btn icon="claim" onClick={() => cmd("ehr.claim.open", enc.claim!)}>
                    Open claim {enc.claim}
                  </Btn>
                )
              ) : (
                <Btn tone="primary" icon="claim" disabled={!enc.lines.length} onClick={() => cmd("ehr.claim.create", enc.id)}>
                  Create claim
                </Btn>
              )}
            </div>
          </div>

          {(sbDx.length > 0 || sbProc.length > 0) && (
            <Panel title="Superbill" bodyClass="p-1.5">
              {sbProc.length > 0 && <div className="px-1 pb-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-500">Services</div>}
              {sbProc.map((c) => {
                const on = enc.lines.some((l) => l.code === c);
                return (
                  <label key={c} className="flex cursor-pointer items-start gap-1.5 rounded-[3px] px-1 py-[3px] text-[11.5px] hover:bg-slate-50">
                    <input type="checkbox" checked={on} disabled={on || billed} onChange={() => cmd("ehr.chg.add", `${enc.id}:${c}`)} className="mt-[2px] accent-sky-700" />
                    <span>
                      <span className="font-mono font-bold">{c}</span> {procCode(c)?.text}
                    </span>
                  </label>
                );
              })}
              {sbDx.length > 0 && <div className="mt-1 px-1 pb-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-500">Diagnoses</div>}
              {sbDx.map((c) => {
                const on = enc.dx.includes(c);
                return (
                  <label key={c} className="flex cursor-pointer items-start gap-1.5 rounded-[3px] px-1 py-[3px] text-[11.5px] hover:bg-slate-50">
                    <input type="checkbox" checked={on} disabled={on || billed} onChange={() => cmd("ehr.dx.add", `${enc.id}:${c}`)} className="mt-[2px] accent-sky-700" />
                    <span>
                      <span className="font-mono font-bold">{c}</span> {icdTitle(c)}
                    </span>
                  </label>
                );
              })}
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Preauthorization                                                    */
/* ------------------------------------------------------------------ */

const AUTH_TONE: Record<string, "amber" | "blue" | "green" | "red"> = { Needed: "amber", Submitted: "blue", Approved: "green", Pended: "red", Denied: "red" };

export function PreauthView() {
  const { doc, cmd } = useEhr();
  const auths = doc.auths ?? [];
  const a = auths.find((x) => x.id === doc.nav.auth) ?? auths[0];
  if (!a) return <Empty>No preauthorization requests.</Empty>;
  const p = patientOf(doc, a.patient);
  const payer = payerOf(doc, a.payer);
  const visit = (doc.appointments ?? []).find((v) => v.id === a.visit);
  const missing = authMissing(a);
  const responses = (a.responses ?? []).slice().reverse();
  return (
    <div className="flex min-h-0 flex-1">
      <nav aria-label="Preauthorization worklist" className="w-56 shrink-0 overflow-auto border-r border-slate-300 bg-white py-1">
        <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Authorization worklist</div>
        {auths.map((x) => {
          const xp = patientOf(doc, x.patient);
          return (
            <button key={x.id} type="button" onClick={() => cmd("ehr.auth.open", x.id)} className={`block w-full border-l-[3px] px-2 py-1.5 text-left text-[12px] ${x.id === a.id ? "border-sky-700 bg-sky-50" : "border-transparent hover:bg-slate-50"}`}>
              <span className="font-semibold">
                {xp?.last}, {xp?.first}
              </span>
              <span className="block text-[10.5px] text-slate-600">{x.service}</span>
              <span className="mt-0.5 flex items-center gap-1 text-[10.5px] text-slate-500">
                <Badge tone={AUTH_TONE[x.status]}>{x.status}</Badge> {x.serviceDate}
              </span>
            </button>
          );
        })}
      </nav>
      <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-auto p-2.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-[3px] border border-slate-300 bg-white px-3 py-1.5 text-[12px]">
          <span className="text-[13px] font-bold">
            {p?.last}, {p?.first}
          </span>
          <span>DOB {p?.dob}</span>
          <span>MRN {p?.mrn}</span>
          <span>{payer?.name}</span>
          <span>Member ID {p?.coverage?.find((c) => c.payer === a.payer)?.memberId}</span>
          <div className="flex-1" />
          <Badge tone={AUTH_TONE[a.status]}>{a.status}</Badge>
        </div>
        <div className="grid gap-2 lg:grid-cols-[1fr_260px]">
          <div className="flex min-w-0 flex-col gap-2">
            <Panel title="Provider's order and documentation">
              <div className="mb-1 text-[12.5px] font-semibold">
                {a.service} · requested for {a.serviceDate}
              </div>
              <p className="whitespace-pre-line text-[12.5px] leading-relaxed text-slate-800">{a.orderText}</p>
            </Panel>
            <Panel
              title="Prior authorization request (278)"
              right={
                <Btn tone="primary" icon="shield" disabled={missing.length > 0 || a.status === "Approved"} onClick={() => cmd("ehr.auth.submit", a.id)} title={missing.length ? `Missing: ${missing.join(", ")}` : undefined}>
                  Submit to payer
                </Btn>
              }
            >
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
                <EField target={`${a.id}.cpt`} value={a.cpt} label="CPT/HCPCS code" mono required disabled={a.status === "Approved"} />
                <EField target={`${a.id}.icd`} value={a.icd} label="ICD-10-CM code" mono required disabled={a.status === "Approved"} />
                <EField target={`${a.id}.units`} value={a.units} label="Units" mono disabled={a.status === "Approved"} />
                <EField target={`${a.id}.npi`} value={a.npi} label="Ordering provider NPI" mono required disabled={a.status === "Approved"} />
                <EField target={`${a.id}.notes`} value={a.notes} label="Clinical notes (why the service is needed)" multiline required className="col-span-2 md:col-span-4" disabled={a.status === "Approved"} />
              </div>
              {missing.length > 0 && <p className="mt-1.5 text-[11px] text-slate-500">Still needed: {missing.join(", ")}.</p>}
            </Panel>
            {responses.length > 0 && (
              <Panel title="Payer responses" bodyClass="p-2 space-y-2">
                {responses.map((r, i) => (
                  <div key={i} className={`rounded-[3px] border px-2.5 py-1.5 font-mono text-[11.5px] leading-relaxed ${r.status === "Approved" ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-rose-300 bg-rose-50 text-rose-950"}`}>
                    {r.lines.map((l, j) => (
                      <div key={j} className={j === 0 ? "font-sans text-[10.5px] font-semibold uppercase tracking-wide opacity-70" : ""}>
                        {l}
                      </div>
                    ))}
                  </div>
                ))}
              </Panel>
            )}
            {visit && (
              <Panel title="Scheduled visit">
                <div className="flex flex-wrap items-end gap-3 text-[12px]">
                  <div>
                    {visit.date} {visit.time} · {visit.type}
                    {visit.reason ? ` · ${visit.reason}` : ""}
                  </div>
                  <EField target={`${visit.id}.auth`} value={visit.auth} label="Authorization number on the visit" mono className="w-56" />
                </div>
              </Panel>
            )}
          </div>
          <Panel title="Provider directory" bodyClass="p-0">
            <Table head={["Provider", "NPI"]} dense>
              {doc.providers.map((pr) => (
                <Row key={pr.id}>
                  <Td>
                    <span className="font-semibold">
                      {pr.name}, {pr.credentials}
                    </span>
                    <span className="block text-[10.5px] text-slate-500">{pr.specialty}</span>
                  </Td>
                  <Td mono>{pr.npi}</Td>
                </Row>
              ))}
            </Table>
            <p className="border-t border-slate-200 px-2 py-1.5 text-[10.5px] leading-snug text-slate-500">Training NPIs are fictional and do not belong to any real provider.</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
