"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { ContentBlock } from "@/types/lesson";

type DragDropBlock = Extract<ContentBlock, { type: "drag-drop" }>;

/**
 * Drag-and-drop practice game for lessons: sort items into groups, put steps
 * in order, or match terms to meanings.
 *
 * Works with a mouse, a finger (pointer events, not HTML5 drag, which touch
 * screens ignore) and the keyboard: every chip and drop zone is a button, so
 * "pick up" (click or Enter) then "drop" (click or Enter on a zone) does the
 * same thing as dragging. The first shuffle is seeded from the prompt so the
 * server and browser render the same order.
 */

function seeded(seedText: string) {
  let h = 1779033703 ^ seedText.length;
  for (let i = 0; i < seedText.length; i++) {
    h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(arr: T[], seedText: string): T[] {
  const rnd = seeded(seedText);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // Never start already solved (matters for "order" with few items).
  if (out.length > 1 && out.every((x, i) => x === arr[i])) out.push(out.shift() as T);
  return out;
}

const POOL = "__pool__";

export default function DragDrop({ block }: { block: DragDropBlock }) {
  const { mode, items } = block;
  const seed = block.prompt + "|" + items.map((i) => i.id).join(",");
  const initialOrder = useMemo(() => shuffled(items.map((i) => i.id), seed), [items, seed]);

  // sort + match: where each item sits (POOL or a zone id). order: the sequence.
  const [place, setPlace] = useState<Record<string, string>>(() => Object.fromEntries(items.map((i) => [i.id, POOL])));
  const [sequence, setSequence] = useState<string[]>(initialOrder);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [drag, setDrag] = useState<{ id: string; x: number; y: number; w: number; label: string } | null>(null);
  const justDragged = useRef(false);
  const start = useRef<{ id: string; x: number; y: number; moved: boolean; label: string; w: number } | null>(null);

  const byId = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i])), [items]);
  const label = (id: string) => (mode === "match" ? byId[id]?.match ?? "" : byId[id]?.text ?? "");

  const correctZone = (id: string) => (mode === "match" ? id : byId[id]?.bucket ?? "");
  const isRight = (id: string) =>
    mode === "order" ? sequence.indexOf(id) === items.findIndex((i) => i.id === id) : place[id] === correctZone(id);

  const allPlaced = mode === "order" || items.every((i) => place[i.id] !== POOL);
  const score = items.filter((i) => isRight(i.id)).length;
  const solved = score === items.length;

  const move = useCallback(
    (id: string, zone: string) => {
      setChecked(false);
      if (mode === "order") {
        if (!zone.startsWith("pos-")) return;
        const to = Number(zone.slice(4));
        setSequence((seq) => {
          const next = seq.filter((x) => x !== id);
          next.splice(Math.min(to, next.length), 0, id);
          return next;
        });
        return;
      }
      setPlace((p) => {
        const next = { ...p };
        if (mode === "match" && zone !== POOL) {
          // One answer per term: whatever was there goes back to the pool.
          for (const k of Object.keys(next)) if (next[k] === zone) next[k] = POOL;
        }
        next[id] = zone;
        return next;
      });
    },
    [mode],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLElement>, id: string) => {
    if (e.button !== 0 || revealed) return;
    justDragged.current = false; // a new gesture; a click after a drag only belongs to that drag
    const r = e.currentTarget.getBoundingClientRect();
    start.current = { id, x: e.clientX, y: e.clientY, moved: false, label: label(id), w: Math.min(r.width, 360) };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const s = start.current;
    if (!s) return;
    if (!s.moved && Math.hypot(e.clientX - s.x, e.clientY - s.y) < 6) return;
    s.moved = true;
    setDrag({ id: s.id, x: e.clientX, y: e.clientY, w: s.w, label: s.label });
  };
  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    const s = start.current;
    start.current = null;
    if (!s || !s.moved) return; // a tap: handled by onClick
    justDragged.current = true;
    setDrag(null);
    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
    const zone = el?.closest<HTMLElement>("[data-dd-zone]")?.dataset.ddZone;
    if (zone) move(s.id, zone);
    setSelected(null);
  };

  /** Where a chip currently sits, as a zone id (tapping a placed card with another selected drops there). */
  const zoneOf = (id: string) => (mode === "order" ? `pos-${sequence.indexOf(id)}` : place[id]);
  const onChipClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
    if (selected && selected !== id) {
      move(selected, zoneOf(id));
      setSelected(null);
      return;
    }
    setSelected((cur) => (cur === id ? null : id));
  };

  const dropSelected = (zone: string) => {
    if (!selected) return;
    move(selected, zone);
    setSelected(null);
  };

  const reset = () => {
    setPlace(Object.fromEntries(items.map((i) => [i.id, POOL])));
    setSequence(initialOrder);
    setChecked(false);
    setRevealed(false);
    setSelected(null);
  };
  const retryWrong = () => {
    if (mode !== "order") {
      setPlace((p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, v === correctZone(k) ? v : POOL])));
    }
    setChecked(false);
  };
  const reveal = () => {
    if (mode === "order") setSequence(items.map((i) => i.id));
    else setPlace(Object.fromEntries(items.map((i) => [i.id, correctZone(i.id)])));
    setRevealed(true);
    setChecked(true);
    setSelected(null);
  };

  const chip = (id: string, extra = "") => {
    const state = checked ? (isRight(id) ? "right" : "wrong") : "";
    return (
      <button
        key={id}
        type="button"
        onPointerDown={(e) => onPointerDown(e, id)}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          start.current = null;
          setDrag(null);
        }}
        onClick={(e) => onChipClick(e, id)}
        aria-pressed={selected === id}
        disabled={revealed}
        className={`touch-none select-none rounded-lg border-2 px-3 py-2 text-left text-sm font-medium shadow-sm transition-colors ${extra} ${
          drag?.id === id ? "opacity-40" : ""
        } ${
          selected === id
            ? "border-primary-600 bg-primary-50 ring-2 ring-primary-300"
            : state === "right"
              ? "border-emerald-500 bg-emerald-50 text-emerald-900"
              : state === "wrong"
                ? "border-amber-500 bg-amber-50 text-amber-900"
                : "cursor-grab border-gray-300 bg-white text-gray-800 hover:border-primary-400"
        }`}
      >
        {checked && <span aria-hidden="true" className="mr-1.5">{isRight(id) ? "✓" : "✗"}</span>}
        {label(id)}
      </button>
    );
  };

  const zoneCls = (active: boolean) =>
    `rounded-xl border-2 border-dashed p-3 transition-colors ${active ? "border-primary-500 bg-primary-50/60" : "border-gray-300 bg-gray-50"}`;

  const pool = (mode === "order" ? [] : initialOrder.filter((id) => place[id] === POOL));

  return (
    <div className="not-prose rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
        {mode === "sort" ? "Drag and drop: sort" : mode === "order" ? "Drag and drop: put in order" : "Drag and drop: match"}
      </div>
      {block.title && <h4 className="mb-1 text-lg font-bold text-gray-900">{block.title}</h4>}
      <p className="mb-1 text-gray-700">{block.prompt}</p>
      <p className="mb-4 text-xs text-gray-500">
        Drag each card into place, or tap a card and then tap where it goes.
      </p>

      {mode !== "order" && (
        <div
          data-dd-zone={POOL}
          role="button"
          tabIndex={selected ? 0 : -1}
          onClick={() => dropSelected(POOL)}
          onKeyDown={(e) => e.key === "Enter" && dropSelected(POOL)}
          className={`${zoneCls(!!selected && place[selected] !== POOL)} mb-4 flex min-h-[56px] flex-wrap gap-2`}
          aria-label="Cards not placed yet"
        >
          {pool.length ? pool.map((id) => chip(id)) : <span className="self-center text-sm text-gray-400">All cards placed.</span>}
        </div>
      )}

      {mode === "sort" && (
        <div className={`grid gap-3 ${(block.buckets?.length ?? 0) >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {block.buckets?.map((b) => (
            <div
              key={b.id}
              data-dd-zone={b.id}
              role="button"
              tabIndex={selected ? 0 : -1}
              onClick={() => dropSelected(b.id)}
              onKeyDown={(e) => e.key === "Enter" && dropSelected(b.id)}
              className={`${zoneCls(!!selected)} min-h-[120px]`}
              aria-label={`Group: ${b.label}`}
            >
              <div className="mb-2 text-sm font-bold text-gray-800">{b.label}</div>
              <div className="flex flex-col gap-2">{initialOrder.filter((id) => place[id] === b.id).map((id) => chip(id, "w-full"))}</div>
            </div>
          ))}
        </div>
      )}

      {mode === "match" && (
        <div className="space-y-2">
          {items.map((term) => {
            const here = Object.keys(place).find((k) => place[k] === term.id);
            return (
              <div key={term.id} className="grid items-center gap-2 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <div className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white">{term.text}</div>
                <div
                  data-dd-zone={term.id}
                  role="button"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => dropSelected(term.id)}
                  onKeyDown={(e) => e.key === "Enter" && dropSelected(term.id)}
                  className={`${zoneCls(!!selected)} min-h-[48px] p-1.5`}
                  aria-label={`Answer for ${term.text}`}
                >
                  {here ? chip(here, "w-full") : <span className="block px-2 py-1.5 text-sm text-gray-400">Drop the matching card here</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {mode === "order" && (
        <ol className="space-y-2">
          {sequence.map((id, i) => (
            <li key={id} className="flex items-center gap-2">
              <span className="w-6 text-right text-sm font-bold text-gray-500">{i + 1}.</span>
              <div
                data-dd-zone={`pos-${i}`}
                role="button"
                tabIndex={selected && selected !== id ? 0 : -1}
                onClick={() => dropSelected(`pos-${i}`)}
                onKeyDown={(e) => e.key === "Enter" && dropSelected(`pos-${i}`)}
                className="flex-1"
                aria-label={`Position ${i + 1}`}
              >
                {chip(id, "w-full")}
              </div>
              <div className="flex flex-col">
                <button
                  type="button"
                  aria-label="Move up"
                  disabled={i === 0 || revealed}
                  onClick={() => move(id, `pos-${i - 1}`)}
                  className="px-1 text-xs text-gray-500 hover:text-primary-700 disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  disabled={i === sequence.length - 1 || revealed}
                  onClick={() => move(id, `pos-${i + 1}`)}
                  className="px-1 text-xs text-gray-500 hover:text-primary-700 disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {!revealed && !(checked && solved) && (
          <button
            type="button"
            disabled={!allPlaced}
            onClick={() => setChecked(true)}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check
          </button>
        )}
        {checked && !solved && !revealed && mode !== "order" && (
          <button type="button" onClick={retryWrong} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Try the wrong ones again
          </button>
        )}
        {checked && !solved && !revealed && (
          <button type="button" onClick={reveal} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Show answers
          </button>
        )}
        <button type="button" onClick={reset} className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800">
          Start over
        </button>
        {!allPlaced && <span className="text-xs text-gray-500">Place every card to check.</span>}
      </div>

      {checked && (
        <div
          role="status"
          className={`mt-4 rounded-lg border p-3 text-sm ${solved ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-amber-50 text-amber-900"}`}
        >
          <p className="font-semibold">
            {revealed ? "Here are the answers." : solved ? "All correct." : `${score} of ${items.length} correct.${mode === "order" ? " Move the cards marked ✗ and check again." : ""}`}
          </p>
          {(solved || revealed) && block.explanation && <p className="mt-1">{block.explanation}</p>}
        </div>
      )}

      {drag && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[200] rounded-lg border-2 border-primary-600 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-xl"
          style={{ left: drag.x - 16, top: drag.y - 18, width: drag.w }}
        >
          {drag.label}
        </div>
      )}
    </div>
  );
}
