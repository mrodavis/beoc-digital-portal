"use client";
import { useState } from "react";

const DOCUMENT = {
  title: '"Q2 Client Summary"',
  details: [
    { label: "Title", value: "Includes a title at the top: Q2 Client Summary" },
    {
      label: "Section Headers",
      value: "Section headers created by bolding and enlarging the text manually",
    },
    {
      label: "Font Choices",
      value: "Comic Sans used for headings; Times New Roman for body text",
    },
    {
      label: "Margins & Spacing",
      value: "1-inch margins on all sides, 1.5 line spacing throughout",
    },
    {
      label: "File Sent As",
      value: "Q2 Client Summary.docx — emailed directly to the client",
    },
  ],
};

const CRITERIA: {
  id: string;
  label: string;
  correctPass: boolean;
  explanation: string;
}[] = [
  {
    id: "title",
    label: "The document includes a proper title",
    correctPass: true,
    explanation:
      "The document has a title — that part is correct. Every professional document must start with one.",
  },
  {
    id: "headers",
    label: "Section headers use proper Heading styles, not just bold text",
    correctPass: false,
    explanation:
      "This fails. Manually bolding text is not the same as applying a Heading style. Heading styles create navigable document structure that screen readers, table-of-contents generators, and PDF viewers can all detect.",
  },
  {
    id: "fonts",
    label: "Professional fonts are used (Calibri, Arial, or Georgia)",
    correctPass: false,
    explanation:
      "This fails. Comic Sans is not a professional font and should never appear in a workplace document. Stick to Calibri, Arial, or Georgia.",
  },
  {
    id: "margins",
    label: "Standard margins (1 inch) and proper line spacing (1.15–1.5) are applied",
    correctPass: true,
    explanation:
      "This passes. 1-inch margins and 1.5 line spacing are both within the professional standard. Well done catching this one.",
  },
  {
    id: "format",
    label: "The file was exported as a PDF before sharing externally",
    correctPass: false,
    explanation:
      "This fails. Sending a .docx to a client exposes your working file and risks the layout breaking on their machine. Always export to PDF before sharing externally.",
  },
];

type Answer = "pass" | "fail" | null;

export default function DocumentReviewExercise() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = CRITERIA.every((c) => answers[c.id] != null);

  const correctCount = submitted
    ? CRITERIA.filter((c) => {
        const chosen = answers[c.id];
        return (
          (c.correctPass && chosen === "pass") ||
          (!c.correctPass && chosen === "fail")
        );
      }).length
    : 0;

  const handleSelect = (id: string, value: Answer) => {
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
        <span className="text-2xl">📄</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Document Review Exercise
          </h2>
          <p className="text-gray-500 text-sm">
            Evaluate a submitted document against professional formatting standards
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-8">
        {/* Document preview */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-xl">
          <p className="font-semibold text-blue-800 mb-1">The Submission</p>
          <p className="text-blue-700 text-sm mb-4">
            A colleague named Marcus submitted document{" "}
            <span className="font-mono font-semibold">{DOCUMENT.title}</span>{" "}
            to be shared with a client. Review the details below and evaluate
            each criterion.
          </p>
          <ul className="space-y-1">
            {DOCUMENT.details.map((d) => (
              <li key={d.label} className="text-sm text-blue-800">
                <span className="font-semibold">{d.label}:</span> {d.value}
              </li>
            ))}
          </ul>
        </div>

        {/* Criteria evaluation */}
        <div className="space-y-4">
          <p className="font-semibold text-gray-800">
            For each criterion below, select{" "}
            <span className="text-green-700">Pass</span> or{" "}
            <span className="text-red-600">Fail</span>:
          </p>

          {CRITERIA.map((c) => {
            const chosen = answers[c.id];
            const isCorrect =
              submitted &&
              ((c.correctPass && chosen === "pass") ||
                (!c.correctPass && chosen === "fail"));
            const isWrong =
              submitted &&
              ((c.correctPass && chosen === "fail") ||
                (!c.correctPass && chosen === "pass"));

            return (
              <div
                key={c.id}
                className={`rounded-xl border p-4 transition-colors ${
                  submitted && isCorrect
                    ? "border-green-300 bg-green-50"
                    : submitted && isWrong
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p className="text-sm font-medium text-gray-800 mb-3">
                  {c.label}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSelect(c.id, "pass")}
                    disabled={submitted}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all disabled:cursor-not-allowed ${
                      chosen === "pass"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-700"
                    }`}
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => handleSelect(c.id, "fail")}
                    disabled={submitted}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all disabled:cursor-not-allowed ${
                      chosen === "fail"
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-red-400 hover:text-red-600"
                    }`}
                  >
                    Fail
                  </button>
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
                      {isCorrect ? "Correct. " : "Incorrect. "}
                    </span>
                    {c.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit / score */}
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-800">
                Score: {correctCount} / {CRITERIA.length}
                {correctCount === CRITERIA.length && (
                  <span className="text-green-600 ml-2">
                    — Perfect review! You know the standards.
                  </span>
                )}
                {correctCount >= 3 && correctCount < CRITERIA.length && (
                  <span className="text-amber-600 ml-2">
                    — Good eye. Review the explanations above.
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
