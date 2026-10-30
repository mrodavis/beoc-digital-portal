/**
 * Character formatting inside a placeholder or text box (bold words in a bullet, one larger
 * phrase in a title).
 *
 * The plain text stays where it always was (slide.title, slide.body lines, object.text), so every
 * command and grader that reads text keeps working. Formatting that differs from the
 * placeholder's own props is kept as runs beside it (slide.runs[part], object.runs): consecutive
 * pieces of the text, each with the character props it overrides. A body's text is its lines
 * joined with "\n" (leading tabs are indent levels), so a run can cross lines.
 *
 * Runs are reconciled with the text whenever they are read: if the text changed since the runs
 * were saved (typing, Replace, a line moved), the unchanged start and end keep their formatting
 * and new text takes the formatting of the character before it, as typing does in PowerPoint.
 */
import type { TextProps } from "@/types/sim";

export type Run = TextProps & { shadow?: boolean; text: string };
export type CharProps = Omit<Run, "text">;

/** The character props a run can carry (paragraph props such as align and bullets never are). */
export const CHAR_KEYS = ["bold", "italic", "underline", "strike", "shadow", "font", "size", "color", "highlight"] as const;
export type CharKey = (typeof CHAR_KEYS)[number];

function propsOf(r: CharProps): CharProps {
  const out: CharProps = {};
  for (const k of CHAR_KEYS) if (r[k] !== undefined) (out as Record<string, unknown>)[k] = r[k];
  return out;
}
const same = (a: CharProps, b: CharProps) => CHAR_KEYS.every((k) => a[k] === b[k]);

/** One props object per character of `text`. */
export function charProps(runs: Run[] | undefined, text: string): CharProps[] {
  const out: CharProps[] = [];
  if (runs) for (const r of runs) { const p = propsOf(r); for (let i = 0; i < r.text.length; i++) out.push(p); }
  if (!runs || runs.map((r) => r.text).join("") !== text) return syncProps(runs ?? [], out, text);
  return out;
}

function syncProps(runs: Run[], props: CharProps[], text: string): CharProps[] {
  const old = runs.map((r) => r.text).join("");
  let a = 0;
  while (a < old.length && a < text.length && old[a] === text[a]) a++;
  let b = 0;
  while (b < old.length - a && b < text.length - a && old[old.length - 1 - b] === text[text.length - 1 - b]) b++;
  const fill = props[a - 1] ?? props[old.length - b] ?? {};
  return [...props.slice(0, a), ...Array.from({ length: text.length - a - b }, () => fill), ...props.slice(old.length - b)];
}

/** Group per-character props back into runs; undefined when no character carries any. */
export function toRuns(text: string, props: CharProps[]): Run[] | undefined {
  if (!props.some((p) => Object.keys(p).length)) return undefined;
  const out: Run[] = [];
  for (let i = 0; i < text.length; i++) {
    const p = props[i] ?? {};
    const last = out[out.length - 1];
    if (last && same(last, p)) last.text += text[i];
    else out.push({ ...p, text: text[i] });
  }
  return out;
}

/** The runs reconciled with the current text (undefined when the text has no character formatting). */
export function syncRuns(runs: Run[] | undefined, text: string): Run[] | undefined {
  if (!runs?.length) return undefined;
  if (runs.map((r) => r.text).join("") === text) return runs;
  return toRuns(text, charProps(runs, text));
}

/**
 * Set (or, with `undefined`, clear) one character prop on text[a..b). Returns the new runs.
 */
export function formatRange(runs: Run[] | undefined, text: string, a: number, b: number, key: CharKey, value: unknown): Run[] | undefined {
  const props = charProps(runs, text).map((p) => ({ ...p }));
  for (let i = Math.max(0, a); i < Math.min(text.length, b); i++) {
    if (value === undefined) delete (props[i] as Record<string, unknown>)[key];
    else (props[i] as Record<string, unknown>)[key] = value;
  }
  return toRuns(text, props);
}

/** Remove one prop from every run (the whole placeholder was just given that prop). */
export function clearKey(runs: Run[] | undefined, text: string, key: CharKey): Run[] | undefined {
  if (!runs) return undefined;
  return toRuns(text, charProps(runs, text).map((p) => { const q = { ...p }; delete (q as Record<string, unknown>)[key]; return q; }));
}

/**
 * Clear All Formatting on text[a..b). Formatting the whole placeholder carries (`base`) moves onto
 * the characters outside the range, so the caller can drop it from the placeholder.
 */
export function clearRange(runs: Run[] | undefined, text: string, a: number, b: number, base: CharProps = {}): Run[] | undefined {
  const keep = propsOf(base);
  return toRuns(text, charProps(runs, text).map((p, i) => (i >= a && i < b ? {} : { ...keep, ...p })));
}

/** The character props of a props bag (a placeholder's titleProps, a box's props). */
export function charPropsOf(p: CharProps | undefined): CharProps {
  return propsOf(p ?? {});
}

