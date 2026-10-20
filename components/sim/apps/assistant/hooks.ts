"use client";

import { useEffect, useRef } from "react";
import type { SimCommit } from "@/types/sim";
import type { AssistantDoc, AssistantUiState } from "./types";

export interface ACtx {
  doc: AssistantDoc;
  ui: AssistantUiState;
  go: (p: Partial<AssistantUiState>) => void;
  act: (selection: string, c: SimCommit) => void;
  cmd: (selection: string, id: string, value?: string) => void;
}

/** Runs `after` once the document changes (the commit was accepted). */
export function useAccepted(doc: unknown) {
  const pending = useRef<{ doc: unknown; after: () => void } | null>(null);
  useEffect(() => {
    if (pending.current && pending.current.doc !== doc) {
      const f = pending.current.after;
      pending.current = null;
      f();
    }
  }, [doc]);
  return (commit: () => void, after: () => void) => {
    pending.current = { doc, after };
    commit();
  };
}

export function useOutside(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", down);
    };
  }, [open, close]);
  return ref;
}

