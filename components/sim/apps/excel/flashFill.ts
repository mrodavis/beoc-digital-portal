import type { ExcelBook, ExcelSheet } from "@/types/sim";
import { evaluateCell, formatValue, numToCol, refOf, type Rect } from "@/lib/sim/excel";

/**
 * Flash Fill (Ctrl+E, Data › Flash Fill, Home › Fill › Flash Fill).
 *
 * Like Excel, it looks at the column of the active cell inside the data
 * region: filled cells in that column are the examples, empty cells next to
 * data get filled. The pattern is learned from the examples as a small,
 * explainable program, tried in this order:
 *
 *  1. The whole value of another column with a case change
 *     ("keisha morgan" → "Keisha Morgan", UPPER, lower).
 *  2. Only the digits of another column ("MRN-00412" → "00412").
 *  3. The digits of another column in a new layout, for phone numbers and
 *     IDs ("5551234567" → "(555) 123-4567"): every digit in the example is a
 *     slot filled from the source's digits in order.
 *  4. Words from other columns, joined with typed text: each word is "the
 *     Nth word" (or the last word) of a column, possibly as an initial and
 *     with a case change ("Keisha Morgan" → "Keisha", "Morgan, K.",
 *     "kmorgan@lakeside.org").
 *
 * The first program that reproduces every example is used; if none fits all
 * of them, the one that fits the most. Results are entered as text.
 */

type Case = "same" | "upper" | "lower" | "proper";

type Part =
  | { k: "lit"; s: string }
  | { k: "tok"; col: number; idx: number; fromEnd: boolean; initial: boolean; cs: Case }
  | { k: "whole"; col: number; cs: Case }
  | { k: "digits"; col: number }
  | { k: "digitTemplate"; col: number; template: string };

type Program = Part[];

/** A token part with every way it could have been read from the example (Nth word, or Nth from the end). */
type FlexPart = Part | { k: "flex"; alts: Extract<Part, { k: "tok" }>[] };

