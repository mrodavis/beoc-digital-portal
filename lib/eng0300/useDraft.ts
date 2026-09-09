"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Local-only draft storage for the writing strand.
 *
 * A student's draft is saved to their OWN browser and nowhere else. It is never
 * sent over the network, never attached to analytics, and never seen by this
 * site's operators. Submission happens when the student copies their paragraph
 * into the Brightspace dropbox — this hook only keeps them from losing work to
 * a closed tab.
 *
 * Every localStorage access is wrapped: private windows, cleared site data, and
 * browsers configured to block storage all throw on access. In those cases the
 * page must keep working with autosave silently unavailable, which is what
 * `storageAvailable` reports so the UI can tell the truth rather than claim a
 * save that did not happen.
 */

export type SaveState = "idle" | "saving" | "saved" | "unavailable";

const DEBOUNCE_MS = 800;

function readKey(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeKey(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeKey(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nothing to do — the draft was never stored in the first place.
  }
}

export function useDraft(key: string) {
  const [text, setText] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  /** A draft found on load, offered for restore rather than forced on. */
  const [recovered, setRecovered] = useState<string | null>(null);
  /** False in a private window or wherever site data is blocked. */
  const [storageAvailable, setStorageAvailable] = useState(true);
  /** Guards the hydration boundary: the server has no localStorage. */
  const [ready, setReady] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Suppresses the autosave effect for the very first render pass. */
  const dirty = useRef(false);

  useEffect(() => {
    // Probe storage rather than assuming it works.
    let available = false;
    try {
      const probe = "eng0300:probe";
      window.localStorage.setItem(probe, "1");
      window.localStorage.removeItem(probe);
      available = true;
    } catch {
      available = false;
    }

    setStorageAvailable(available);
    if (!available) setSaveState("unavailable");

    const saved = available ? readKey(key) : null;
    if (saved && saved.trim().length > 0) setRecovered(saved);

    setReady(true);
  }, [key]);

  // Debounced autosave. Only runs after the student has actually typed.
  useEffect(() => {
    if (!ready || !storageAvailable || !dirty.current) return;

    setSaveState("saving");
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      if (text.trim().length === 0) {
        removeKey(key);
        setSaveState("idle");
        return;
      }
      setSaveState(writeKey(key, text) ? "saved" : "unavailable");
    }, DEBOUNCE_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [text, key, ready, storageAvailable]);

  const update = useCallback((next: string) => {
    dirty.current = true;
    setText(next);
  }, []);

  /** Accept the draft found in storage. */
  const restore = useCallback(() => {
    if (recovered !== null) {
      setText(recovered);
      setRecovered(null);
      setSaveState("saved");
    }
  }, [recovered]);

  /** Decline it and start clean, clearing what was stored. */
  const startFresh = useCallback(() => {
    setRecovered(null);
    removeKey(key);
    setText("");
    dirty.current = false;
    setSaveState("idle");
  }, [key]);

  return {
    text,
    update,
    ready,
    saveState,
    recovered,
    restore,
    startFresh,
    storageAvailable,
  };
}

/**
 * Counts sentences by terminal punctuation.
 *
 * This is a HINT, not a rule. It over-counts abbreviations and under-counts
 * run-ons, which is exactly the point — a student writing run-ons should see a
 * low count and reconsider. It never blocks anything.
 */
export function countSentences(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const matches = trimmed.match(/[^.!?]+[.!?]+(\s|$)/g);
  const closed = matches ? matches.length : 0;
  // Trailing text with no terminal mark is still a sentence in progress.
  const unterminated = /[.!?]\s*$/.test(trimmed) ? 0 : 1;
  return closed + unterminated;
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
