"use client";
import { useState } from "react";

const SPREADSHEET = {
  title: '"Client Contract Tracker"',
  details: [
    {
      label: "Header Row",
      value:
        "Row 1 has bold text and a blue background color for each column label",
    },
    {
      label: "Contract Value Column",
      value:
        "Values entered as plain numbers: 1000, 2500, 800, 3200 — no formatting applied",
    },
    {
      label: "Contract Date Column",
      value:
        'Dates entered inconsistently: "01/05/2024", "January 8 2024", "1/12/24", "02-15-2024"',
    },
    {
      label: "Total Row",
      value:
        'Row 12 shows "Total: 7500" — the number 7500 was typed directly into the cell',
    },
    {
      label: "Header Visibility",
      value:
        "No freeze applied — when you scroll past row 10, the column headers disappear",
    },
    {
      label: "Sort Order",
      value: "Data is sorted by Contract Date, earliest to latest",
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
    id: "header-style",
    label: "The header row is visually formatted (bold + background color)",
    correctPass: true,
    explanation:
      "This passes. A styled header row is a professional standard — bold text with a background color makes the column labels immediately distinct from data rows.",
  },
  {
    id: "currency-format",
    label: "The Contract Value column uses currency formatting ($1,000.00)",
    correctPass: false,
    explanation:
      "This fails. Raw numbers like 1000 and 2500 are unprofessional and ambiguous — they could be dollars, units, or codes. Apply Format > Number > Currency to display values as $1,000.00 across every row.",
  },
  {
    id: "date-format",
    label: "All dates in the Contract Date column use a consistent format",
    correctPass: false,
    explanation:
      'This fails. Mixed date formats like "January 8 2024" and "1/12/24" in the same column break sorting and look unpolished. Select the entire date column and apply a single format (MM/DD/YYYY) via Format > Number > Date.',
  },
  {
    id: "sum-formula",
    label: "The total row uses a =SUM formula, not a typed number",
    correctPass: false,
    explanation:
      "This fails. Typing 7500 directly into a cell is a static value — if any contract value changes, the total will silently be wrong. Always use =SUM(B2:B11) so the total recalculates automatically when data changes.",
  },
  {
    id: "freeze",
    label: "The header row is frozen so it stays visible when scrolling",
    correctPass: false,
    explanation:
      "This fails. Without freezing row 1, anyone scrolling through a long list loses track of which column is which. Use View > Freeze > 1 Row (Google Sheets) or View > Freeze Panes > Freeze Top Row (Excel).",
  },
  {
    id: "sort",
    label: "Data is sorted chronologically by Contract Date",
    correctPass: true,
    explanation:
      "This passes. Sorting by date (earliest to latest) makes the tracker scannable and usable — anyone can see which contracts are oldest and which are newest at a glance.",
  },
];

type Answer = "pass" | "fail" | null;

export default function SpreadsheetAuditExercise() {
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
        <span className="text-2xl">📊</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Spreadsheet Audit Exercise
          </h2>
          <p className="text-gray-500 text-sm">
            Evaluate a submitted spreadsheet against professional standards
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-xl">
          <p className="font-semibold text-blue-800 mb-1">The Submission</p>
          <p className="text-blue-700 text-sm mb-4">
            A colleague named Devon built a{" "}
            <span className="font-mono font-semibold">
              {SPREADSHEET.title}
            </span>{" "}
            to track client contracts. Review how it was built and mark each
            criterion below as Pass or Fail.
          </p>
          <ul className="space-y-2">
            {SPREADSHEET.details.map((d) => (
              <li key={d.label} className="text-sm text-blue-800">
                <span className="font-semibold">{d.label}:</span> {d.value}
              </li>
            ))}
          </ul>
        </div>

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
                    — Perfect audit. You know what a professional spreadsheet
                    looks like.
                  </span>
                )}
                {correctCount >= 4 && correctCount < CRITERIA.length && (
                  <span className="text-amber-600 ml-2">
                    — Good eye. Review the explanations above.
                  </span>
                )}
                {correctCount < 4 && (
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
