"use client";
import { useState } from "react";

const STYLE_OPTIONS = ["Title", "Heading 1", "Heading 2", "Normal / Body Text"];

const ELEMENTS: {
  id: string;
  preview: string;
  previewClass: string;
  badgeLabel: string;
  correctStyle: string;
  explanation: string;
}[] = [
  {
    id: "doc-title",
    preview: "Q3 Project Status Report",
    previewClass: "text-2xl font-bold",
    badgeLabel: "Formatted as: bold + font size 24",
    correctStyle: "Title",
    explanation:
      "The main document title should use the Title style from the Styles panel — not manual bold and font size. The Title style locks it into the template structure and makes it recognizable to table-of-contents generators.",
  },
  {
    id: "section-overview",
    preview: "Project Overview",
    previewClass: "text-lg font-bold",
    badgeLabel: "Formatted as: bold + font size 18",
    correctStyle: "Heading 1",
    explanation:
      "Top-level section headers use Heading 1. Manually bolding and enlarging text looks the same on screen but creates no navigable structure — screen readers and PDF viewers cannot detect it.",
  },
  {
    id: "body-intro",
    preview:
      "This report summarizes the key milestones achieved during Q3 and outlines the action items for Q4.",
    previewClass: "text-base",
    badgeLabel: "Formatted as: default text, no style applied",
    correctStyle: "Normal / Body Text",
    explanation:
      "Paragraph content belongs in Normal or Body Text style. This ensures consistent font, size, and spacing across every paragraph in the document — and makes global updates instant if the template ever changes.",
  },
  {
    id: "sub-section",
    preview: "Key Findings",
    previewClass: "text-base font-bold italic",
    badgeLabel: "Formatted as: bold + italic",
    correctStyle: "Heading 2",
    explanation:
      "Sub-sections within a major section use Heading 2. Bold italic text looks like a sub-header but carries no structural meaning — Heading 2 creates a proper hierarchy that the document outline can navigate.",
  },
  {
    id: "body-findings",
    preview:
      "Three of the five project milestones were completed on schedule. The remaining two have been rescheduled to October with updated resource allocations.",
    previewClass: "text-base",
    badgeLabel: "Formatted as: default text, no style applied",
    correctStyle: "Normal / Body Text",
    explanation:
      "All body paragraphs use Normal or Body Text — not default unstyled text. Applying the style explicitly ensures the paragraph inherits the template's font, line spacing, and paragraph spacing rules.",
  },
];

export default function StyleMatchExercise() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = ELEMENTS.every((el) => answers[el.id]);

  const correctCount = submitted
    ? ELEMENTS.filter((el) => answers[el.id] === el.correctStyle).length
    : 0;

  const handleSelect = (id: string, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🎨</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Style Match Exercise
          </h2>
          <p className="text-gray-500 text-sm">
            Assign the correct built-in style to each document element
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-xl">
          <p className="font-semibold text-blue-800 mb-1">The Scenario</p>
          <p className="text-blue-700 text-sm">
            A colleague named Jordan submitted a draft of the Q3 Project Status
            Report. Every element was formatted manually — no built-in styles
            were applied. For each element below, select the correct style it
            should use from the Styles panel.
          </p>
        </div>

        <div className="space-y-5">
          {ELEMENTS.map((el) => {
            const chosen = answers[el.id];
            const isCorrect = submitted && chosen === el.correctStyle;
            const isWrong = submitted && chosen !== el.correctStyle;

            return (
              <div
                key={el.id}
                className={`rounded-xl border p-5 transition-colors ${
                  isCorrect
                    ? "border-green-300 bg-green-50"
                    : isWrong
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="mb-3">
                  <p className={`${el.previewClass} text-gray-900 mb-1`}>
                    {el.preview}
                  </p>
                  <span className="inline-block text-xs text-amber-700 bg-amber-100 border border-amber-200 rounded px-2 py-0.5 font-mono">
                    {el.badgeLabel}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {STYLE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(el.id, opt)}
                      disabled={submitted}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all disabled:cursor-not-allowed ${
                        chosen === opt
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {submitted && (
                  <div
                    className={`mt-3 text-sm rounded-lg px-3 py-2 ${
                      isCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <span className="font-semibold">
                      {isCorrect
                        ? `Correct — ${el.correctStyle}. `
                        : `Incorrect — this should be ${el.correctStyle}. `}
                    </span>
                    {el.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Answers
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-800">
                Score: {correctCount} / {ELEMENTS.length}
                {correctCount === ELEMENTS.length && (
                  <span className="text-green-600 ml-2">
                    — Perfect. You know your styles.
                  </span>
                )}
                {correctCount >= 3 && correctCount < ELEMENTS.length && (
                  <span className="text-amber-600 ml-2">
                    — Good. Review the explanations above.
                  </span>
                )}
                {correctCount < 3 && (
                  <span className="text-red-600 ml-2">
                    — Revisit the lesson and try again.
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={reset}
              className="text-sm text-blue-600 hover:underline"
            >
              Reset and try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
