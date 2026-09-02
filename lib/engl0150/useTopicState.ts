"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Per-browser widget state for ENGL0150.
 *
 * Namespaced `engl0150:t{topic}:{widget}`. Everything is a study convenience —
 * nothing here is graded, nothing leaves the browser, and no network call is
 * ever made. Wrapped in try/catch so a browser with storage blocked still
 * renders the widget correctly, just without persistence.
 */

const EVENT = "engl0150:state";

function keyFor(topic: number, widget: string) {
  return `engl0150:t${topic}:${widget}`;
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    // Storage blocked — the widget still works for this session.
  }
}

/**
 * Reads and writes one widget's state.
 *
 * `ready` guards against a hydration mismatch: the server has no localStorage,
 * so components must render the fallback until the first client effect runs.
 */
export function useTopicState<T>(topic: number, widget: string, fallback: T) {
  const key = keyFor(topic, widget);
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setValue(read<T>(key, fallback));
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
    // fallback is intentionally excluded: callers pass object literals, and
    // including it would re-run this effect on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T) => {
      setValue(next);
      write(key, next);
    },
    [key]
  );

  const clear = useCallback(() => {
    setValue(fallback);
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new CustomEvent(EVENT));
    } catch {
      // Nothing to do.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { value, update, clear, ready };
}
