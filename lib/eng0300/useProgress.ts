"use client";

import { useCallback, useEffect, useState } from "react";
import { SkillId } from "@/types/eng0300";

/**
 * Lightweight, per-browser progress tracking for the Reading Lab.
 *
 * This is a study convenience, not a record. It lives in the learner's own
 * localStorage, is never sent anywhere, and is not a grade. Official progress
 * and grades live in Brightspace. Nothing here is fabricated student data —
 * the store is empty until the learner marks something themselves.
 */
export type SkillStatus = "not-started" | "in-progress" | "complete";

const STORAGE_KEY = "eng0300:progress:v1";

type ProgressMap = Partial<Record<SkillId, SkillStatus>>;

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    // Private browsing or blocked site data — fall back to no progress.
    return {};
  }
}

function write(map: ProgressMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    // Let other mounted components on the page update immediately.
    window.dispatchEvent(new CustomEvent("eng0300:progress"));
  } catch {
    // Nothing to do — progress is a convenience, not a requirement.
  }
}

export function useSkillProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  /** Guards against a hydration mismatch: the server has no localStorage. */
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setProgress(read());
    sync();
    setReady(true);
    window.addEventListener("eng0300:progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("eng0300:progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setStatus = useCallback((skill: SkillId, status: SkillStatus) => {
    const next = { ...read(), [skill]: status };
    setProgress(next);
    write(next);
  }, []);

  const statusOf = useCallback(
    (skill: SkillId): SkillStatus => progress[skill] ?? "not-started",
    [progress]
  );

  const completedCount = Object.values(progress).filter(
    (status) => status === "complete"
  ).length;

  return { ready, progress, statusOf, setStatus, completedCount };
}

export const statusLabels: Record<SkillStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  complete: "Complete",
};
