import type { SimAction, SimCommit, SimValue, SimRequires } from "@/types/sim";
import { normalizeFormula, normalizeRange } from "./excel";

export function normText(s: unknown): string {
  return String(s ?? "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/ /g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function normValue(v: SimValue | undefined): string {
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  return normText(v).replace(/\s*pt$/, "");
}

export function valueMatches(expected: SimValue | SimValue[] | undefined, got: SimValue | undefined): boolean {
  if (expected === undefined) return true;
  const list = Array.isArray(expected) ? expected : [expected];
  const g = normValue(got);
  return list.some((e) => {
    const n = normValue(e);
    if (n === g) return true;
    // Numbers: "14" vs 14, "1.5" vs "1.50"
    const a = Number(n), b = Number(g);
    return n !== "" && g !== "" && !Number.isNaN(a) && !Number.isNaN(b) && a === b;
  });
}

/** Canonical selection key for comparison. */
export function normSelection(sel: string): string {
  const t = sel.trim();
  if (/^[A-Za-z]{1,3}\$?\d+(:\$?[A-Za-z]{1,3}\$?\d+)?$/.test(t.replace(/\$/g, "")) || /^[A-Za-z]+:[A-Za-z]+$/.test(t) || /^\d+:\d+$/.test(t)) {
    return normalizeRange(t);
  }
  // Word multi-paragraph selections: order-insensitive
  if (t.includes(",")) return t.split(",").map((x) => x.trim()).filter(Boolean).sort().join(",");
  return t;
}

export function selectionMatches(req: SimRequires | undefined, ctx: { selection: string; sheet?: string; slide?: string }): boolean {
  if (!req) return true;
  if (req.sheet && normText(req.sheet) !== normText(ctx.sheet)) return false;
  if (req.slide && req.slide !== ctx.slide) return false;
  if (req.selection === undefined) return true;
  const list = Array.isArray(req.selection) ? req.selection : [req.selection];
  const cur = normSelection(ctx.selection);
  return list.some((s) => normSelection(s) === cur);
}

export function commitMatches(action: SimAction, commit: SimCommit): boolean {
  switch (action.kind) {
    case "command":
      return commit.kind === "command" && commit.id === action.id && valueMatches(action.value, commit.value);
    case "dialog": {
      if (commit.kind !== "dialog" || commit.id !== action.id) return false;
      if (!action.values) return true;
      return Object.entries(action.values).every(([k, v]) => valueMatches(v, commit.values[k]));
    }
    case "type": {
      if (commit.kind !== "type") return false;
      if (normSelection(commit.target) !== normSelection(action.target)) return false;
      const list = Array.isArray(action.value) ? action.value : [action.value];
      if (action.match === "formula") {
        const got = normalizeFormula(commit.value, action.strictRefs);
        return list.some((v) => normalizeFormula(v, action.strictRefs) === got);
      }
      const got = normText(commit.value);
      if (action.match === "includes") return list.some((v) => got.includes(normText(v)));
      if (action.match === "all") return list.every((v) => got.includes(normText(v)));
      if (action.match === "similar") return similarity(got, normText(list[0])) >= (action.threshold ?? 0.95);
      return list.some((v) => normText(v) === got);
    }
    case "click":
      return commit.kind === "click" && commit.target === action.target;
    case "select":
      return false;
  }
}

/** True when the commit is the right *kind of thing* (same command), ignoring value/selection. */
export function commitSameCommand(action: SimAction, commit: SimCommit): boolean {
  if (action.kind === "command" && commit.kind === "command") return action.id === commit.id;
  if (action.kind === "dialog" && commit.kind === "dialog") return action.id === commit.id;
  if (action.kind === "type" && commit.kind === "type") return normSelection(action.target) === normSelection(commit.target);
  return false;
}

/** 1 - normalized Levenshtein distance. */
export function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;
  const prev = new Array(b.length + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = tmp;
    }
  }
  return 1 - prev[b.length] / Math.max(a.length, b.length);
}
