"use client";

import Link from "next/link";
import { LESSONS } from "@/lib/typing-lab/lessons";
import { bestNet } from "@/lib/typing-lab/storage";
import { useLabProgress } from "./useLabProgress";

export default function OverviewProgress() {
  const { progress, ready } = useLabProgress();
  const best = bestNet(progress);
  const done = LESSONS.filter((l) => progress.lessons[l.id]?.done).length;
  const next = LESSONS.find((l) => !progress.lessons[l.id]?.done);
  if (!ready) return <div className="h-[92px]" />;
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-700">On this browser</div>
        <div className="mt-1 text-gray-900">
          {done} of {LESSONS.length} key lessons done · {best ? `best ${best.net} net WPM at ${best.accuracy}%` : "no timed tests yet"}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {next && (
          <Link href={`/typing-lab/lessons/${next.id}`} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            {done ? `Continue: ${next.title}` : "Start lesson 1"}
          </Link>
        )}
        <Link href="/typing-lab/progress" className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          My progress
        </Link>
      </div>
    </div>
  );
}
