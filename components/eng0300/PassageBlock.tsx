import { Passage } from "@/types/eng0300";
import DataFigure from "./DataFigure";

/**
 * Renders a reading passage.
 *
 * Typography is tuned for sustained reading on a phone: a comfortable base size,
 * generous line height, and a measure capped near 68 characters so lines do not
 * run edge to edge on a wide screen.
 */
export default function PassageBlock({ passage }: { passage: Passage }) {
  return (
    <article className="rounded-xl border border-eng-navy-200 bg-white shadow-sm">
      <header className="border-b border-eng-navy-100 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h4 className="font-display text-lg font-bold text-eng-navy-900">
            {passage.title}
          </h4>
          <span className="rounded-full bg-eng-teal-50 px-3 py-1 text-xs font-semibold text-eng-teal-800">
            {passage.type}
          </span>
          {passage.wordCount && (
            <span className="text-xs text-eng-navy-400">
              {passage.wordCount} words
            </span>
          )}
        </div>
      </header>

      <div className="px-4 py-5 sm:px-6">
        <div className="max-w-[68ch] space-y-4 text-[1.0625rem] leading-[1.75] text-eng-navy-800">
          {passage.body.map((paragraph, index) => (
            <p key={index} className="flex gap-3">
              {passage.numbered && (
                <span
                  className="w-5 shrink-0 pt-1 text-right text-sm font-semibold tabular-nums text-eng-navy-300"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
              )}
              <span>{paragraph}</span>
            </p>
          ))}
        </div>

        {passage.figure && <DataFigure figure={passage.figure} />}

        <p className="mt-5 border-t border-eng-navy-100 pt-3 text-xs italic text-eng-navy-400">
          {passage.attribution}
        </p>
      </div>
    </article>
  );
}
