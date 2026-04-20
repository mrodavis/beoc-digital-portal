"use client";
import { useState } from "react";

interface MicroExerciseProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function MicroExercise({
  question,
  options,
  correctIndex,
  explanation,
}: MicroExerciseProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === correctIndex;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">⚡</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quick Check</h2>
          <p className="text-gray-500 text-sm">
            Test your understanding before the main exercise
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <p className="text-lg font-semibold text-gray-800 mb-6">{question}</p>

        <div className="space-y-3">
          {options.map((option, idx) => {
            let cls =
              "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
            if (!answered) {
              cls +=
                "border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 cursor-pointer";
            } else if (idx === correctIndex) {
              cls += "border-green-500 bg-green-50 text-green-800";
            } else if (idx === selected) {
              cls += "border-red-400 bg-red-50 text-red-800";
            } else {
              cls += "border-gray-200 text-gray-400 cursor-default";
            }

            return (
              <button
                key={idx}
                className={cls}
                onClick={() => !answered && setSelected(idx)}
                disabled={answered}
              >
                <span className="mr-3 font-bold text-gray-400">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className={`mt-6 p-4 rounded-xl border-l-4 ${
              isCorrect
                ? "bg-green-50 border-green-500"
                : "bg-amber-50 border-amber-500"
            }`}
          >
            <p className="font-semibold text-gray-800 mb-1">
              {isCorrect ? "✓ Correct!" : "Not quite — here's why:"}
            </p>
            <p className="text-gray-700 text-sm">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
