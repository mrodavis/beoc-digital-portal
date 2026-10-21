"use client";

import Link from "next/link";
import { useState } from "react";
import { LESSONS, UNITS } from "@/lib/typing-lab/lessons";
import { bestNet, clearProgress } from "@/lib/typing-lab/storage";
import { useLabProgress } from "./useLabProgress";
import LineChart from "./LineChart";
import PrintPanel from "./PrintPanel";

const DRILL_NAMES: Record<string, string> = {
  "data-entry": "Data entry",
  "ten-key": "10-key",
  "medical-terms": "Medical terms",
  email: "Email punctuation",
  race: "Pace car race",
  "finger-zones": "Finger zones",
};

function shortDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ProgressView() {
  const { progress, ready } = useLabProgress();
  const [confirming, setConfirming] = useState(false);
  const best = bestNet(progress);
  const lessonsDone = LESSONS.filter((l) => progress.lessons[l.id]?.done);
  const recentTests = progress.tests.slice(-20);
  const startIndex = progress.tests.length - recentTests.length;
  const labels = recentTests.map((t, i) => `Test ${startIndex + i + 1}, ${shortDate(t.at)}`);
  const last5 = progress.tests.slice(-5);
  const avgAcc = last5.length ? Math.round((last5.reduce((n, t) => n + t.accuracy, 0) / last5.length) * 10) / 10 : null;
  const minAcc = recentTests.length ? Math.min(...recentTests.map((t) => t.accuracy)) : 90;
  const maxNet = recentTests.length ? Math.max(...recentTests.map((t) => t.net)) : 40;

  if (!ready) return <p className="text-gray-700">Loading your progress…</p>;

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Best net WPM" value={best ? String(best.net) : "–"} note={best ? `${best.minutes}-minute test, ${best.accuracy}% accuracy, ${shortDate(best.at)}` : "Take a timed test"} strong />
        <Tile label="Average accuracy" value={avgAcc !== null ? `${avgAcc}%` : "–"} note="Your last 5 tests" />
        <Tile label="Lessons completed" value={`${lessonsDone.length} of ${LESSONS.length}`} note={lessonsDone.length < LESSONS.length ? `Next: ${LESSONS.find((l) => !progress.lessons[l.id]?.done)?.title}` : "Every key lesson done"} />
        <Tile label="Timed tests taken" value={String(progress.tests.length)} note="Saved on this browser" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <LineChart title="Net WPM, test by test" values={recentTests.map((t) => t.net)} labels={labels} yMin={0} yMax={Math.max(40, Math.ceil((maxNet + 5) / 10) * 10)} unit=" net WPM" />
        <LineChart title="Accuracy, test by test" values={recentTests.map((t) => t.accuracy)} labels={labels} yMin={Math.min(80, Math.floor(minAcc / 10) * 10)} yMax={100} unit="%" color="#047857" />
      </div>

      {progress.tests.length > 0 && (
        <details className="rounded-xl border border-gray-200 bg-white p-4">
          <summary className="cursor-pointer font-semibold text-gray-900">Show my tests as a table</summary>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 text-gray-900">
                  <th className="py-2 pr-3">Test</th>
                  <th className="py-2 pr-3">Date</th>
                  <th className="py-2 pr-3">Length</th>
                  <th className="py-2 pr-3">Net WPM</th>
                  <th className="py-2 pr-3">Gross WPM</th>
                  <th className="py-2 pr-3">Accuracy</th>
                  <th className="py-2 pr-3">Errors</th>
                </tr>
              </thead>
              <tbody>
                {progress.tests
                  .map((t, i) => ({ t, i }))
                  .reverse()
                  .map(({ t, i }) => (
                    <tr key={i} className="border-b border-gray-100 text-gray-800">
                      <td className="py-1.5 pr-3">{i + 1}</td>
                      <td className="py-1.5 pr-3">{shortDate(t.at)}</td>
                      <td className="py-1.5 pr-3">{t.minutes} min</td>
                      <td className="py-1.5 pr-3 font-semibold">{t.net}</td>
                      <td className="py-1.5 pr-3">{t.gross}</td>
                      <td className="py-1.5 pr-3">{t.accuracy}%</td>
                      <td className="py-1.5 pr-3">{t.errors}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </details>
      )}

      <section aria-labelledby="lessons-h">
        <h2 id="lessons-h" className="text-2xl font-bold text-gray-900">
          Key lessons
        </h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {UNITS.map((u) => {
            const ls = LESSONS.filter((l) => l.unit === u.id);
            const d = ls.filter((l) => progress.lessons[l.id]?.done).length;
            return (
              <div key={u.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-gray-900">{u.title}</h3>
                  <span className="text-sm text-gray-700">
                    {d} of {ls.length}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 text-sm">
                  {ls.map((l) => (
                    <li key={l.id} className="flex items-center gap-2">
                      <span aria-hidden="true" className={progress.lessons[l.id]?.done ? "text-emerald-700" : "text-gray-400"}>
                        {progress.lessons[l.id]?.done ? "✓" : "○"}
                      </span>
                      <Link href={`/typing-lab/lessons/${l.id}`} className="text-gray-900 hover:text-primary-700 hover:underline">
                        {l.title}
                      </Link>
                      <span className="sr-only">{progress.lessons[l.id]?.done ? "complete" : "not done yet"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {progress.drills.length > 0 && (
        <section aria-labelledby="drills-h">
          <h2 id="drills-h" className="text-2xl font-bold text-gray-900">
            Recent drills and games
          </h2>
          <ul className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
            {progress.drills
              .slice(-10)
              .reverse()
              .map((d, i) => (
                <li key={i} className="flex flex-wrap justify-between gap-2 px-4 py-2 text-sm text-gray-800">
                  <span className="font-semibold text-gray-900">{DRILL_NAMES[d.drill] ?? d.drill}</span>
                  <span>{d.score}</span>
                  <span className="text-gray-600">{shortDate(d.at)}</span>
                </li>
              ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="report-h" className="space-y-3">
        <h2 id="report-h" className="text-2xl font-bold text-gray-900">
          Progress report
        </h2>
        <p className="max-w-3xl text-gray-700">A one-page summary of your best test, your recent tests, and the lessons you have completed, for your instructor or your own records.</p>
        <PrintPanel
          buttonLabel="Print or save progress report"
          build={(studentName) => ({
            kind: "Typing Lab",
            title: "Typing Progress Report",
            studentName,
            summary: best ? `Best: ${best.net} net WPM at ${best.accuracy}% accuracy (${best.minutes}-minute test)` : "No timed tests yet",
            rows: [
              { label: "Key lessons completed", value: `${lessonsDone.length} of ${LESSONS.length}`, ok: lessonsDone.length === LESSONS.length },
              { label: "Timed tests taken", value: String(progress.tests.length) },
              ...progress.tests
                .slice(-8)
                .map((t, i, arr) => ({ label: `Test ${progress.tests.length - arr.length + i + 1} (${shortDate(t.at)}, ${t.minutes} min)`, value: `${t.net} net WPM, ${t.gross} gross, ${t.accuracy}%, ${t.errors} errors` })),
              ...UNITS.map((u) => {
                const ls = LESSONS.filter((l) => l.unit === u.id);
                const d = ls.filter((l) => progress.lessons[l.id]?.done).length;
                return { label: `Lessons: ${u.title}`, value: `${d} of ${ls.length}`, ok: d === ls.length };
              }),
            ],
            note: "Progress is saved in this browser only. Net WPM = gross WPM minus uncorrected errors per minute.",
          })}
        />
      </section>

      <section aria-labelledby="clear-h" className="rounded-xl border border-gray-300 bg-white p-4">
        <h2 id="clear-h" className="text-lg font-bold text-gray-900">
          Clear progress
        </h2>
        <p className="mt-1 text-sm text-gray-700">Progress is stored only in this browser. On a shared or school computer, clear it when you finish. Print your results first if you need them.</p>
        {!confirming ? (
          <button type="button" onClick={() => setConfirming(true)} className="mt-3 rounded-lg border border-red-700 bg-white px-4 py-2 font-semibold text-red-800 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
            Clear my Typing Lab progress
          </button>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Confirm clearing progress">
            <span className="text-sm font-semibold text-gray-900">This deletes your lessons, tests, and drills from this browser.</span>
            <button
              type="button"
              autoFocus
              onClick={() => {
                clearProgress();
                setConfirming(false);
              }}
              className="rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Yes, clear it
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
              Cancel
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function Tile({ label, value, note, strong }: { label: string; value: string; note: string; strong?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${strong ? "border-2 border-primary-700 bg-primary-50" : "border border-gray-200 bg-white"}`}>
      <div className="text-sm font-semibold text-gray-700">{label}</div>
      <div className="text-3xl font-bold tabular-nums text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-700">{note}</div>
    </div>
  );
}
