"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { checkField, FIELDS, makeRecords, type FieldCheck, type FieldName, type PatientRecord } from "@/lib/typing-lab/records";
import { freshSeed } from "@/lib/typing-lab/rng";
import { recordDrill } from "@/lib/typing-lab/storage";
import PrintPanel from "./PrintPanel";

const ROUND = 5;
type Values = Record<FieldName, string>;
const blank = (): Values => Object.fromEntries(FIELDS.map((f) => [f.name, ""])) as Values;
const spanCls: Record<number, string> = { 2: "sm:col-span-2", 3: "sm:col-span-3", 4: "sm:col-span-4", 6: "sm:col-span-6" };

function clock(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** The paper intake form and insurance card the student copies from. */
function Source({ r, n }: { r: PatientRecord; n: number }) {
  return (
    <div className="space-y-4" aria-label="Source documents">
      <div className="rounded-md border border-stone-300 bg-[#fdfcf7] p-5 text-gray-900 shadow-md">
        <div className="border-b-2 border-gray-900 pb-2 text-center">
          <div className="text-xs font-semibold tracking-wide text-gray-700">Lakeside Medical Associates</div>
          <div className="text-lg font-bold">Patient Information Form</div>
          <div className="text-xs text-gray-700">Form {n} of {ROUND}</div>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {(
            [
              ["Last name", r.lastName],
              ["First name", r.firstName],
              ["Date of birth (MM/DD/YYYY)", r.dob],
              ["Phone", r.phone],
              ["Street address", r.street, true],
              ["City", r.city],
              ["State / ZIP", `${r.state}  ${r.zip}`],
            ] as [string, string, boolean?][]
          ).map(([label, value, wide]) => (
            <div key={label} className={wide ? "col-span-2" : ""}>
              <dt className="text-[11px] font-semibold text-gray-600">{label}</dt>
              <dd className="border-b border-gray-400 pb-0.5 text-base font-medium text-blue-900">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 rounded bg-gray-100 px-3 py-2 text-sm">
          <span className="font-semibold">Appointment:</span> {r.apptTime} with Dr. Patel
        </div>
      </div>
      <div className="mx-auto max-w-sm rounded-xl border border-sky-800 bg-gradient-to-br from-sky-50 to-white p-4 text-gray-900 shadow-md">
        {r.memberId ? (
          <>
            <div className="text-sm font-bold text-sky-900">{r.plan}</div>
            <div className="mt-2 text-[11px] font-semibold text-gray-600">Member name</div>
            <div className="font-medium">
              {r.firstName} {r.lastName}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-gray-600">Member ID</div>
            <div className="font-mono text-lg font-bold tracking-wider">{r.memberId}</div>
            <div className="mt-1 text-[11px] text-gray-600">Sample card for practice only</div>
          </>
        ) : (
          <div className="text-sm">
            <div className="font-bold text-sky-900">No insurance card</div>
            The patient is paying for the visit (self-pay). Choose Self-pay and leave Member ID blank.
          </div>
        )}
      </div>
    </div>
  );
}

export default function DataEntryDrill() {
  const [seed, setSeed] = useState(1);
  const records = useMemo(() => makeRecords(seed, ROUND), [seed]);
  const [i, setI] = useState(0);
  const [values, setValues] = useState<Values>(blank);
  const [checks, setChecks] = useState<Partial<Record<FieldName, FieldCheck>> | null>(null);
  const [firstTry, setFirstTry] = useState<{ ok: number; total: number }[]>([]);
  const [readBack, setReadBack] = useState(false);
  const [needReadBack, setNeedReadBack] = useState(false);
  const [keys, setKeys] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const firstField = useRef<HTMLInputElement>(null);
  const r = records[i];

  useEffect(() => {
    // Start each round with new records, different for every visit.
    setSeed(freshSeed());
  }, []);

  useEffect(() => {
    if (start === null || end !== null) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [start, end]);

  const done = end !== null;
  const check = () => {
    if (!readBack) {
      setNeedReadBack(true);
      return;
    }
    setNeedReadBack(false);
    const c: Partial<Record<FieldName, FieldCheck>> = {};
    for (const f of FIELDS) c[f.name] = checkField(f, r[f.name], values[f.name]);
    setChecks(c);
    if (firstTry[i] === undefined) {
      const ok = FIELDS.filter((f) => c[f.name]?.ok).length;
      const next = [...firstTry];
      next[i] = { ok, total: FIELDS.length };
      setFirstTry(next);
    }
  };

  const nextRecord = () => {
    if (i + 1 >= ROUND) {
      const t = Date.now();
      setEnd(t);
      const ok = firstTry.reduce((n, x) => n + x.ok, 0);
      const total = firstTry.reduce((n, x) => n + x.total, 0);
      const acc = total ? Math.round((ok / total) * 1000) / 10 : 0;
      recordDrill({ at: new Date().toISOString(), drill: "data-entry", score: `${ok} of ${total} fields right on the first check`, accuracy: acc });
      return;
    }
    setI(i + 1);
    setValues(blank());
    setChecks(null);
    setReadBack(false);
    setTimeout(() => firstField.current?.focus(), 30);
  };

  const restart = () => {
    setSeed(freshSeed());
    setI(0);
    setValues(blank());
    setChecks(null);
    setFirstTry([]);
    setReadBack(false);
    setKeys(0);
    setStart(null);
    setEnd(null);
  };

  const ok = firstTry.reduce((n, x) => n + x.ok, 0);
  const total = firstTry.reduce((n, x) => n + x.total, 0);
  const perfect = firstTry.filter((x) => x.ok === x.total).length;
  const elapsedMs = start === null ? 0 : (end ?? now) - start;
  const kph = elapsedMs > 0 ? Math.round(keys / (elapsedMs / 3_600_000)) : 0;
  const accuracy = total ? Math.round((ok / total) * 1000) / 10 : 0;
  const allOk = checks && FIELDS.every((f) => checks[f.name]?.ok);

  if (done) {
    return (
      <section aria-labelledby="de-results" className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 id="de-results" className="text-2xl font-bold text-gray-900">
          Data entry results
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Tile label="Fields right on the first check" value={`${ok} of ${total}`} note={`${accuracy}% accuracy`} strong />
          <Tile label="Records with no errors" value={`${perfect} of ${ROUND}`} note="Every field matched the source" />
          <Tile label="Speed" value={`${kph.toLocaleString("en-US")} KPH`} note={`Keystrokes per hour, ${clock(elapsedMs)} total`} />
        </div>
        <p className="text-gray-800">In a medical office, accuracy matters more than speed here: one wrong digit in a date of birth or member ID can get a claim denied. Read every field back before you save.</p>
        <PrintPanel
          build={(studentName) => ({
            kind: "Typing Lab",
            title: "Patient Registration Data Entry",
            studentName,
            summary: `${ok} of ${total} fields right on the first check (${accuracy}%)`,
            rows: [
              ...firstTry.map((x, n) => ({ label: `Record ${n + 1}: ${records[n].firstName} ${records[n].lastName}`, value: `${x.ok} of ${x.total} fields`, ok: x.ok === x.total })),
              { label: "Records with no errors", value: `${perfect} of ${ROUND}` },
              { label: "Time", value: clock(elapsedMs) },
              { label: "Keystrokes per hour (KPH)", value: kph.toLocaleString("en-US") },
            ],
            note: "Scored on the first check of each record. All patients and numbers are fictional practice data.",
          })}
        />
        <button type="button" onClick={restart} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
          Enter a new set of records
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-800">
        <span className="font-semibold">
          Record {i + 1} of {ROUND}
        </span>
        <span>Time {clock(elapsedMs)}</span>
        <span>
          First-check accuracy so far: {total ? `${accuracy}%` : "–"}
        </span>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Source r={r} n={i + 1} />
        <form
          className="rounded-xl border border-gray-300 bg-white shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            check();
          }}
          onKeyDown={(e) => {
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
              setKeys((k) => k + 1);
              if (start === null) setStart(Date.now());
            }
          }}
        >
          <div className="rounded-t-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white">Registration · New patient</div>
          <div className="grid grid-cols-1 gap-x-3 gap-y-3 p-4 sm:grid-cols-6">
            {FIELDS.map((f, n) => {
              const c = checks?.[f.name];
              const id = `de-${f.name}`;
              const cls = `w-full rounded-md border bg-white px-2.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300 ${c ? (c.ok ? "border-emerald-600" : "border-red-600") : "border-gray-400 focus:border-primary-600"}`;
              return (
                <div key={f.name} className={spanCls[f.span]}>
                  <label htmlFor={id} className="mb-1 block text-sm font-semibold text-gray-900">
                    {f.label}
                  </label>
                  {f.kind === "select" ? (
                    <select id={id} value={values[f.name]} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} className={cls}>
                      <option value="">Select…</option>
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={id}
                      ref={n === 0 ? firstField : undefined}
                      value={values[f.name]}
                      onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      autoComplete="off"
                      spellCheck={false}
                      aria-invalid={c ? !c.ok : undefined}
                      aria-describedby={c ? `${id}-note` : undefined}
                      className={cls}
                    />
                  )}
                  {c && (
                    <p id={`${id}-note`} className={`mt-1 text-sm ${c.ok ? "text-emerald-800" : "text-red-800"}`}>
                      {c.ok ? "✓ Matches" : `✗ Source: ${r[f.name] || "(blank)"}`}
                      {c.note ? `. ${c.note}` : ""}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="space-y-3 border-t border-gray-200 px-4 py-3">
            <label className="flex items-start gap-2 text-sm text-gray-900">
              <input type="checkbox" checked={readBack} onChange={(e) => setReadBack(e.target.checked)} className="mt-0.5 h-4 w-4 accent-primary-700" />
              I read every field back against the source documents.
            </label>
            {needReadBack && <p className="text-sm font-medium text-amber-900">Read each field back against the form and the card first, then check this box.</p>}
            <div className="flex flex-wrap items-center gap-2">
              <button type="submit" className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                {checks ? "Check again" : "Check record"}
              </button>
              {checks && (
                <button type="button" onClick={nextRecord} className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                  {i + 1 >= ROUND ? "See results" : "Save and next record"}
                </button>
              )}
              <p role="status" className="text-sm text-gray-800">
                {checks ? (allOk ? "Every field matches. Nice work." : "Fix the fields marked ✗, then check again. Your score counts the first check.") : "Press Tab to move between fields."}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Tile({ label, value, note, strong }: { label: string; value: string; note: string; strong?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${strong ? "border-2 border-primary-700 bg-primary-50" : "border-gray-200"}`}>
      <div className="text-sm font-semibold text-gray-700">{label}</div>
      <div className="text-3xl font-bold tabular-nums text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-700">{note}</div>
    </div>
  );
}
