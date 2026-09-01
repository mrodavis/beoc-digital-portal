"use client";

import { useState } from "react";
import { ContentBlock } from "@/types/lesson";

type KnowledgeCheckBlock = Extract<ContentBlock, { type: "knowledge-check" }>;

interface KnowledgeCheckProps {
  block: KnowledgeCheckBlock;
}

/**
 * A single check-for-understanding item.
 *
 * The learner picks once and then sees why every option is right or wrong —
 * a wrong answer is the moment they are most ready to learn, so it gets the
 * explanation rather than just a red background. `Try again` clears the
 * selection for a second pass.
 */
export default function KnowledgeCheck({ block }: KnowledgeCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const answered = selected !== null;
  const gotItRight = selected === block.correctIndex;

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary-700 bg-primary-100 px-2 py-1 rounded">
          Check your understanding
        </span>
      </div>

      <p className="font-semibold mb-4 text-lg text-gray-900">
        {block.question}
      </p>

      <div role="group" aria-label={block.question}>
        {block.options.map((option, index) => {
          const isCorrect = index === block.correctIndex;
          const isSelected = selected === index;

          // Before answering: neutral. After: the key is always marked, and the
          // learner's own wrong pick is marked separately so they can see both
          // what they chose and what was right.
          const stateClasses = !answered
            ? "bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-300"
            : isCorrect
            ? "bg-green-50 border-green-400"
            : isSelected
            ? "bg-red-50 border-red-400"
            : "bg-white border-gray-200 opacity-70";

          return (
            <button
              key={index}
              type="button"
              onClick={() => !answered && setSelected(index)}
              disabled={answered}
              aria-pressed={isSelected}
              className={`block w-full text-left p-3 mb-2 rounded-lg border transition ${stateClasses} ${
                answered ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-gray-500">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="flex-1 text-gray-800">{option}</span>
                {answered && isCorrect && (
                  <span className="flex-shrink-0 text-green-700 font-bold" aria-label="Correct answer">
                    ✓
                  </span>
                )}
                {answered && isSelected && !isCorrect && (
                  <span className="flex-shrink-0 text-red-700 font-bold" aria-label="Your answer, incorrect">
                    ✕
                  </span>
                )}
              </span>

              {/* Per-option reasoning, revealed once the learner commits. */}
              {answered && block.optionRationales?.[index] && (
                <span
                  className={`block mt-2 pl-7 text-sm ${
                    isCorrect ? "text-green-900" : "text-gray-600"
                  }`}
                >
                  {block.optionRationales[index]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          role="status"
          className={`mt-4 p-4 rounded-lg border-l-4 ${
            gotItRight
              ? "bg-green-50 border-green-500"
              : "bg-amber-50 border-amber-500"
          }`}
        >
          <p className="font-semibold text-gray-900 mb-1">
            {gotItRight ? "Correct." : "Not quite."}
          </p>
          {block.explanation && (
            <p className="text-gray-700 leading-relaxed">{block.explanation}</p>
          )}
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="mt-3 text-sm font-medium text-primary-700 hover:text-primary-900 underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
