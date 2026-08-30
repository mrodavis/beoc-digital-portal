"use client";

import { useId, useState } from "react";
import { Question } from "@/types/eng0300";

const typeLabels: Record<Question["type"], string> = {
  "multiple-choice": "Multiple choice",
  "multiple-select": "Select all that apply",
  "short-response": "Short response",
  "evidence-selection": "Evidence selection",
  "vocabulary-in-context": "Vocabulary in context",
  "paired-text": "Paired text",
  "chart-data": "Chart / data",
};

const difficultyStyles: Record<Question["difficulty"], string> = {
  Foundation: "bg-eng-navy-100 text-eng-navy-700",
  Developing: "bg-eng-teal-50 text-eng-teal-800",
  "TABE Ready": "bg-eng-gold-100 text-eng-gold-700",
  Challenge: "bg-eng-navy-800 text-white",
};

function isMultiSelect(question: Question) {
  return question.type === "multiple-select";
}

/**
 * One interactive practice question.
 *
 * Answers are checked in the browser so learners get feedback immediately.
 * This is UNGRADED practice only — see the note in types/eng0300.ts. Official
 * assessment stays in Brightspace and no key for it exists in this codebase.
 */
export default function QuestionCard({
  question,
  number,
}: {
  question: Question;
  number: number;
}) {
  const groupId = useId();
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [response, setResponse] = useState("");
  const [showModel, setShowModel] = useState(false);

  const correct = question.correctAnswer;
  const correctSet = Array.isArray(correct)
    ? correct
    : typeof correct === "number"
      ? [correct]
      : [];

  const isCorrect =
    submitted &&
    correctSet.length === selected.length &&
    correctSet.every((index) => selected.includes(index));

  function toggle(index: number) {
    if (submitted) return;
    setSelected((current) => {
      if (isMultiSelect(question)) {
        return current.includes(index)
          ? current.filter((value) => value !== index)
          : [...current, index];
      }
      return [index];
    });
  }

  function reset() {
    setSelected([]);
    setSubmitted(false);
    setShowHint(false);
  }

  return (
    <div className="rounded-xl border border-eng-navy-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-eng-navy-800 px-3 py-1 text-xs font-bold text-white">
          Question {number}
        </span>
        <span className="rounded-full bg-eng-navy-50 px-3 py-1 text-xs font-medium text-eng-navy-600">
          {typeLabels[question.type]}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyStyles[question.difficulty]}`}
        >
          {question.difficulty}
        </span>
      </div>

      {question.choices ? (
        <fieldset>
          <legend className="mb-4 text-base font-semibold leading-relaxed text-eng-navy-900 sm:text-lg">
            {question.question}
          </legend>

          <div className="space-y-2">
            {question.choices.map((choice, index) => {
              const chosen = selected.includes(index);
              const isKey = correctSet.includes(index);

              let stateClasses =
                "border-eng-navy-200 bg-white hover:border-eng-teal-500 hover:bg-eng-teal-50";
              if (submitted && isKey) {
                stateClasses = "border-eng-green-600 bg-eng-green-50";
              } else if (submitted && chosen && !isKey) {
                stateClasses = "border-red-400 bg-red-50";
              } else if (chosen) {
                stateClasses = "border-eng-teal-600 bg-eng-teal-50";
              }

              return (
                <label
                  key={index}
                  className={`flex min-h-[3rem] cursor-pointer items-start gap-3 rounded-lg border-2 p-3 transition-colors focus-within:ring-2 focus-within:ring-eng-teal-600 focus-within:ring-offset-2 sm:p-4 ${stateClasses} ${
                    submitted ? "cursor-default" : ""
                  }`}
                >
                  <input
                    type={isMultiSelect(question) ? "checkbox" : "radio"}
                    name={groupId}
                    checked={chosen}
                    onChange={() => toggle(index)}
                    disabled={submitted}
                    className="mt-1 h-5 w-5 shrink-0 accent-eng-teal-700"
                  />
                  <span className="flex-1 text-[0.9375rem] leading-relaxed text-eng-navy-800 sm:text-base">
                    <span className="mr-2 font-bold text-eng-navy-500">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {choice}
                  </span>
                  {submitted && isKey && (
                    <span className="shrink-0 text-sm font-bold text-eng-green-700">
                      ✓
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <div>
          <label
            htmlFor={`${groupId}-response`}
            className="mb-4 block text-base font-semibold leading-relaxed text-eng-navy-900 sm:text-lg"
          >
            {question.question}
          </label>
          <textarea
            id={`${groupId}-response`}
            value={response}
            onChange={(event) => setResponse(event.target.value)}
            rows={5}
            placeholder="Write your response here. Nothing you type is saved or submitted."
            className="w-full rounded-lg border-2 border-eng-navy-200 p-3 text-base leading-relaxed text-eng-navy-900 focus:border-eng-teal-600 focus:outline-none focus:ring-2 focus:ring-eng-teal-600 focus:ring-offset-1"
          />
        </div>
      )}

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {question.choices && !submitted && (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={selected.length === 0}
            className="rounded-lg bg-eng-navy-800 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-eng-navy-900 focus:outline-none focus:ring-2 focus:ring-eng-navy-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check answer
          </button>
        )}

        {question.choices && submitted && (
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border-2 border-eng-navy-300 px-5 py-2.5 font-semibold text-eng-navy-700 transition-colors hover:bg-eng-navy-50 focus:outline-none focus:ring-2 focus:ring-eng-navy-800 focus:ring-offset-2"
          >
            Try again
          </button>
        )}

        {!question.choices && (
          <button
            type="button"
            onClick={() => setShowModel((value) => !value)}
            className="rounded-lg bg-eng-navy-800 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-eng-navy-900 focus:outline-none focus:ring-2 focus:ring-eng-navy-800 focus:ring-offset-2"
            aria-expanded={showModel}
          >
            {showModel ? "Hide model response" : "Compare with a model response"}
          </button>
        )}

        {question.hint && !submitted && (
          <button
            type="button"
            onClick={() => setShowHint((value) => !value)}
            className="rounded-lg px-3 py-2.5 font-medium text-eng-teal-800 underline underline-offset-4 transition-colors hover:text-eng-teal-900 focus:outline-none focus:ring-2 focus:ring-eng-teal-600 focus:ring-offset-2"
            aria-expanded={showHint}
          >
            {showHint ? "Hide hint" : "Need a hint?"}
          </button>
        )}
      </div>

      {showHint && question.hint && (
        <p className="mt-4 rounded-lg border-l-4 border-eng-gold-400 bg-eng-gold-50 p-4 text-[0.9375rem] leading-relaxed text-eng-navy-800">
          <span className="font-semibold">Hint: </span>
          {question.hint}
        </p>
      )}

      {/* Feedback */}
      <div aria-live="polite">
        {submitted && (
          <div
            className={`mt-4 rounded-lg border-l-4 p-4 ${
              isCorrect
                ? "border-eng-green-600 bg-eng-green-50"
                : "border-eng-gold-500 bg-eng-gold-50"
            }`}
          >
            <p className="mb-2 font-bold text-eng-navy-900">
              {isCorrect ? "Correct." : "Not quite — here is the reasoning."}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-eng-navy-800">
              {question.explanation}
            </p>

            {question.choiceRationales && question.choices && (
              <ul className="mt-4 space-y-2 border-t border-eng-navy-200 pt-4">
                {question.choices.map((_, index) => (
                  <li
                    key={index}
                    className="text-sm leading-relaxed text-eng-navy-700"
                  >
                    <span
                      className={`mr-2 font-bold ${
                        correctSet.includes(index)
                          ? "text-eng-green-700"
                          : "text-eng-navy-500"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {question.choiceRationales?.[index]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {showModel && question.sampleResponse && (
          <div className="mt-4 rounded-lg border-l-4 border-eng-teal-600 bg-eng-teal-50 p-4">
            <p className="mb-2 font-bold text-eng-navy-900">Model response</p>
            <p className="text-[0.9375rem] leading-relaxed text-eng-navy-800">
              {question.sampleResponse}
            </p>
            <p className="mt-3 border-t border-eng-teal-200 pt-3 text-sm leading-relaxed text-eng-navy-700">
              <span className="font-semibold">What to check for: </span>
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
