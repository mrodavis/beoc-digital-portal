"use client";

import { useCourseProgress } from "@/lib/progress/useCourseProgress";
import ProgressBar from "./ProgressBar";

/**
 * Which lessons in this module are done.
 *
 * The lesson list on a module page is server-rendered, so rather than convert
 * it to a client component this renders a compact companion above it. Shows
 * nothing until at least one lesson is complete, so a student who has not
 * started sees no empty scaffolding.
 */
export default function ModuleLessonProgress({
  courseId,
  lessonIds,
  titles,
}: {
  courseId: string;
  lessonIds: string[];
  titles: string[];
}) {
  const { ready, isComplete } = useCourseProgress(courseId);
  if (!ready) return null;

  const doneCount = lessonIds.filter((id) => isComplete(id)).length;
  if (doneCount === 0) return null;

  return (
    <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
      <ProgressBar
        done={doneCount}
        total={lessonIds.length}
        label="This module"
        size="sm"
      />
      <ul className="mt-3 flex flex-wrap gap-2">
        {lessonIds.map((id, i) => (
          <li
            key={id}
            className={`rounded px-2 py-1 text-xs ${
              isComplete(id)
                ? "bg-green-600 text-white"
                : "bg-white text-gray-500 ring-1 ring-gray-200"
            }`}
          >
            {isComplete(id) ? "✓ " : ""}
            {titles[i]}
          </li>
        ))}
      </ul>
    </div>
  );
}
