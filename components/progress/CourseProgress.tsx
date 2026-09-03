"use client";

import { useCourseProgress } from "@/lib/progress/useCourseProgress";
import ProgressBar from "./ProgressBar";

/** Course-level progress for a course landing page. */
export default function CourseProgress({
  courseId,
  total,
  label = "Your progress",
}: {
  courseId: string;
  total: number;
  label?: string;
}) {
  const { ready, completedCount, reset } = useCourseProgress(courseId);
  // Renders zero until localStorage has been read, so the server markup and
  // the first client render agree.
  const done = ready ? completedCount : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <ProgressBar done={done} total={total} label={label} />
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-gray-500">
          Saved in this browser only. Not a grade — official progress is in
          Brightspace.
        </p>
        {ready && done > 0 && (
          <button
            type="button"
            onClick={reset}
            className="shrink-0 text-xs font-medium text-gray-500 underline hover:text-gray-800"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
