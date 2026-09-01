"use client";

import { useCourseProgress } from "@/lib/progress/useCourseProgress";

/**
 * The "mark this lesson complete" control at the foot of every lesson.
 *
 * Renders nothing until localStorage has been read, so the server-rendered
 * markup and the first client render agree.
 */
export default function LessonProgress({
  courseId,
  lessonId,
  title,
}: {
  courseId: string;
  lessonId: string;
  title: string;
}) {
  const { ready, isComplete, setComplete } = useCourseProgress(courseId);
  const done = isComplete(lessonId);

  return (
    <div className="my-12 rounded-2xl border border-gray-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="font-semibold text-gray-900">
          {done ? "Lesson complete" : "Finished this lesson?"}
        </p>
        <p className="text-sm text-gray-600">
          Progress is saved in this browser only. It is not a grade — official
          progress lives in Brightspace.
        </p>
      </div>

      <button
        type="button"
        disabled={!ready}
        onClick={() => setComplete(lessonId, !done)}
        aria-pressed={done}
        aria-label={
          done
            ? `Mark ${title} as not complete`
            : `Mark ${title} as complete`
        }
        className={`flex-shrink-0 px-5 py-3 rounded-lg font-medium transition disabled:opacity-50 ${
          done
            ? "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200"
            : "bg-primary-600 text-white hover:bg-primary-700"
        }`}
      >
        {done ? "✓ Marked complete" : "Mark complete"}
      </button>
    </div>
  );
}
