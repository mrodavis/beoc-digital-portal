"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EMAIL_FIXES, normalizeAnswer } from "@/lib/typing-lab/drills";
import { freshSeed, rng, shuffle } from "@/lib/typing-lab/rng";
import { recordDrill } from "@/lib/typing-lab/storage";
import PrintPanel from "./PrintPanel";

const ROUND = 8;

export default function EmailFixDrill() {
  const [items, setItems] = useState(() => EMAIL_FIXES.slice(0, ROUND));
  const [i, setI] = useState(0);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<null | { ok: boolean }>(null);
  const [firstTry, setFirstTry] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const newRound = () => {
    setItems(shuffle(rng(freshSeed()), EMAIL_FIXES).slice(0, ROUND));
    setI(0);
    setValue("");
    setResult(null);
    setFirstTry([]);
    setDone(false);
  };
  useEffect(newRound, []);

  const item = items[i];
  const check = () => {
    if (!value.trim()) return;
    const ok = item.right.some((a) => normalizeAnswer(a) === normalizeAnswer(value));
    setResult({ ok });
    if (firstTry[i] === undefined) {
      const n = [...firstTry];
      n[i] = ok;
      setFirstTry(n);
    }
  };
  const next = () => {
    if (i + 1 >= items.length) {
      setDone(true);
      const c = firstTry.filter(Boolean).length;
      recordDrill({ at: new Date().toISOString(), drill: "email", score: `${c} of ${items.length} sentences right on the first try`, accuracy: Math.round((c / items.length) * 1000) / 10 });
      return;
    }
    setI(i + 1);
    setValue("");
    setResult(null);
    setTimeout(() => input.current?.focus(), 30);
  };
  const correct = firstTry.filter(Boolean).length;

  if (done) {
    return (
      <section aria-labelledby="em-results" className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 id="em-results" className="text-2xl font-bold text-gray-900">
          Email punctuation results
        </h2>
        <p className="text-3xl font-bold text-gray-900">
          {correct} of {items.length} <span className="text-lg font-semibold text-gray-700">right on the first try</span>
        </p>
        <ul className="space-y-2">
          {items.map((it, n) => (
            <li key={it.id} className={`rounded-lg border px-3 py-2 ${firstTry[n] ? "border-emerald-200 bg-emerald-50" : "border-amber-300 bg-amber-50"}`}>
              <span className="font-medium text-gray-900">{it.right[0]}</span>
              <span className="block text-sm text-gray-700">{it.rule}</span>
            </li>
          ))}
        </ul>
        <PrintPanel
          build={(studentName) => ({
            kind: "Typing Lab",
            title: "Email Punctuation and Capitalization",
            studentName,
            summary: `${correct} of ${items.length} sentences right on the first try`,
            rows: items.map((it, n) => ({ label: it.right[0], value: firstTry[n] ? "First try" : "Fixed after feedback", ok: Boolean(firstTry[n]) })),
          })}
        />
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={newRound} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            New set of sentences
          </button>
          <Link href="/typing-lab/tests?topic=email" className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100">
            Timed test with email passages
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-800">
        Each line has capitalization or punctuation mistakes. Type the corrected line and press Enter. Sentence {i + 1} of {items.length}.
      </p>
      <form
        className="space-y-3 rounded-xl border border-gray-300 bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (result?.ok) next();
          else check();
        }}
      >
        <div className="text-sm font-semibold text-gray-700">Fix this line</div>
        <p className="rounded-lg bg-gray-100 px-4 py-3 font-mono text-lg text-gray-900">{item.wrong}</p>
        <label htmlFor="fix-input" className="block text-sm font-semibold text-gray-900">
          Corrected line
        </label>
        <input
          id="fix-input"
          ref={input}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (result && !result.ok) setResult(null);
          }}
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded-lg border-2 border-gray-400 px-3 py-2 text-lg text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-200"
        />
        <div role="status" className="min-h-[1.5rem]">
          {result && (
            <div className={`rounded-lg px-4 py-3 ${result.ok ? "bg-emerald-50 text-emerald-950" : "bg-amber-50 text-amber-950"}`}>
              <p className="font-semibold">{result.ok ? "Correct." : "Not quite. Compare with the rule and try again."}</p>
              <p className="mt-1 text-sm">{item.rule}</p>
              {!result.ok && firstTry[i] === false && <p className="mt-1 text-sm">One correct version: {item.right[0]}</p>}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {!result?.ok ? (
            <button type="submit" className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              Check
            </button>
          ) : (
            <button type="submit" className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              {i + 1 >= items.length ? "See results" : "Next sentence"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
