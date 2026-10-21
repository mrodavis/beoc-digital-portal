"use client";

import { useEffect, useRef, useState } from "react";
import { KEYPAD, TEN_KEY_MODES, tenKeyEntries, type TenKeyMode } from "@/lib/typing-lab/drills";
import { FINGER_COLOR, FINGER_NAME } from "@/lib/typing-lab/keyboard";
import { freshSeed } from "@/lib/typing-lab/rng";
import { recordDrill } from "@/lib/typing-lab/storage";
import PrintPanel from "./PrintPanel";

const COUNT = 15;

function Keypad({ next }: { next: string | null }) {
  return (
    <div aria-hidden="true" className="inline-grid select-none grid-cols-4 gap-1 rounded-2xl border border-gray-300 bg-gray-200 p-2" style={{ gridTemplateRows: "repeat(5, 2.75rem)", gridTemplateColumns: "repeat(4, 3rem)" }}>
      {KEYPAD.flatMap((row, ri) =>
        row.map((k, ci) => {
          const isNext = next !== null && (k.k === next || (next === "\n" && k.k === "Enter"));
          // place keys on the grid like a real keypad
          const col = ri === 4 ? (k.k === "0" ? 1 : 3) : ci + 1;
          return (
            <div
              key={k.k}
              className={`relative flex items-center justify-center rounded-md border text-sm font-semibold ${isNext ? "border-primary-900 text-white ring-[3px] ring-primary-300" : "border-black/10 text-gray-900"}`}
              style={{ gridRow: `${ri + 1} / span ${k.h ?? 1}`, gridColumn: `${col} / span ${k.w ?? 1}`, background: isNext ? "#1d4ed8" : FINGER_COLOR[k.f] }}
            >
              {k.label ?? k.k}
              {k.k === "5" && <span className={`absolute bottom-1.5 h-[2px] w-3 rounded ${isNext ? "bg-white" : "bg-gray-700"}`} />}
            </div>
          );
        }),
      )}
    </div>
  );
}

