/**
 * Typing Lab progress, kept per viewer in this browser's localStorage.
 *
 * A study convenience, never a record: nothing is sent anywhere, it can be
 * empty (private window, cleared site data, a shared school computer), and
 * every read and write is wrapped so the lab still works without it. The
 * printable results page is what students submit.
 */

export interface TestRecord {
  at: string;
  minutes: number;
  topic: string;
  net: number;
  gross: number;
  accuracy: number;
  errors: number;
  corrected: number;
  chars: number;
}

export interface LessonRecord {
  done: boolean;
  /** Best accuracy and speed across finished attempts. */
  bestAccuracy: number;
  bestWpm: number;
  at: string;
}

export interface DrillRecord {
  at: string;
  /** e.g. "data-entry", "ten-key", "medical-terms", "email", "race", "finger-zones" */
  drill: string;
  score: string;
  accuracy: number;
}

export interface LabProgress {
  v: 1;
  lessons: Record<string, LessonRecord>;
  tests: TestRecord[];
  drills: DrillRecord[];
  /** Passage ids used recently, so new tests start with fresh text. */
  recent: string[];
}

const KEY = "beoc:typing-lab:v1";
export const PROGRESS_EVENT = "beoc:typing-lab";
const MAX_TESTS = 200;
const MAX_DRILLS = 200;
const MAX_RECENT = 40;

export function emptyProgress(): LabProgress {
  return { v: 1, lessons: {}, tests: [], drills: [], recent: [] };
}

function num(x: unknown, d = 0): number {
  return typeof x === "number" && Number.isFinite(x) ? x : d;
}

export function loadProgress(): LabProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyProgress();
    const p = JSON.parse(raw) as Partial<LabProgress> | null;
    if (!p || typeof p !== "object") return emptyProgress();
    const out = emptyProgress();
    if (p.lessons && typeof p.lessons === "object") {
      for (const [id, l] of Object.entries(p.lessons)) {
        if (l && typeof l === "object") out.lessons[id] = { done: Boolean(l.done), bestAccuracy: num(l.bestAccuracy), bestWpm: num(l.bestWpm), at: String(l.at ?? "") };
      }
    }
    if (Array.isArray(p.tests)) {
      out.tests = p.tests
        .filter((t) => t && typeof t === "object")
        .map((t) => ({ at: String(t.at ?? ""), minutes: num(t.minutes, 1), topic: String(t.topic ?? ""), net: num(t.net), gross: num(t.gross), accuracy: num(t.accuracy), errors: num(t.errors), corrected: num(t.corrected), chars: num(t.chars) }));
    }
    if (Array.isArray(p.drills)) {
      out.drills = p.drills.filter((d) => d && typeof d === "object").map((d) => ({ at: String(d.at ?? ""), drill: String(d.drill ?? ""), score: String(d.score ?? ""), accuracy: num(d.accuracy) }));
    }
    if (Array.isArray(p.recent)) out.recent = p.recent.filter((x): x is string => typeof x === "string");
    return out;
  } catch {
    return emptyProgress();
  }
}

function save(p: LabProgress): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage blocked or full: progress just is not remembered */
  }
  try {
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch {
    /* ignore */
  }
}

function update(fn: (p: LabProgress) => void): void {
  const p = loadProgress();
  fn(p);
  save(p);
}

export function recordTest(t: TestRecord): void {
  update((p) => {
    p.tests = [...p.tests, t].slice(-MAX_TESTS);
  });
}

export function recordLesson(id: string, passed: boolean, accuracy: number, wpm: number): void {
  update((p) => {
    const prev = p.lessons[id];
    p.lessons[id] = {
      done: Boolean(prev?.done) || passed,
      bestAccuracy: Math.max(prev?.bestAccuracy ?? 0, accuracy),
      bestWpm: Math.max(prev?.bestWpm ?? 0, wpm),
      at: new Date().toISOString(),
    };
  });
}

export function recordDrill(d: DrillRecord): void {
  update((p) => {
    p.drills = [...p.drills, d].slice(-MAX_DRILLS);
  });
}

export function rememberPassages(ids: string[]): void {
  update((p) => {
    p.recent = [...p.recent.filter((x) => !ids.includes(x)), ...ids].slice(-MAX_RECENT);
  });
}

export function clearProgress(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  try {
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch {
    /* ignore */
  }
}

/** Best net WPM across saved tests (0 when none). */
export function bestNet(p: LabProgress): TestRecord | undefined {
  return p.tests.reduce<TestRecord | undefined>((b, t) => (!b || t.net > b.net || (t.net === b.net && t.accuracy > b.accuracy) ? t : b), undefined);
}