const applyCase = (s: string, cs: Case) =>
  cs === "upper" ? s.toUpperCase() : cs === "lower" ? s.toLowerCase() : cs === "proper" ? s.toLowerCase().replace(/(^|[\s\-'])\p{L}/gu, (m) => m.toUpperCase()) : s;

const CASES: Case[] = ["same", "proper", "upper", "lower"];

function words(s: string): string[] {
  return s.split(/[\s,]+/).filter(Boolean);
}

function digitsOf(s: string): string {
  return s.replace(/\D/g, "");
}

interface Row {
  r: number;
  /** Source text by column number. */
  src: Map<number, string>;
}

function runPart(p: Part, row: Row): string | null {
  switch (p.k) {
    case "lit":
      return p.s;
    case "whole": {
      const t = row.src.get(p.col);
      return t ? applyCase(t, p.cs) : null;
    }
    case "digits": {
      const d = digitsOf(row.src.get(p.col) ?? "");
      return d || null;
    }
    case "digitTemplate": {
      const d = digitsOf(row.src.get(p.col) ?? "");
      const slots = (p.template.match(/#/g) ?? []).length;
      if (d.length !== slots) return null;
      let i = 0;
      return p.template.replace(/#/g, () => d[i++]);
    }
    case "tok": {
      const ws = words(row.src.get(p.col) ?? "");
      const w = p.fromEnd ? ws[ws.length - 1 - p.idx] : ws[p.idx];
      if (!w) return null;
      return applyCase(p.initial ? w[0] : w, p.cs);
    }
  }
}

function run(prog: Program, row: Row): string | null {
  let out = "";
  for (const p of prog) {
    const s = runPart(p, row);
    if (s === null) return null;
    out += s;
  }
  return out;
}

/** Read an example left to right as words taken from the source columns and typed text. */
function parseTokens(o: string, row: Row, cols: number[]): FlexPart[] {
  const parts: FlexPart[] = [];
  let lit = "";
  let pos = 0;
  const flush = () => {
    if (lit) parts.push({ k: "lit", s: lit });
    lit = "";
  };
  while (pos < o.length) {
    let best: { len: number; alts: Extract<Part, { k: "tok" }>[] } | null = null as { len: number; alts: Extract<Part, { k: "tok" }>[] } | null;
    for (const col of cols) {
      const ws = words(row.src.get(col) ?? "");
      for (let i = 0; i < ws.length; i++) {
        for (const cs of CASES) {
          const t = applyCase(ws[i], cs);
          if (!t || !o.startsWith(t, pos)) continue;
          const alts: Extract<Part, { k: "tok" }>[] = [
            { k: "tok", col, idx: i, fromEnd: false, initial: false, cs },
            { k: "tok", col, idx: ws.length - 1 - i, fromEnd: true, initial: false, cs },
          ];
          // The last word reads best as "the last word" (last names after middle names).
          if (i === ws.length - 1 && i > 0) alts.reverse();
          if (!best || t.length > best.len) best = { len: t.length, alts };
          else if (t.length === best.len && best.alts[0].col === col) best.alts.push(...alts);
          break;
        }
      }
    }
    if (!best && /\p{L}/u.test(o[pos]) && !/\p{L}$/u.test(lit)) {
      // A single letter that starts a source word reads as that word's initial
      // (not a letter in the middle of typed text, like the k in "lakeside").
      for (const col of cols) {
        const ws = words(row.src.get(col) ?? "");
        const i = ws.findIndex((w) => CASES.some((cs) => applyCase(w[0], cs) === o[pos]));
        if (i < 0) continue;
        const cs = CASES.find((x) => applyCase(ws[i][0], x) === o[pos])!;
        best = {
          len: 1,
          alts: [
            { k: "tok", col, idx: i, fromEnd: false, initial: true, cs },
            { k: "tok", col, idx: ws.length - 1 - i, fromEnd: true, initial: true, cs },
          ],
        };
        break;
      }
    }
    if (best) {
      flush();
      parts.push({ k: "flex", alts: best.alts });
      pos += best.len;
    } else {
      lit += o[pos];
      pos++;
    }
  }
  flush();
  return parts;
}

/** Every concrete program a parsed example stands for (capped). */
function expand(parts: FlexPart[], cap = 64): Program[] {
  let out: Program[] = [[]];
  for (const p of parts) {
    const options: Part[] = p.k === "flex" ? p.alts : [p];
    const next: Program[] = [];
    for (const prog of out) for (const o of options) if (next.length < cap) next.push([...prog, o]);
    out = next;
  }
  return out;
}

/** Candidate programs for one example, most specific first. */
function candidates(o: string, row: Row, cols: number[]): Program[] {
  const out: Program[] = [];
  for (const col of cols) {
    const t = row.src.get(col);
    if (!t) continue;
    for (const cs of CASES) if (applyCase(t, cs) === o) out.push([{ k: "whole", col, cs }]);
  }
  if (/^\d+$/.test(o)) for (const col of cols) if (digitsOf(row.src.get(col) ?? "") === o) out.push([{ k: "digits", col }]);
  if (/\d/.test(o) && /\D/.test(o))
    for (const col of cols) if (digitsOf(row.src.get(col) ?? "") === digitsOf(o)) out.push([{ k: "digitTemplate", col, template: o.replace(/\d/g, "#") }]);
  out.push(...expand(parseTokens(o, row, cols)));
  return out;
}

/** A one-line description of what the program does, for the status message. */
export function describeProgram(prog: Program, colName: (c: number) => string): string {
  return prog
    .map((p) => {
      switch (p.k) {
        case "lit": return `"${p.s}"`;
        case "whole": return `${colName(p.col)}${p.cs === "same" ? "" : ` in ${p.cs} case`}`;
        case "digits": return `the digits of ${colName(p.col)}`;
        case "digitTemplate": return `the digits of ${colName(p.col)} as ${p.template}`;
        case "tok": {
          const which = p.fromEnd ? (p.idx === 0 ? "last word" : `word ${p.idx + 1} from the end`) : p.idx === 0 ? "first word" : `word ${p.idx + 1}`;
          return `${p.initial ? "initial of the " : "the "}${which} of ${colName(p.col)}`;
        }
      }
    })
    .join(" + ");
}

export interface FlashFillResult {
  /** Cells to fill, by reference. */
  fill: Record<string, string>;
  /** Shown when nothing could be filled. */
  message?: string;
  explanation?: string;
}

export const FLASH_FILL_NO_PATTERN =
  "We looked at all the data next to the selection and didn't see a pattern for filling in values for you. To use Flash Fill, enter a couple of examples of the output you'd like to see, keep the active cell in the column you want filled in, and click the Flash Fill button again.";

/**
 * Learn the pattern in column `col` of `region` and return what to fill.
 * `headerRow` is the region's first row when it holds column headings.
 */
export function flashFill(book: ExcelBook, sheet: ExcelSheet, region: Rect, col: number, headerRow: boolean): FlashFillResult {
  const first = region.r1 + (headerRow ? 1 : 0);
  const cols: number[] = [];
  for (let d = 1; d <= region.c2 - region.c1 + 1; d++) {
    if (col - d >= region.c1) cols.push(col - d);
    if (col + d <= region.c2) cols.push(col + d);
  }
  const text = (c: number, r: number) => {
    const ref = refOf(c, r);
    const v = evaluateCell(book, sheet, ref);
    return v === null || v === "" ? "" : formatValue(v, sheet.cells[ref]?.fmt);
  };
  const examples: { o: string; row: Row }[] = [];
  const targets: Row[] = [];
  for (let r = first; r <= region.r2; r++) {
    const src = new Map<number, string>();
    for (const c of cols) {
      const t = text(c, r);
      if (t) src.set(c, t);
    }
    const cell = sheet.cells[refOf(col, r)];
    const own = cell?.f ? "" : text(col, r);
    if (own) examples.push({ o: own, row: { r, src } });
    else if (src.size) targets.push({ r, src });
  }
  if (!examples.length || !targets.length) return { fill: {}, message: examples.length ? undefined : FLASH_FILL_NO_PATTERN };
  let best: { prog: Program; score: number } | null = null;
  for (const prog of candidates(examples[0].o, examples[0].row, cols)) {
    const score = examples.filter((e) => run(prog, e.row) === e.o).length;
    if (!best || score > best.score) best = { prog, score };
    if (score === examples.length) break;
  }
  if (!best || best.score === 0) return { fill: {}, message: FLASH_FILL_NO_PATTERN };
  const fill: Record<string, string> = {};
  for (const t of targets) {
    const v = run(best.prog, t);
    if (v !== null && v !== "") fill[refOf(col, t.r)] = v;
  }
  if (!Object.keys(fill).length) return { fill, message: FLASH_FILL_NO_PATTERN };
  const head = (c: number) => (headerRow ? text(c, region.r1) : "") || `column ${numToCol(c)}`;
  return { fill, explanation: describeProgram(best.prog, head) };
}
