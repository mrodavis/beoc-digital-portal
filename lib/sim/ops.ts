import type { SimOp } from "@/types/sim";

/**
 * Applies declarative edits to a sim document. Documents are plain JSON and
 * treated as immutable: every op returns a new root.
 */

type Json = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export function clone<T>(v: T): T {
  return typeof structuredClone === "function" ? structuredClone(v) : JSON.parse(JSON.stringify(v));
}

function findIndex(arr: Json[], seg: string): number {
  let i = arr.findIndex((el) => el && typeof el === "object" && (el.id === seg || el.name === seg));
  if (i === -1 && /^\d+$/.test(seg)) i = Number(seg);
  return i;
}

/** Resolve a path to its parent container and final key, creating objects as needed. */
function walk(root: Json, path: string, create: boolean): { parent: Json; key: string | number } | null {
  const segs = path.split(".").filter(Boolean);
  let cur = root;
  for (let i = 0; i < segs.length - 1; i++) {
    const seg = segs[i];
    let next: Json;
    if (Array.isArray(cur)) {
      const idx = findIndex(cur, seg);
      if (idx < 0) return null;
      next = cur[idx];
    } else {
      next = cur[seg];
      if (next === undefined || next === null) {
        if (!create) return null;
        next = {};
        cur[seg] = next;
      }
    }
    cur = next;
  }
  const last = segs[segs.length - 1];
  if (Array.isArray(cur)) {
    const idx = findIndex(cur, last);
    return { parent: cur, key: idx < 0 ? cur.length : idx };
  }
  return { parent: cur, key: last };
}

export function getPath(root: Json, path: string): Json {
  const segs = path.split(".").filter(Boolean);
  let cur = root;
  for (const seg of segs) {
    if (cur == null) return undefined;
    if (Array.isArray(cur)) {
      const idx = findIndex(cur, seg);
      cur = idx < 0 ? undefined : cur[idx];
    } else cur = cur[seg];
  }
  return cur;
}

export function applyOp<T>(doc: T, op: SimOp): T {
  const root = clone(doc) as Json;
  switch (op.op) {
    case "set": {
      const loc = walk(root, op.path, true);
      if (loc) (loc.parent as Json)[loc.key] = clone(op.value);
      return root;
    }
    case "merge": {
      const loc = walk(root, op.path, true);
      if (!loc) return root;
      const prev = (loc.parent as Json)[loc.key];
      (loc.parent as Json)[loc.key] = { ...(prev && typeof prev === "object" ? prev : {}), ...clone(op.value) };
      return root;
    }
    case "insert": {
      let arr = getPath(root, op.path);
      if (!Array.isArray(arr)) {
        const loc = walk(root, op.path, true);
        if (!loc) return root;
        (loc.parent as Json)[loc.key] = [];
        arr = (loc.parent as Json)[loc.key];
      }
      let at = arr.length;
      if (typeof op.index === "number") at = op.index;
      else if (op.after) {
        const i = findIndex(arr, op.after);
        if (i >= 0) at = i + 1;
      } else if (op.before) {
        const i = findIndex(arr, op.before);
        if (i >= 0) at = i;
      }
      arr.splice(at, 0, clone(op.value));
      return root;
    }
    case "remove": {
      const arr = getPath(root, op.path);
      if (Array.isArray(arr)) {
        const i = findIndex(arr, op.id);
        if (i >= 0) arr.splice(i, 1);
      }
      return root;
    }
  }
  return root;
}

export function applyOps<T>(doc: T, ops: SimOp[] | undefined): T {
  if (!ops || ops.length === 0) return doc;
  return ops.reduce((d, op) => applyOp(d, op), doc);
}
