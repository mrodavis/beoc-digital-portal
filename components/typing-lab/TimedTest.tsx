"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { buildTestText, PASSAGES, TOPICS, type TopicId } from "@/lib/typing-lab/passages";
import { explainScore, scoreTest, TEST_LENGTHS, type TestLength, type TestScore } from "@/lib/typing-lab/scoring";
import { freshSeed, rng } from "@/lib/typing-lab/rng";
import { loadProgress, recordTest, rememberPassages } from "@/lib/typing-lab/storage";
import { useTyping } from "./useTyping";
import TypingView from "./TypingView";
import KeyboardView, { FingerLegend } from "./KeyboardView";
import ProblemKeys, { problemKeysText } from "./ProblemKeys";
import PrintPanel from "./PrintPanel";
import EmployerNote from "./EmployerNote";

type Topic = TopicId | "mixed";

const TOPIC_OPTIONS: { id: Topic; label: string }[] = [{ id: "mixed", label: "Mixed" }, ...TOPICS.map((t) => ({ id: t.id as Topic, label: t.label }))];

function clock(sec: number) {
  const s = Math.max(0, Math.ceil(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

interface Finished {
  score: TestScore;
  missByChar: Record<string, number>;
  seconds: number;
  early: boolean;
  minutes: TestLength;
  topic: Topic;
}

export default function TimedTest({ initialMinutes = 1, initialTopic = "mixed" }: { initialMinutes?: TestLength; initialTopic?: Topic }) {
  const [minutes, setMinutes] = useState<TestLength>(initialMinutes);
  const [topic, setTopic] = useState<Topic>(initialTopic);
  const [showKeys, setShowKeys] = useState(false);
  const [seed, setSeed] = useState(0);
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(0);
  const [finished, setFinished] = useState<Finished | null>(null);
  const { state, onKey, onText, reset } = useTyping("", "free");
  const latest = useRef(state);
  latest.current = state;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  /** Guards against scoring the same test twice if the clock ticks again before React re-renders. */
  const scored = useRef(false);

  // New text whenever the settings change or the student restarts.
  useEffect(() => {
    const recent = loadProgress().recent;
    const built = buildTestText(topic, minutes * 700, recent, rng(seed || freshSeed()));
    setIds(built.ids);
    reset(built.text, "free");
    scored.current = false;
    setFinished(null);
    setReady(true);
  }, [minutes, topic, seed, reset]);

  const finish = useCallback(
    (seconds: number, early: boolean) => {
      if (scored.current) return;
      scored.current = true;
      const s = latest.current;
      const score = scoreTest(s.text, s.typed, seconds, s.mistakes);
      // Remember the passages the student reached, so the next test starts somewhere new.
      let at = 0;
      const reached: string[] = [];
      for (const id of ids) {
        if (at > s.typed.length) break;
        reached.push(id);
        at += (PASSAGES.find((p) => p.id === id)?.text.length ?? 0) + 1;
      }
      rememberPassages(reached);
      recordTest({
        at: new Date().toISOString(),
        minutes,
        topic: TOPIC_OPTIONS.find((t) => t.id === topic)?.label ?? topic,
        net: score.net,
        gross: score.gross,
        accuracy: score.accuracy,
        errors: score.uncorrected,
        corrected: score.corrected,
        chars: score.chars,
      });
      setFinished({ score, missByChar: s.missByChar, seconds, early, minutes, topic });
    },
    [ids, minutes, topic],
  );

  // Clock: the test starts on the first key and ends when time is up.
  useEffect(() => {
    if (state.startedAt === null || finished) return;
    const limit = minutes * 60_000;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (latest.current.startedAt !== null && t - latest.current.startedAt >= limit) finish(minutes * 60, false);
    };
    tick();
    const i = setInterval(tick, 200);
    return () => clearInterval(i);
  }, [state.startedAt, finished, minutes, finish]);

  // Finished the whole text before time ran out (only at very high speeds).
  useEffect(() => {
    if (state.finishedAt !== null && state.startedAt !== null && !finished) finish((state.finishedAt - state.startedAt) / 1000, true);
  }, [state.finishedAt, state.startedAt, finished, finish]);

  const running = state.startedAt !== null && !finished;
  const elapsed = state.startedAt === null ? 0 : Math.min(minutes * 60, ((finished ? state.startedAt + (finished.seconds * 1000) : now) - state.startedAt) / 1000);
  const live = elapsed >= 3 ? scoreTest(state.text, state.typed, elapsed, state.mistakes) : null;
  const restart = () => {
    setSeed(freshSeed());
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="space-y-6">
      <fieldset disabled={running} className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:grid-cols-[auto_1fr]">
        <legend className="sr-only">Test settings</legend>
        <div>
          <div className="mb-1.5 text-sm font-semibold text-gray-900" id="len-label">
            Test length
          </div>
          <div role="radiogroup" aria-labelledby="len-label" className="inline-flex overflow-hidden rounded-lg border border-gray-400">
            {TEST_LENGTHS.map((m) => (
              <label key={m} className={`cursor-pointer border-r border-gray-400 px-3.5 py-2 text-sm font-semibold last:border-r-0 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-primary-500 ${minutes === m ? "bg-primary-700 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`}>
                <input type="radio" name="test-length" value={m} checked={minutes === m} onChange={() => setMinutes(m)} className="sr-only" />
                {m} min
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-sm font-semibold text-gray-900" id="topic-label">
            Passage topic
          </div>
          <div role="radiogroup" aria-labelledby="topic-label" className="flex flex-wrap gap-2">
            {TOPIC_OPTIONS.map((t) => (
              <label key={t.id} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 ${topic === t.id ? "border-primary-700 bg-primary-50 text-primary-900" : "border-gray-300 bg-white text-gray-800 hover:border-gray-500"}`}>
                <input type="radio" name="test-topic" value={t.id} checked={topic === t.id} onChange={() => setTopic(t.id)} className="sr-only" />
                {t.label}
              </label>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-800 md:col-span-2">
          <input type="checkbox" checked={showKeys} onChange={(e) => setShowKeys(e.target.checked)} className="h-4 w-4 accent-primary-700" />
          Show the on-screen keyboard (turn it off once you can type without looking)
        </label>
        {running && <p className="text-sm text-gray-600 md:col-span-2">Settings are locked while the test runs. Use Restart to change them.</p>}
      </fieldset>

      {!finished && (
        <section aria-label="Typing test" className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Time left" value={clock(minutes * 60 - elapsed)} note={state.startedAt === null ? "Starts on your first key" : "Keep going"} />
            <Stat label="Net WPM" value={live ? String(live.net) : "–"} note="After errors" strong />
            <Stat label="Gross WPM" value={live ? String(live.gross) : "–"} note="Before errors" />
            <Stat label="Accuracy" value={live ? `${live.accuracy}%` : "–"} note={`${state.typed.length ? `${live?.uncorrected ?? 0} uncorrected` : "Correct characters"}`} />
          </div>
          {ready && (
            <TypingView
              state={state}
              onKey={onKey}
              onText={onText}
              inputRef={inputRef}
              label={`${minutes}-minute typing test. Type the passage shown. Backspace fixes mistakes.`}
              locked={!!finished}
              lines={4}
            />
          )}
          <p id="typing-status" className="sr-only" aria-live="polite">
            {state.capsLock ? "Caps Lock is on." : ""}
          </p>
          {state.capsLock && <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-950">Caps Lock is on. Turn it off to type lowercase letters.</p>}
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={restart} className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
              Restart with new text
            </button>
            <p className="text-sm text-gray-700">Type exactly what you see, including capitals and punctuation. Use Backspace to fix a mistake.</p>
          </div>
          {showKeys && (
            <div>
              <KeyboardView next={state.text[state.typed.length] ?? null} />
              <FingerLegend />
            </div>
          )}
        </section>
      )}

      {finished && (
        <TestResults
          f={finished}
          onAgain={() => {
            setFinished(null);
            restart();
          }}
        />
      )}
    </div>
  );
}

function Stat({ label, value, note, strong }: { label: string; value: string; note: string; strong?: boolean }) {
  return (
    <div className={`rounded-xl border px-3 py-2 ${strong ? "border-primary-300 bg-primary-50" : "border-gray-200 bg-white"}`}>
      <div className="text-xs font-semibold text-gray-700">{label}</div>
      <div className="text-2xl font-bold tabular-nums text-gray-900">{value}</div>
      <div className="text-xs text-gray-600">{note}</div>
    </div>
  );
}

function TestResults({ f, onAgain }: { f: Finished; onAgain: () => void }) {
  const { score } = f;
  const topicLabel = TOPIC_OPTIONS.find((t) => t.id === f.topic)?.label ?? "Mixed";
  const lines = explainScore(score);
  useEffect(() => {
    document.getElementById("results-heading")?.focus();
  }, []);
  return (
    <section aria-labelledby="results-heading" className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
      <div>
        <h2 id="results-heading" tabIndex={-1} className="text-2xl font-bold text-gray-900 focus:outline-none">
          Your {f.minutes}-minute test results
        </h2>
        <p className="mt-1 text-gray-700">
          {topicLabel} passage{f.early ? `. You finished the whole passage in ${Math.round(f.seconds)} seconds, so your speed is figured on that time.` : "."}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1.3fr_1fr_1fr]">
        <div className="rounded-xl border-2 border-primary-700 bg-primary-50 p-4">
          <div className="text-sm font-semibold text-primary-900">Net WPM</div>
          <div className="text-5xl font-bold tabular-nums text-gray-900">{score.net}</div>
          <div className="mt-1 text-sm text-gray-800">The number employers ask for: your speed after uncorrected errors are taken off.</div>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <div className="text-sm font-semibold text-gray-700">Gross WPM</div>
          <div className="text-4xl font-bold tabular-nums text-gray-900">{score.gross}</div>
          <div className="mt-1 text-sm text-gray-700">Raw speed, before errors.</div>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <div className="text-sm font-semibold text-gray-700">Accuracy</div>
          <div className="text-4xl font-bold tabular-nums text-gray-900">{score.accuracy}%</div>
          <div className="mt-1 text-sm text-gray-700">
            {score.uncorrected} uncorrected {score.uncorrected === 1 ? "error" : "errors"}, {score.corrected} fixed along the way.
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold text-gray-900">How this was scored</h3>
        <ul className="space-y-1 text-gray-800">
          {lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-gray-700">
          A word counts as 5 characters, including spaces and punctuation. Fixing a mistake with Backspace costs time but is not counted as an error.
        </p>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold text-gray-900">Problem keys</h3>
        <ProblemKeys missByChar={f.missByChar} />
      </div>
      <EmployerNote />
      <PrintPanel
        build={(studentName) => ({
          kind: "Typing Lab",
          title: `${f.minutes}-Minute Timed Typing Test`,
          studentName,
          summary: `${score.net} net WPM at ${score.accuracy}% accuracy`,
          rows: [
            { label: "Test length", value: `${f.minutes} ${f.minutes === 1 ? "minute" : "minutes"}${f.early ? ` (finished in ${Math.round(f.seconds)} seconds)` : ""}` },
            { label: "Net WPM (speed after errors)", value: String(score.net) },
            { label: "Gross WPM (speed before errors)", value: String(score.gross) },
            { label: "Accuracy", value: `${score.accuracy}%` },
            { label: "Uncorrected errors", value: String(score.uncorrected) },
            { label: "Errors fixed with Backspace", value: String(score.corrected) },
            { label: "Characters typed", value: String(score.chars) },
            { label: "Passage topic", value: topicLabel },
            { label: "Problem keys", value: problemKeysText(f.missByChar) },
          ],
          note: `${lines.join(" ")} A word is 5 characters, including spaces.`,
        })}
      />
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onAgain} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
          Take another test
        </button>
      </div>
    </section>
  );
}
