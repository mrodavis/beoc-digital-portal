"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CanvasProps, SimUi, StatusBarProps } from "../../types";
import type { TypingDoc, TypingExercise, TypingField, TypingFormExercise, TypingKeysExercise, TypingPassageExercise, TypingSource } from "./types";
import { formFields } from "./core";

const TEAL = "#0f766e";

/* ------------------------------------------------------------------ */
/* Keyboard model                                                      */
/* ------------------------------------------------------------------ */

type Finger = "lp" | "lr" | "lm" | "li" | "ri" | "rm" | "rr" | "rp" | "th";

const ROWS: { k: string; label?: string; w?: number; f: Finger }[][] = [
  [
    { k: "`", f: "lp" }, { k: "1", f: "lp" }, { k: "2", f: "lr" }, { k: "3", f: "lm" }, { k: "4", f: "li" }, { k: "5", f: "li" }, { k: "6", f: "ri" }, { k: "7", f: "ri" }, { k: "8", f: "rm" }, { k: "9", f: "rr" }, { k: "0", f: "rp" }, { k: "-", f: "rp" }, { k: "=", f: "rp" }, { k: "Backspace", label: "Backspace", w: 2, f: "rp" },
  ],
  [
    { k: "Tab", label: "Tab", w: 1.5, f: "lp" }, { k: "q", f: "lp" }, { k: "w", f: "lr" }, { k: "e", f: "lm" }, { k: "r", f: "li" }, { k: "t", f: "li" }, { k: "y", f: "ri" }, { k: "u", f: "ri" }, { k: "i", f: "rm" }, { k: "o", f: "rr" }, { k: "p", f: "rp" }, { k: "[", f: "rp" }, { k: "]", f: "rp" }, { k: "\\", w: 1.5, f: "rp" },
  ],
  [
    { k: "CapsLock", label: "Caps Lock", w: 1.8, f: "lp" }, { k: "a", f: "lp" }, { k: "s", f: "lr" }, { k: "d", f: "lm" }, { k: "f", f: "li" }, { k: "g", f: "li" }, { k: "h", f: "ri" }, { k: "j", f: "ri" }, { k: "k", f: "rm" }, { k: "l", f: "rr" }, { k: ";", f: "rp" }, { k: "'", f: "rp" }, { k: "Enter", label: "Enter", w: 2.2, f: "rp" },
  ],
  [
    { k: "ShiftL", label: "Shift", w: 2.4, f: "lp" }, { k: "z", f: "lp" }, { k: "x", f: "lr" }, { k: "c", f: "lm" }, { k: "v", f: "li" }, { k: "b", f: "li" }, { k: "n", f: "ri" }, { k: "m", f: "ri" }, { k: ",", f: "rm" }, { k: ".", f: "rr" }, { k: "/", f: "rp" }, { k: "ShiftR", label: "Shift", w: 2.6, f: "rp" },
  ],
  [{ k: " ", label: "", w: 7, f: "th" }],
];

