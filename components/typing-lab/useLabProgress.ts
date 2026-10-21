"use client";

import { useEffect, useState } from "react";
import { emptyProgress, loadProgress, PROGRESS_EVENT, type LabProgress } from "@/lib/typing-lab/storage";

/** Typing Lab progress for this browser; empty on the server and until mounted. */
export function useLabProgress(): { progress: LabProgress; ready: boolean } {
  const [progress, setProgress] = useState<LabProgress>(emptyProgress);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setProgress(loadProgress());
    sync();
    setReady(true);
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return { progress, ready };
}
