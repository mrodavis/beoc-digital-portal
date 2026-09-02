"use client";

import { useMemo, useState } from "react";
import { ErrorHuntSpan } from "@/types/engl0150";

/**
 * Click every error in a paragraph.
 *
 * The paragraph is split into clickable word groups. Clicking a span that
 * carries an error scores it; clicking clean text is a false positive and is
 * counted, because a proofreader who flags everything is not proofreading.
 *
 * Untimed by default. A countdown would add pressure without adding learning,
 * and the spiraling error checklist is what this is really practising.
 */
export default function ErrorHunt({
  title,
  instructions,
  paragraph,
  spans,
}: {
  title: string;
  instructions?: string;
  paragraph: string;
  spans: ErrorHuntSpan[];
}) {
  const [found, setFound] = useState<string[]>([]);
  const [falsePositives, setFalsePositives] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Split the paragraph so each error span is its own clickable token.
  const tokens = useMemo(() => {
    let parts: { text: string; error?: ErrorHuntSpan }[] = [
      { text: paragraph },
    ];
    for (const span of spans) {
      const next: typeof parts = [];
      for (const part of parts) {
        if (part.error || !part.text.includes(span.text)) {
          next.push(part);
          continue;
        }
        const [before, ...rest] = part.text.split(span.text);
        const after = rest.join(span.text);
        if (before) next.push({ text: before });
        next.push({ text: span.text, error: span });
        if (after) next.push({ text: after });
      }
      parts = next;
    }
    return parts;
  }, [paragraph, spans]);

  const click = (token: { text: string; error?: ErrorHuntSpan }) => {
    if (revealed) return;
    if (token.error) {
      setFound((f) => (f.includes(token.error!.text) ? f : [...f, token.error!.text]));
    } else {
      setFalsePositives((n) => n + 1);
    }
  };

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && <p className="mt-1 text-engl-ink-600">{instructions}</p>}
      <p className="mt-1 text-sm text-engl-ink-500">
        Click the text carrying each error. Clicking correct text counts against
        you — flagging everything is not proofreading.
      </p>

      <p className="mt-4 rounded-2xl border border-engl-ink-200 bg-white p-5 text-lg leading-loose text-engl-ink-800">
        {tokens.map((token, i) => {
          const isFound = token.error && found.includes(token.error.text);
          const show = revealed && token.error;
          return token.error ? (
            <button
              key={i}
              type="button"
              onClick={() => click(token)}
              className={`rounded px-0.5 transition-colors ${
                isFound || show
                  ? "bg-engl-care-200 underline decoration-engl-care-700 decoration-2"
                  : "hover:bg-amber-100"
              }`}
              aria-label={`Flag "${token.text}" as an error`}
            >
              {token.text}
            </button>
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => click(token)}
              className="cursor-text bg-transparent text-left"
              tabIndex={-1}
            >
              {token.text}
            </button>
          );
        })}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span role="status" className="font-medium text-engl-ink-800">
          {found.length} of {spans.length} found
          {falsePositives > 0 && (
            <span className="text-red-700"> · {falsePositives} false positives</span>
          )}
        </span>
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="rounded-lg bg-engl-care-700 px-4 py-2 text-sm font-medium text-white hover:bg-engl-care-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
        >
          Show all errors
        </button>
        <button
          type="button"
          onClick={() => {
            setFound([]);
            setFalsePositives(0);
            setRevealed(false);
          }}
          className="text-sm font-medium text-engl-ink-600 underline hover:text-engl-ink-900"
        >
          Start over
        </button>
      </div>

      {(revealed || found.length === spans.length) && (
        <ul className="mt-4 space-y-2">
          {spans.map((s) => (
            <li
              key={s.text}
              className="rounded-xl border border-engl-ink-200 bg-white p-3 text-sm"
            >
              <span className="rounded bg-engl-ink-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-engl-ink-700">
                {s.category}
              </span>
              <p className="mt-1 text-engl-ink-800">
                <span className="line-through decoration-red-500">{s.text}</span>{" "}
                → <strong>{s.correction}</strong>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