export default function TenKeyDrill() {
  const [mode, setMode] = useState<TenKeyMode>("whole");
  const [seed, setSeed] = useState(1);
  const [entries, setEntries] = useState<string[]>(() => tenKeyEntries("whole", 1, COUNT));
  const [i, setI] = useState(0);
  const [value, setValue] = useState("");
  const [log, setLog] = useState<{ want: string; got: string; ok: boolean }[]>([]);
  const [keys, setKeys] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [usedPad, setUsedPad] = useState<boolean | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSeed(freshSeed());
  }, []);
  useEffect(() => {
    setEntries(tenKeyEntries(mode, seed, COUNT));
    setI(0);
    setValue("");
    setLog([]);
    setKeys(0);
    setStart(null);
    setEnd(null);
  }, [mode, seed]);

  const want = entries[i];
  const done = end !== null;
  const correct = log.filter((l) => l.ok).length;
  const secs = start === null ? 0 : ((end ?? Date.now()) - start) / 1000;
  const kph = secs > 0 ? Math.round(keys / (secs / 3600)) : 0;
  const next = done ? null : value.length < (want?.length ?? 0) ? want[value.length] : "\n";

  const submit = () => {
    if (!want || !value) return;
    const ok = value.trim() === want;
    const nlog = [...log, { want, got: value.trim(), ok }];
    setLog(nlog);
    setValue("");
    if (i + 1 >= entries.length) {
      setEnd(Date.now());
      const c = nlog.filter((l) => l.ok).length;
      recordDrill({ at: new Date().toISOString(), drill: "ten-key", score: `${c} of ${entries.length} entries correct`, accuracy: Math.round((c / entries.length) * 1000) / 10 });
    } else setI(i + 1);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 text-gray-900">
        <p className="font-semibold">No numeric keypad on your laptop?</p>
        <p className="mt-1 text-sm leading-relaxed">
          Practice on the number row above the letters for now, or plug in a USB numeric keypad if one is available. When you use a keypad, check that Num Lock is on: with Num Lock off, the keypad moves the cursor instead of typing numbers.
        </p>
      </div>

      <fieldset disabled={start !== null && !done} className="flex flex-wrap gap-2">
        <legend className="mb-1.5 text-sm font-semibold text-gray-900">Entries</legend>
        {TEN_KEY_MODES.map((m) => (
          <label key={m.id} className={`cursor-pointer rounded-lg border px-3 py-2 text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 ${mode === m.id ? "border-primary-700 bg-primary-50 text-primary-900" : "border-gray-300 bg-white text-gray-800"}`}>
            <input type="radio" name="tenkey-mode" className="sr-only" checked={mode === m.id} onChange={() => setMode(m.id)} />
            <span className="block font-semibold">{m.label}</span>
            <span className="block text-xs text-gray-700">{m.blurb}</span>
          </label>
        ))}
      </fieldset>

      {!done ? (
        <div className="grid items-start gap-6 md:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            <p className="text-gray-800">
              Type each number, then press <kbd className="rounded border border-gray-400 bg-white px-1.5 font-mono text-sm">Enter</kbd>. Rest your right hand on 4, 5, 6 (feel the bump on 5), use your thumb for 0, and keep your eyes on the screen.
            </p>
            <div className="rounded-xl border border-gray-300 bg-white p-4">
              <div className="text-sm font-semibold text-gray-700">
                Entry {i + 1} of {entries.length}
              </div>
              <div className="mt-1 font-mono text-4xl font-bold tracking-wider text-gray-900">{want}</div>
              <label htmlFor="tenkey-input" className="mt-3 block text-sm font-semibold text-gray-900">
                Type it here
              </label>
              <input
                id="tenkey-input"
                ref={input}
                value={value}
                inputMode="decimal"
                autoComplete="off"
                onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ""))}
                onKeyDown={(e) => {
                  if (e.code.startsWith("Numpad") && /\d|\./.test(e.key)) setUsedPad(true);
                  else if (/^\d$/.test(e.key) && e.code.startsWith("Digit")) setUsedPad((u) => (u === true ? true : false));
                  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    setKeys((k) => k + 1);
                    if (start === null) setStart(Date.now());
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setKeys((k) => k + 1);
                    submit();
                  }
                }}
                className="mt-1 w-full max-w-xs rounded-lg border-2 border-gray-400 px-3 py-2 font-mono text-2xl text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-200"
              />
              <p className="mt-2 text-sm text-gray-700" aria-live="polite">
                {log.length ? (log[log.length - 1].ok ? `✓ ${log[log.length - 1].want} was right.` : `✗ You typed ${log[log.length - 1].got}; it should be ${log[log.length - 1].want}.`) : "Your first keystroke starts the clock."}
              </p>
              {usedPad !== null && <p className="mt-1 text-xs text-gray-600">You are typing on the {usedPad ? "numeric keypad" : "number row"}.</p>}
            </div>
            {log.length > 0 && <ol className="max-h-56 overflow-auto rounded-xl border border-gray-200 bg-white text-sm" aria-label="Entries so far">
              {log.map((l, n) => (
                <li key={n} className={`flex justify-between gap-4 border-b border-gray-100 px-3 py-1.5 font-mono ${l.ok ? "text-gray-900" : "bg-red-50 text-red-800"}`}>
                  <span>{n + 1}.</span>
                  <span>{l.got}</span>
                  <span>{l.ok ? "✓" : `✗ ${l.want}`}</span>
                </li>
              ))}
            </ol>}
          </div>
          <div className="text-center">
            <Keypad next={next} />
            <p className="mt-2 max-w-[13rem] text-xs text-gray-700">
              Index finger: 1 4 7. Middle: 2 5 8. Ring: 3 6 9 and the decimal point. Pinky: Enter. Thumb: 0.
            </p>
            <p className="sr-only">Colors match the keyboard: {FINGER_NAME.ri}, {FINGER_NAME.rm}, {FINGER_NAME.rr}, {FINGER_NAME.rp}.</p>
          </div>
        </div>
      ) : (
        <section aria-labelledby="tk-results" className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 id="tk-results" className="text-2xl font-bold text-gray-900">
            10-key results
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border-2 border-primary-700 bg-primary-50 p-4">
              <div className="text-sm font-semibold text-gray-700">Correct entries</div>
              <div className="text-3xl font-bold text-gray-900">
                {correct} of {entries.length}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-700">Keystrokes per hour</div>
              <div className="text-3xl font-bold text-gray-900">{kph.toLocaleString("en-US")}</div>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-700">Time</div>
              <div className="text-3xl font-bold text-gray-900">{Math.round(secs)} sec</div>
            </div>
          </div>
          <p className="text-gray-800">Number entry is measured in keystrokes per hour (KPH), counting every digit, decimal point, and Enter. Accuracy still comes first: one wrong digit in a charge or a chart number is a real error.</p>
          <PrintPanel
            build={(studentName) => ({
              kind: "Typing Lab",
              title: "10-Key Number Entry",
              studentName,
              summary: `${correct} of ${entries.length} entries correct, ${kph.toLocaleString("en-US")} KPH`,
              rows: [
                { label: "Entries", value: TEN_KEY_MODES.find((m) => m.id === mode)?.label ?? mode },
                { label: "Correct entries", value: `${correct} of ${entries.length}`, ok: correct === entries.length },
                { label: "Keystrokes per hour (KPH)", value: kph.toLocaleString("en-US") },
                { label: "Time", value: `${Math.round(secs)} seconds` },
                { label: "Keys used", value: usedPad ? "Numeric keypad" : "Number row" },
                ...log.filter((l) => !l.ok).map((l) => ({ label: `Typed ${l.got}`, value: `should be ${l.want}`, ok: false })),
              ],
            })}
          />
          <button type="button" onClick={() => setSeed(freshSeed())} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            New set of numbers
          </button>
        </section>
      )}
    </div>
  );
}
