"use client";

import { useMemo, useState } from "react";
import { OrderItem } from "@/types/engl0150";

/**
 * Put scrambled steps into the correct order.
 *
 * Move-up / move-down buttons rather than drag-and-drop, for the same reason
 * the sorter uses tap-to-assign: dragging is not keyboard-operable and is
 * unreliable on a phone.
 */
function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function Sequencer({
  title,
  instructions,
  items,
}: {
  title: string;
  instructions?: string;
  items: OrderItem[];
}) {
  // Shuffled once per mount; a correct-on-load ordering would teach nothing.
  const initial = useMemo(() => {
    const s = shuffle(items);
    const inOrder = s.every((it, i) => it.position === i + 1);
    return inOrder && s.length > 1 ? [s[1], s[0], ...s.slice(2)] : s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [order, setOrder] = useState<OrderItem[]>(initial);
  const [checked, setChecked] = useState(false);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOrder(next);
    setChecked(false);
  };

  const correctCount = order.filter((it, i) => it.position === i + 1).length;
  const allCorrect = correctCount === order.length;

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && <p className="mt-1 text-engl-ink-600">{instructions}</p>}
      <p className="mt-1 text-sm text-engl-ink-500">
        Practice only — nothing here is graded or recorded.
      </p>

      <ol className="mt-4 space-y-2">
        {order.map((item, i) => {
          const right = checked && item.position === i + 1;
          const wrong = checked && item.position !== i + 1;
          return (
            <li
              key={item.id}
              className={`flex items-start gap-3 rounded-2xl border p-4 ${
                right
                  ? "border-engl-care-500 bg-engl-care-50"
                  : wrong
                    ? "border-red-400 bg-red-50"
                    : "border-engl-ink-200 bg-white"
              }`}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-engl-ink-800 text-sm font-bold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-engl-ink-800">{item.text}</p>
                {checked && (
                  <p
                    className={`mt-2 text-sm ${
                      right ? "text-engl-care-800" : "text-red-800"
                    }`}
                  >
                    {right ? "" : `Belongs at step ${item.position}. `}
                    {item.reason}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button
                  type="button"
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0}
                  aria-label={`Move "${item.text.slice(0, 40)}" up`}
                  className="rounded border border-engl-ink-300 px-2 py-0.5 text-sm text-engl-ink-700 hover:bg-engl-ink-100 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(i, i + 1)}
                  disabled={i === order.length - 1}
                  aria-label={`Move "${item.text.slice(0, 40)}" down`}
                  className="rounded border border-engl-ink-300 px-2 py-0.5 text-sm text-engl-ink-700 hover:bg-engl-ink-100 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
                >
                  ↓
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-lg bg-engl-care-700 px-5 py-2.5 font-medium text-white transition-colors hover:bg-engl-care-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600 focus-visible:ring-offset-2"
        >
          Check the order
        </button>
        {checked && (
          <span role="status" className="font-medium text-engl-ink-800">
            {allCorrect
              ? "Correct — that is a safe sequence."
              : `${correctCount} of ${order.length} in the right place.`}
          </span>
        )}
      </div>
    </div>
  );
}