const FINGER_COLOR: Record<Finger, string> = { lp: "#fde68a", lr: "#bbf7d0", lm: "#bfdbfe", li: "#fbcfe8", ri: "#fecdd3", rm: "#bfdbfe", rr: "#bbf7d0", rp: "#fde68a", th: "#e2e8f0" };
const FINGER_NAME: Record<Finger, string> = { lp: "left pinky", lr: "left ring finger", lm: "left middle finger", li: "left index finger", ri: "right index finger", rm: "right middle finger", rr: "right ring finger", rp: "right pinky", th: "thumb" };
const SHIFTED: Record<string, string> = { "!": "1", "@": "2", "#": "3", $: "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", _: "-", "+": "=", "{": "[", "}": "]", "|": "\\", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/", "~": "`" };
const KEY_FINGER: Record<string, Finger> = Object.fromEntries(ROWS.flat().map((r) => [r.k, r.f]));

function keyFor(ch: string): { key: string; shift: "ShiftL" | "ShiftR" | null } {
  if (ch === " ") return { key: " ", shift: null };
  let base = ch;
  let shift = false;
  if (SHIFTED[ch]) {
    base = SHIFTED[ch];
    shift = true;
  } else if (/[A-Z]/.test(ch)) {
    base = ch.toLowerCase();
    shift = true;
  }
  const f = KEY_FINGER[base];
  const left = f ? f.startsWith("l") : true;
  return { key: base, shift: shift ? (left ? "ShiftR" : "ShiftL") : null };
}

function Keyboard({ next, intro }: { next: string | null; intro?: string[] }) {
  const nk = next !== null ? keyFor(next) : null;
  const introSet = new Set((intro ?? []).map((k) => k.toLowerCase()));
  return (
    <div className="mx-auto w-full max-w-[680px] select-none rounded-xl bg-[#e5e7eb] p-1.5 shadow-inner" aria-hidden="true">
      {ROWS.map((row, i) => (
        <div key={i} className="mb-1 flex gap-1 last:mb-0" style={{ justifyContent: i === 4 ? "center" : undefined }}>
          {row.map((r) => {
            const isNext = nk && (r.k === nk.key || r.k === nk.shift);
            const bump = r.k === "f" || r.k === "j";
            return (
              <div
                key={r.k}
                className={`relative flex h-8 items-center justify-center rounded-md border text-[11px] font-medium transition-colors ${isNext ? "border-[#0f766e] text-white shadow-[0_0_0_2px_#5eead4]" : "border-black/10 text-[#374151]"} ${introSet.has(r.k) && !isNext ? "font-bold" : ""}`}
                style={{ flex: r.w ?? 1, background: isNext ? TEAL : FINGER_COLOR[r.f], opacity: introSet.size && !introSet.has(r.k) && r.k.length === 1 && r.k !== " " && !isNext ? 0.55 : 1 }}
              >
                {r.label ?? r.k.toUpperCase()}
                {bump && <span className="absolute bottom-1 h-[2px] w-2.5 rounded bg-current opacity-60" />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Drill (keys and passages)                                           */
/* ------------------------------------------------------------------ */

interface Result {
  wpm: number;
  accuracy: number;
  seconds: number;
  errors: number;
}

function fmtSecs(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function Drill({ ex, onCommit, onNext, best }: { ex: TypingKeysExercise | TypingPassageExercise; onCommit: (value: string, r: Result) => void; onNext?: () => void; best?: Result }) {
  const isKeys = ex.kind === "keys";
  const text = ex.text;
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [strokes, setStrokes] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [focused, setFocused] = useState(false);
  const [flash, setFlash] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [wrongAt, setWrongAt] = useState<Set<number>>(new Set());
  const input = useRef<HTMLInputElement>(null);
  const textBox = useRef<HTMLDivElement>(null);

  const clear = () => {
    setTyped("");
    setErrors(0);
    setStrokes(0);
    setStart(null);
    setResult(null);
    setWrongAt(new Set());
  };
  const reset = () => {
    clear();
    setTimeout(() => input.current?.focus(), 0);
  };
  useEffect(clear, [ex.id]);

  useEffect(() => {
    if (start === null || result) return;
    const i = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(i);
  }, [start, result]);

  useEffect(() => {
    textBox.current?.querySelector('[data-cur="1"]')?.scrollIntoView({ block: "nearest" });
  }, [typed.length]);

  const elapsed = start === null ? 0 : ((result ? start + result.seconds * 1000 : now) - start) / 1000;
  const correct = typed.split("").filter((c, i) => c === text[i]).length;
  const wpm = elapsed > 1 ? Math.round(correct / 5 / (elapsed / 60)) : 0;
  const accuracy = strokes ? Math.round(((strokes - errors) / strokes) * 100) : 100;

  const finish = (finalTyped: string, finalErrors: number, finalStrokes: number) => {
    const secs = start === null ? 1 : Math.max(1, (Date.now() - start) / 1000);
    const corr = finalTyped.split("").filter((c, i) => c === text[i]).length;
    const r: Result = { wpm: Math.round(corr / 5 / (secs / 60)), accuracy: finalStrokes ? Math.round(((finalStrokes - finalErrors) / finalStrokes) * 100) : 100, seconds: secs, errors: finalErrors };
    setResult(r);
    onCommit(finalTyped, r);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (result) {
      if (e.key === "Enter") {
        e.preventDefault();
        reset();
      }
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Tab") {
      e.preventDefault();
      return;
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      if (!isKeys && (ex as TypingPassageExercise).backspace !== false && typed.length) setTyped(typed.slice(0, -1));
      return;
    }
    if (e.key.length !== 1) return;
    e.preventDefault();
    const ch = e.key;
    if (start === null) {
      setStart(Date.now());
      setNow(Date.now());
    }
    const expected = text[typed.length];
    const ok = ch === expected;
    const nStrokes = strokes + 1;
    const nErrors = errors + (ok ? 0 : 1);
    setStrokes(nStrokes);
    setErrors(nErrors);
    if (isKeys) {
      if (!ok) {
        setFlash(true);
        setTimeout(() => setFlash(false), 180);
        return;
      }
      const t = typed + ch;
      setTyped(t);
      if (t.length >= text.length) finish(t, nErrors, nStrokes);
      return;
    }
    if (!ok) setWrongAt((s) => new Set(s).add(typed.length));
    const t = typed + ch;
    setTyped(t);
    if (t.length >= text.length) finish(t, nErrors, nStrokes);
  };

  const next = result ? null : text[typed.length] ?? null;
  const nk = next !== null ? keyFor(next) : null;
  const hint = nk ? `Next: ${next === " " ? "Space" : next}${nk.shift ? " (with Shift)" : ""} - ${FINGER_NAME[KEY_FINGER[nk.key] ?? "th"]}` : "";
  const showKeyboard = isKeys || (ex as TypingPassageExercise).keyboard !== false;
  const goalWpm = ex.kind === "passage" ? ex.goalWpm : undefined;
  const goalAcc = ex.kind === "passage" ? ex.goalAccuracy ?? 95 : undefined;
  const progress = Math.round((typed.length / text.length) * 100);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto px-7 py-3">
      <div className="mb-2 flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#0f766e]">{isKeys ? "Key drill" : "Passage drill"}</div>
          <h2 className="text-[20px] font-bold leading-tight text-[#0f172a]">{ex.title}</h2>
          {ex.subtitle && <p className="text-[13px] text-[#475569]">{ex.subtitle}</p>}
        </div>
        <button type="button" onClick={reset} className="rounded-lg border border-[#cbd5e1] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#334155] hover:bg-[#f1f5f9]">
          ↻ Restart
        </button>
      </div>
      <div className="mb-2 grid grid-cols-4 gap-2.5">
        {[
          ["WPM", String(wpm), goalWpm ? `Goal ${goalWpm}` : "words per minute"],
          ["Accuracy", `${accuracy}%`, goalAcc ? `Goal ${goalAcc}%` : "correct keystrokes"],
          ["Time", fmtSecs(elapsed), start === null ? "starts on first key" : "elapsed"],
          ["Progress", `${progress}%`, `${typed.length} of ${text.length} characters`],
        ].map(([k, v, s]) => (
          <div key={k} className="rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-1.5 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-[#64748b]">{k}</div>
            <div className="text-[20px] font-bold leading-tight text-[#0f172a]" aria-live="off">
              {v}
            </div>
            <div className="text-[11px] text-[#94a3b8]">{s}</div>
          </div>
        ))}
      </div>
      <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]">
        <div className="h-full rounded-full bg-[#14b8a6] transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="relative mb-2 mt-2" onClick={() => input.current?.focus()}>
        <input
          ref={input}
          aria-label={`Type the ${isKeys ? "drill" : "passage"} here`}
          className="absolute left-0 top-0 h-px w-px opacity-0"
          onKeyDown={onKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value=""
          onChange={() => undefined}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <div
          ref={textBox}
          className={`max-h-[150px] overflow-auto rounded-xl border-2 bg-white px-5 py-3.5 leading-[1.6] shadow-sm transition-colors ${focused ? "border-[#14b8a6]" : "border-[#e2e8f0]"} ${flash ? "bg-[#fef2f2]" : ""} ${isKeys ? "font-mono text-[26px] tracking-[0.08em]" : "text-[19px]"}`}
          style={{ fontFamily: isKeys ? "Consolas, 'Cascadia Mono', Menlo, monospace" : "'Segoe UI', system-ui, sans-serif" }}
        >
          {text.split("").map((ch, i) => {
            const done = i < typed.length;
            const cur = i === typed.length && !result;
            const wrong = done && typed[i] !== ch;
            return (
              <span
                key={i}
                data-cur={cur ? "1" : undefined}
                className={`${done ? (wrong ? "rounded-sm bg-[#fee2e2] text-[#dc2626]" : "text-[#94a3b8]") : "text-[#0f172a]"} ${cur ? `border-b-[3px] ${flash ? "border-[#dc2626] bg-[#fee2e2]" : "border-[#0f766e] bg-[#ccfbf1]"}` : ""} ${wrongAt.has(i) && !wrong && done ? "underline decoration-[#f59e0b] decoration-2" : ""}`}
              >
                {ch === " " && wrong ? "·" : ch}
              </span>
            );
          })}
        </div>
        {!focused && !result && (
          <button type="button" onClick={() => input.current?.focus()} className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/75 text-[15px] font-semibold text-[#0f766e] backdrop-blur-[2px]">
            {typed.length ? "Click here to keep typing" : "Click here, then start typing"}
          </button>
        )}
      </div>
      {showKeyboard && !result && (
        <>
          <div className="mb-1.5 text-center text-[13px] text-[#475569]" aria-live="polite">
            {hint || " "}
          </div>
          <Keyboard next={next} intro={isKeys ? (ex as TypingKeysExercise).keys : undefined} />
          <div className="mt-2 flex flex-wrap justify-center gap-3 text-[11px] text-[#64748b]">
            {(["lp", "lr", "lm", "li"] as Finger[]).map((f) => (
              <span key={f} className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: FINGER_COLOR[f] }} /> {FINGER_NAME[f].replace("left ", "").replace(" finger", "")}
              </span>
            ))}
            <span>· Bumps on F and J mark the home row.</span>
          </div>
        </>
      )}
      {ex.tip && !result && <p className="mt-2 rounded-lg bg-[#f0fdfa] px-4 py-1.5 text-[12px] text-[#115e59]">Tip: {ex.tip}</p>}
      {result && (
        <div className="mx-auto mt-2 w-full max-w-[560px] rounded-2xl border border-[#e2e8f0] bg-white p-6 text-center shadow-lg" role="status">
          <div className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-[#0f766e]">Exercise complete</div>
          <div className="mb-4 text-[15px] text-[#334155]">
            {result.accuracy >= (goalAcc ?? 95) ? "Clean work. Accuracy first, then speed." : "Good effort. Slow down a little and aim for fewer errors."}
          </div>
          <div className="mb-5 grid grid-cols-4 gap-2">
            {[
              ["WPM", result.wpm],
              ["Accuracy", `${result.accuracy}%`],
              ["Time", fmtSecs(result.seconds)],
              ["Errors", result.errors],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-lg bg-[#f8fafc] py-2">
                <div className="text-[22px] font-bold text-[#0f172a]">{v}</div>
                <div className="text-[11px] uppercase text-[#64748b]">{k}</div>
              </div>
            ))}
          </div>
          {best && <div className="mb-4 text-[12px] text-[#64748b]">Your best on this exercise: {best.wpm} WPM at {best.accuracy}% accuracy</div>}
          <div className="flex justify-center gap-2">
            <button type="button" onClick={reset} className="rounded-lg border border-[#cbd5e1] px-4 py-2 text-[14px] font-semibold text-[#334155] hover:bg-[#f1f5f9]">
              Try again
            </button>
            {onNext && (
              <button type="button" onClick={onNext} className="rounded-lg px-4 py-2 text-[14px] font-semibold text-white" style={{ background: TEAL }}>
                Next exercise →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data entry                                                          */
/* ------------------------------------------------------------------ */

function SourceDoc({ src }: { src: TypingSource }) {
  if (src.kind === "digital") {
    return (
      <div className="mx-auto w-full max-w-[520px] rounded-md border border-[#d1d5db] bg-white text-[13px] text-[#1f2937] shadow-md">
        <div className="border-b border-[#e5e7eb] bg-[#f9fafb] px-5 py-3">
          {src.org && <div className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{src.org}</div>}
          <div className="text-[16px] font-semibold">{src.title}</div>
          {src.header?.map((h) => (
            <div key={h.label} className="mt-0.5 text-[12px]">
              <span className="text-[#6b7280]">{h.label}: </span>
              {h.value}
            </div>
          ))}
        </div>
        <div className="space-y-4 px-5 py-4">
          {src.sections.map((s, i) => (
            <div key={i}>
              {s.heading && <div className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[#374151]">{s.heading}</div>}
              <table className="w-full">
                <tbody>
                  {s.rows.map((r) => (
                    <tr key={r.label} className="border-b border-[#f3f4f6] align-top">
                      <td className="w-[42%] py-1 pr-2 text-[#6b7280]">{r.label}</td>
                      <td className="py-1 font-medium">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {src.footer && <p className="whitespace-pre-line text-[12px] text-[#4b5563]">{src.footer}</p>}
        </div>
      </div>
    );
  }
  return (
    <div className="relative mx-auto w-full max-w-[540px] select-none" style={{ transform: "rotate(-0.6deg)" }}>
      <div className="rounded-sm border border-[#d6d3c4] bg-[#fdfcf6] px-6 pb-6 pt-5 text-[#2b2b2b] shadow-[0_6px_18px_rgba(0,0,0,0.18)]" style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)", backgroundSize: "3px 3px" }}>
        <div className="mb-3 border-b-2 border-[#2b2b2b] pb-2 text-center" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          {src.org && <div className="text-[11px] uppercase tracking-[0.2em]">{src.org}</div>}
          <div className="text-[17px] font-bold uppercase tracking-wide">{src.title}</div>
        </div>
        {src.sections.map((s, i) => (
          <div key={i} className="mb-3">
            {s.heading && <div className="mb-1.5 bg-[#2b2b2b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#fdfcf6]">{s.heading}</div>}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {s.rows.map((r) => (
                <div key={r.label} className={r.wide ? "col-span-2" : ""}>
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-[#555]" style={{ fontFamily: "Arial, sans-serif" }}>
                    {r.label}
                  </div>
                  <div className="min-h-[24px] border-b border-[#8a8778] px-1 text-[17px] leading-[24px] text-[#1b3a8c]" style={{ fontFamily: "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', 'Ink Free', cursive" }}>
                    {r.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {src.footer && (
          <div className="mt-2 text-[11px] text-[#444]" style={{ fontFamily: "Arial, sans-serif" }}>
            {src.footer}
          </div>
        )}
      </div>
      {src.stamp && (
        <div className="absolute right-5 top-14 rotate-[8deg] rounded border-[3px] border-[#c0392b]/70 px-2 py-0.5 text-center text-[11px] font-bold uppercase leading-tight tracking-wider text-[#c0392b]/75" style={{ fontFamily: "Arial, sans-serif" }}>
          {src.stamp}
        </div>
      )}
    </div>
  );
}

function FormInput({ f, value, onChange, onCommit }: { f: TypingField; value: string; onChange: (v: string) => void; onCommit: (v: string) => void }) {
  const base = "w-full rounded border border-[#9ca3af] bg-white px-2 py-1.5 text-[13px] text-[#111827] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe]";
  const id = `tf-${f.name}`;
  if (f.type === "select")
    return (
      <select id={id} aria-label={f.label} value={value} onChange={(e) => { onChange(e.target.value); onCommit(e.target.value); }} className={base}>
        <option value="">Select…</option>
        {(f.options ?? []).map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    );
  if (f.type === "radio")
    return (
      <div role="radiogroup" aria-label={f.label} className="flex flex-wrap gap-3 py-1 text-[13px]">
        {(f.options ?? []).map((o) => (
          <label key={o} className="flex items-center gap-1.5">
            <input type="radio" name={id} checked={value === o} onChange={() => { onChange(o); onCommit(o); }} aria-label={o} />
            {o}
          </label>
        ))}
      </div>
    );
  if (f.type === "textarea")
    return <textarea id={id} aria-label={f.label} value={value} placeholder={f.placeholder} rows={3} onChange={(e) => onChange(e.target.value)} onBlur={(e) => onCommit(e.target.value)} className={`${base} resize-none`} />;
  return (
    <input
      id={id}
      aria-label={f.label}
      type="text"
      inputMode={f.type === "tel" ? "tel" : undefined}
      value={value}
      placeholder={f.placeholder ?? (f.type === "date" ? "MM/DD/YYYY" : f.type === "tel" ? "(555) 555-5555" : "")}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onCommit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onCommit((e.target as HTMLInputElement).value);
          const scope = (e.target as HTMLElement).closest("[data-tform]");
          const all = Array.from(scope?.querySelectorAll<HTMLElement>("input, select, textarea") ?? []);
          const i = all.indexOf(e.target as HTMLElement);
          all[i + 1]?.focus();
        }
      }}
      autoComplete="off"
      spellCheck={false}
      className={base}
    />
  );
}

function FormEntry({ ex, doc, commitField, cmd }: { ex: TypingFormExercise; doc: TypingDoc; commitField: (name: string, v: string) => void; cmd: (id: string, value?: string) => void }) {
  const fromDoc = useMemo(() => Object.fromEntries(formFields(ex).map((f) => [f.name, doc.values?.[f.name] ?? ""])), [ex, doc.values]);
  const [local, setLocal] = useState<Record<string, string>>(fromDoc);
  const prev = useRef(fromDoc);
  useEffect(() => {
    setLocal((l) => {
      const n = { ...l };
      for (const [k, v] of Object.entries(fromDoc)) if (prev.current[k] !== v) n[k] = v;
      return n;
    });
    prev.current = fromDoc;
  }, [fromDoc]);
  useEffect(() => setLocal(fromDoc), [ex.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const verified = Boolean(doc.verified?.[ex.id]);
  const saved = Boolean(doc.submitted?.[ex.id]);
  const spanCls: Record<number, string> = { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4", 5: "col-span-5", 6: "col-span-6" };
  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex w-1/2 min-w-0 flex-col border-r border-[#cbd5e1] bg-[#e2e8f0]">
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-[#cbd5e1] bg-[#f1f5f9] px-4 text-[12px] text-[#475569]">
          <span className="font-semibold text-[#0f172a]">Source document</span>
          <span>·</span>
          <span className="truncate">{ex.source.kind === "scan" ? `${ex.source.title} (scanned)` : ex.source.title}</span>
          <span className="ml-auto">100%</span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-6">
          <SourceDoc src={ex.source} />
        </div>
      </div>
      <div className="flex w-1/2 min-w-0 flex-col bg-[#f8fafc]" data-tform="1">
        <div className="flex h-9 shrink-0 items-center gap-2 bg-[#1e3a5f] px-4 text-[12px] text-white">
          <span className="font-semibold">{ex.system ?? "Records System"}</span>
          <span className="opacity-60">›</span>
          <span className="truncate opacity-90">{ex.record ?? ex.title}</span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 py-4">
          <h2 className="mb-3 text-[17px] font-bold text-[#0f172a]">{ex.title}</h2>
          {ex.sections.map((s) => (
            <fieldset key={s.id} className="mb-4 rounded-lg border border-[#cbd5e1] bg-white px-4 pb-4 pt-2 shadow-sm">
              <legend className="px-1 text-[12px] font-bold uppercase tracking-wide text-[#1e3a5f]">{s.heading}</legend>
              <div className="grid grid-cols-6 gap-x-3 gap-y-2.5">
                {s.fields.map((f) => (
                  <label key={f.name} htmlFor={f.type === "radio" ? undefined : `tf-${f.name}`} className={spanCls[f.span ?? 3]}>
                    <span className="mb-0.5 block text-[11px] font-semibold text-[#374151]">
                      {f.label}
                      {f.required && <span className="text-[#dc2626]"> *</span>}
                    </span>
                    <FormInput
                      f={f}
                      value={local[f.name] ?? ""}
                      onChange={(v) => setLocal((l) => ({ ...l, [f.name]: v }))}
                      onCommit={(v) => {
                        if (v !== (doc.values?.[f.name] ?? "")) commitField(f.name, v);
                      }}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-3 border-t border-[#cbd5e1] bg-white px-5 py-3">
          {ex.verifyLabel && (
            <label className="flex flex-1 items-center gap-2 text-[12px] text-[#334155]">
              <input type="checkbox" checked={verified} onChange={(e) => cmd("form.verify", e.target.checked ? "on" : "off")} aria-label={ex.verifyLabel} />
              {ex.verifyLabel}
            </label>
          )}
          {!ex.verifyLabel && <span className="flex-1" />}
          {saved && <span className="rounded bg-[#dcfce7] px-2 py-1 text-[12px] font-semibold text-[#166534]">✓ Record saved</span>}
          <button type="button" onClick={() => cmd("form.submit")} className="rounded bg-[#2563eb] px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-[#1d4ed8]">
            {ex.submitLabel ?? "Save record"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

const KIND_ICON: Record<TypingExercise["kind"], string> = { keys: "⌨", passage: "¶", form: "▤" };

export function TypingCanvas({ doc, ui, onSelect, onCommit }: CanvasProps<TypingDoc>) {
  const activeId = ui.selection?.startsWith("ex:") ? ui.selection.slice(3) : doc.active ?? doc.exercises[0]?.id;
  const ex = doc.exercises.find((e) => e.id === activeId) ?? doc.exercises[0];
  const [best, setBest] = useState<Record<string, { wpm: number; accuracy: number; seconds: number; errors: number }>>({});
  const open = (id: string) => onSelect({ selection: `ex:${id}` } as Partial<SimUi>);
  const sel = `ex:${ex?.id ?? ""}`;
  const idx = doc.exercises.findIndex((e) => e.id === ex?.id);
  const nextEx = idx >= 0 ? doc.exercises[idx + 1] : undefined;
  return (
    <div className="flex h-full flex-col bg-[#f8fafc] text-[#0f172a]" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-[#e2e8f0] bg-white px-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg text-[16px] text-white" style={{ background: TEAL }} aria-hidden="true">
          ⌨
        </span>
        <span className="text-[15px] font-bold">{doc.product ?? "KeyPath Typing Trainer"}</span>
        <span className="text-[13px] text-[#94a3b8]">/</span>
        <span className="truncate text-[13px] text-[#475569]">{ex?.title}</span>
        <div className="flex-1" />
        <span className="text-[12px] text-[#64748b]">
          {Object.values(doc.done ?? {}).filter(Boolean).length} of {doc.exercises.length} complete
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ccfbf1] text-[12px] font-bold text-[#115e59]" title={doc.learner ?? "Student"}>
          {(doc.learner ?? "Student")
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        {doc.exercises.length > 1 && (
        <nav className="w-[230px] shrink-0 overflow-auto border-r border-[#e2e8f0] bg-white py-3" aria-label="Exercises">
          <div className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">Exercises</div>
          {doc.exercises.map((e, i) => {
            const on = e.id === ex?.id;
            const done = doc.done?.[e.id];
            return (
              <button key={e.id} type="button" aria-current={on ? "page" : undefined} onClick={() => open(e.id)} className={`flex w-full items-start gap-2.5 border-l-[3px] px-4 py-2 text-left ${on ? "border-[#0f766e] bg-[#f0fdfa]" : "border-transparent hover:bg-[#f8fafc]"}`}>
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[12px] ${done ? "bg-[#0f766e] text-white" : "bg-[#e2e8f0] text-[#475569]"}`} aria-hidden="true">
                  {done ? "✓" : KIND_ICON[e.kind]}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[13px] leading-tight ${on ? "font-semibold text-[#0f172a]" : "text-[#334155]"}`}>
                    {i + 1}. {e.title}
                  </span>
                  <span className="block truncate text-[11px] text-[#64748b]">{best[e.id] ? `Best ${best[e.id].wpm} WPM · ${best[e.id].accuracy}%` : e.kind === "form" ? "Data entry" : e.kind === "keys" ? "Key drill" : "Passage"}</span>
                </span>
              </button>
            );
          })}
        </nav>
        )}
        <main className="flex min-w-0 flex-1 flex-col">
          {ex && ex.kind !== "form" && (
            <Drill
              key={ex.id}
              ex={ex}
              best={best[ex.id]}
              onNext={nextEx ? () => open(nextEx.id) : undefined}
              onCommit={(value, r) => {
                setBest((b) => (b[ex.id] && b[ex.id].wpm >= r.wpm ? b : { ...b, [ex.id]: r }));
                onSelect({ selection: sel } as Partial<SimUi>);
                onCommit({ kind: "type", target: ex.kind === "keys" ? "keys" : "passage", value });
              }}
            />
          )}
          {ex && ex.kind === "form" && (
            <FormEntry
              key={ex.id}
              ex={ex}
              doc={doc}
              commitField={(name, v) => {
                onSelect({ selection: sel } as Partial<SimUi>);
                onCommit({ kind: "type", target: `field:${name}`, value: v });
              }}
              cmd={(id, value) => {
                onSelect({ selection: sel } as Partial<SimUi>);
                onCommit({ kind: "command", id, ...(value !== undefined ? { value } : {}) });
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export function TypingStatusBar(_props: StatusBarProps<TypingDoc>) {
  return null;
}
