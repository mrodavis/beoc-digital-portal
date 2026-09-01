"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Per-browser lesson progress for the lesson-based courses (MS Office, OAP,
 * EHR, and the career programs).
 *
 * Deliberately mirrors lib/eng0300/useProgress.ts: this is a study
 * convenience, not a record. It lives in the learner's own localStorage, is
 * never transmitted, and is not a grade — official progress lives in
 * Brightspace. The store is empty until the learner marks something
 * themselves, so nothing here invents student data.
 */

const STORAGE_KEY = "beoc:course-progress:v1";
const CHANGE_EVENT = "beoc:course-progress";

/** courseId → set of completed lesson ids. */
type ProgressMap = Record<string, string[]>;

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    // Guard against a malformed or hand-edited store.
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const out: ProgressMap = {};
    for (const [course, lessons] of Object.entries(parsed as ProgressMap)) {
      if (Array.isArray(lessons)) {
        out[course] = lessons.filter((l): l is string => typeof l === "string");
      }
    }
    return out;
  } catch {
    // Private browsing or blocked site data — fall back to no progress.
    return {};
  }
}

function write(map: ProgressMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch {
    // Nothing to do — progress is a convenience, not a requirement.
  }
}

export function useCourseProgress(courseId: string) {
  const [completed, setCompleted] = useState<string[]>([]);
  /** Guards a hydration mismatch: the server has no localStorage. */
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setCompleted(read()[courseId] ?? []);
    sync();
    setReady(true);
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [courseId]);

  const isComplete = useCallback(
    (lessonId: string) => completed.includes(lessonId),
    [completed]
  );

  const setComplete = useCallback(
    (lessonId: string, value: boolean) => {
      const all = read();
      const current = all[courseId] ?? [];
      const next = value
        ? current.includes(lessonId)
          ? current
          : [...current, lessonId]
        : current.filter((id) => id !== lessonId);
      const updated = { ...all, [courseId]: next };
      setCompleted(next);
      write(updated);
    },
    [courseId]
  );

  const toggle = useCallback(
    (lessonId: string) => setComplete(lessonId, !read()[courseId]?.includes(lessonId)),
    [courseId, setComplete]
  );

  /** Clears just this course. Used by the "reset" control on module pages. */
  const reset = useCallback(() => {
    const all = read();
    delete all[courseId];
    setCompleted([]);
    write(all);
  }, [courseId]);

  return { ready, completed, completedCount: completed.length, isComplete, setComplete, toggle, reset };
}