/** The runs of text[a..b) (for the clipboard). */
export function sliceRuns(runs: Run[] | undefined, text: string, a: number, b: number): Run[] | undefined {
  if (!runs) return undefined;
  return toRuns(text.slice(a, b), charProps(runs, text).slice(a, b));
}

/**
 * Replace text[a..b) with `ins`. The inserted text takes `insRuns` when given (a formatted paste),
 * otherwise the formatting of the character before it. Returns the new text and runs.
 */
export function spliceText(runs: Run[] | undefined, text: string, a: number, b: number, ins: string, insRuns?: Run[] | null): { text: string; runs: Run[] | undefined } {
  const props = charProps(runs, text);
  const next = text.slice(0, a) + ins + text.slice(b);
  const fill = props[a - 1] ?? props[b] ?? {};
  const mid = insRuns === null ? Array.from({ length: ins.length }, () => ({})) : insRuns ? charProps(insRuns, ins) : Array.from({ length: ins.length }, () => fill);
  return { text: next, runs: toRuns(next, [...props.slice(0, a), ...mid, ...props.slice(b)]) };
}

/** Give text[at..at+len(insRuns)) the formatting in `insRuns` (a formatted paste); `null` clears it (Keep Text Only). */
export function overlayRuns(runs: Run[] | undefined, text: string, at: number, ins: string, insRuns: Run[] | null | undefined): Run[] | undefined {
  if (insRuns === undefined) return syncRuns(runs, text);
  const props = charProps(runs, text).slice();
  const src = insRuns === null ? [] : charProps(insRuns, ins);
  for (let i = 0; i < ins.length && at + i < text.length; i++) props[at + i] = src[i] ?? {};
  return toRuns(text, props);
}

/**
 * The formatting shared by every character of text[a..b): the placeholder's props with each
 * character's own props on top. `mixed` lists the props that differ inside the range.
 */
export function rangeFormat(base: CharProps, runs: Run[] | undefined, text: string, a: number, b: number): { props: CharProps; mixed: Set<CharKey> } {
  const props = charProps(runs, text);
  const from = Math.max(0, Math.min(a, text.length - 1));
  const to = Math.max(from + 1, Math.min(b, text.length));
  const eff = (i: number) => ({ ...propsOf(base), ...(props[i] ?? {}) });
  const first = eff(from);
  const mixed = new Set<CharKey>();
  for (let i = from + 1; i < to; i++) {
    const e = eff(i);
    for (const k of CHAR_KEYS) {
      if (mixed.has(k)) continue;
      const flag = typeof first[k] === "boolean" || typeof e[k] === "boolean";
      if (flag ? Boolean(e[k]) !== Boolean(first[k]) : e[k] !== first[k]) mixed.add(k);
    }
  }
  const out: CharProps = { ...first };
  for (const k of mixed) delete (out as Record<string, unknown>)[k];
  return { props: out, mixed };
}

/** Start and end offsets of line n (1-based) of a body's text, and where its words start (after the tabs). */
export function lineSpan(text: string, n: number): { start: number; end: number; textStart: number } | undefined {
  const lines = text.split("\n");
  if (n < 1 || n > lines.length) return undefined;
  let start = 0;
  for (let i = 0; i < n - 1; i++) start += lines[i].length + 1;
  const line = lines[n - 1];
  return { start, end: start + line.length, textStart: start + (/^\t*/.exec(line)?.[0].length ?? 0) };
}

/** The 1-based lines that text[a..b) touches. */
export function linesIn(text: string, a: number, b: number): number[] {
  const out: number[] = [];
  const lines = text.split("\n");
  let start = 0;
  lines.forEach((l, i) => {
    const end = start + l.length;
    if ((a <= end && b >= start) || (a === b && a >= start && a <= end)) out.push(i + 1);
    start = end + 1;
  });
  return out;
}

/** Split text[from..to) into pieces with their props, for drawing. `hi` marks a selected range. */
export function pieces(runs: Run[] | undefined, text: string, from: number, to: number, hi?: [number, number]): { text: string; props: CharProps; hi: boolean }[] {
  const props = charProps(runs, text);
  const out: { text: string; props: CharProps; hi: boolean }[] = [];
  for (let i = from; i < to; i++) {
    const p = props[i] ?? {};
    const h = Boolean(hi && i >= hi[0] && i < hi[1]);
    const last = out[out.length - 1];
    if (last && last.hi === h && same(last.props, p)) last.text += text[i];
    else out.push({ text: text[i], props: p, hi: h });
  }
  return out;
}

/** "s2.title.t3-8": the text range 3..8 of a placeholder or text box. */
export function parseRange(seg: string | undefined): [number, number] | undefined {
  const m = /^t(\d+)-(\d+)$/.exec(seg ?? "");
  if (!m) return undefined;
  const a = Number(m[1]), b = Number(m[2]);
  return [Math.min(a, b), Math.max(a, b)];
}
