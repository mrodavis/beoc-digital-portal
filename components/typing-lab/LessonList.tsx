"use client";

import Link from "next/link";
import { LESSONS, UNITS } from "@/lib/typing-lab/lessons";
import { keyLabel } from "@/lib/typing-lab/keyboard";
import { useLabProgress } from "./useLabProgress";

export default function LessonList() {
  const { progress } = useLabProgress();
  const firstOpen = LESSONS.find((l) => !progress.lessons[l.id]?.done);
  const doneCount = LESSONS.filter((l) => progress.lessons[l.id]?.done).length;
  return (
    <div className="space-y-10">
      <p className="text-gray-800">
        <strong>{doneCount}</strong> of {LESSONS.length} lessons complete on this browser.
        {firstOpen && (
          <>
            {" "}
            Next up:{" "}
            <Link href={`/typing-lab/lessons/${firstOpen.id}`} className="font-semibold text-primary-700 underline-offset-2 hover:underline">
              {firstOpen.title}
            </Link>
            .
          </>
        )}
      </p>
      {UNITS.map((u) => {
        const lessons = LESSONS.filter((l) => l.unit === u.id);
        return (
          <section key={u.id} aria-labelledby={`unit-${u.id}`}>
            <h2 id={`unit-${u.id}`} className="text-2xl font-bold text-gray-900">
              {u.title}
            </h2>
            <p className="mt-1 text-gray-700">{u.blurb}</p>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map((l) => {
                const n = LESSONS.indexOf(l) + 1;
                const rec = progress.lessons[l.id];
                const isNext = firstOpen?.id === l.id;
                return (
                  <li key={l.id}>
                    <Link
                      href={`/typing-lab/lessons/${l.id}`}
                      className={`flex h-full items-start gap-3 rounded-xl border-2 bg-white p-4 transition-colors hover:border-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                        isNext ? "border-primary-600" : rec?.done ? "border-emerald-300" : "border-gray-200"
                      }`}
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${rec?.done ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-800"}`} aria-hidden="true">
                        {rec?.done ? "✓" : n}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-gray-900">{l.title}</span>
                        <span className="mt-1 flex flex-wrap gap-1">
                          {(l.kind === "capitals" ? ["Shift"] : l.newKeys).map((k) => (
                            <kbd key={k} className="rounded border border-gray-300 bg-gray-50 px-1.5 font-mono text-xs font-bold text-gray-800">
                              {k === "Shift" ? k : keyLabel(k)}
                            </kbd>
                          ))}
                          {l.kind === "review" && <span className="text-xs text-gray-600">Review</span>}
                        </span>
                        <span className="mt-1 block text-xs text-gray-700">
                          {rec?.done ? `Done · best ${rec.bestAccuracy}% accuracy, ${rec.bestWpm} WPM` : isNext ? "Next up" : `Lesson ${n}`}
                          <span className="sr-only">{rec?.done ? " (complete)" : ""}</span>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
