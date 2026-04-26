"use client";
import { useState } from "react";

const TRACKER = {
  title: '"Office Supply Tracker"',
  details: [
    {
      label: "Status Column",
      value:
        'Status values typed freely: "received", "Recieved", "got it", "Ordered", "pending" — no dropdown applied',
    },
    {
      label: "Header Row",
      value:
        "Row 1 has bold text but no freeze applied — headers scroll off screen when viewing more than 15 rows",
    },
    {
      label: "Cost Column",
      value:
        'Total row shows "Total: 2650" — the number 2650 was typed directly into the cell',
    },
    {
      label: "Conditional Formatting",
      value:
        'No conditional formatting applied — the Status column shows plain text with no color coding',
    },
    {
      label: "Notes Tab",
      value:
        "A second tab named Notes exists with a description of every column and the tracker's creation date",
    },
    {
      label: "Date Column",
      value:
        "All dates entered consistently as YYYY-MM-DD across every row",
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
    id: "dropdown",
    label: "The Status column uses Data Validation with a dropdown list",
    correctPass: false,
    explanation:
      "This fails. Free-text status entries like 'got it' and 'Recieved' make filtering useless and break the tracker for anyone who depends on consistent values. Apply Data Validation and restrict the column to approved options only: Ordered, Received, Out of Stock.",
  },
  {
    id: "freeze",
    label: "The header row is frozen so it stays visible when scrolling",
    correctPass: false,
    explanation:
      "This fails. A header row that is only bolded — but not frozen — disappears as soon as the user scrolls past the first screen. Use View > Freeze > 1 Row (Google Sheets) or View > Freeze Panes > Freeze Top Row (Excel) to lock it in place.",
  },
  {
    id: "sum-formula",
    label: "The total row uses a =SUM formula, not a typed number",
    correctPass: false,
    explanation:
      "This fails. Typing 2650 directly into the total cell creates a static value that will silently be wrong the moment any cost is updated. Replace it with =SUM(C2:C9) so the total recalculates automatically whenever data changes.",
  },
  {
    id: "conditional",
    label:
      "Conditional formatting is applied to color-code the Status column",
    correctPass: false,
    explanation:
      "This fails. Without conditional formatting, anyone reading a 50-row tracker must scan every Status cell individually to find urgent items. Apply Format > Conditional Formatting: red background for 'Out of Stock', green for 'Received'.",
  },
  {
    id: "notes-tab",
    label: "A Notes tab exists with column descriptions (Data Dictionary)",
    correctPass: true,
    explanation:
      "This passes. A Notes tab documenting what each column means and how to use it is standard professional practice. It ensures anyone joining the team can maintain the tracker correctly without breaking the structure.",
  },
  {
    id: "date-format",
    label: "All dates in the Date Ordered column use a consistent format",
    correctPass: true,
    explanation:
      "This passes. Consistent YYYY-MM-DD formatting across every row ensures the date column sorts reliably and looks professional. Inconsistent date formats — the most common spreadsheet mistake — break chronological sorting.",
  },
];

type Answer = "pass" | "fail" | null;

export default function TrackerBuilderExercise() {
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
        <span className="text-2xl">🗂️</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Tracker Review Exercise
          </h2>
          <p className="text-gray-500 text-sm">
            Evaluate a submitted tracker against professional standards
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-xl">
          <p className="font-semibold text-blue-800 mb-1">The Submission</p>
          <p className="text-blue-700 text-sm mb-4">
            A colleague named Riley built an{" "}
            <span className="font-mono font-semibold">{TRACKER.title}</span>{" "}
            for the team to use. Review how it was built and mark each
            criterion below as Pass or Fail.
          </p>
          <ul className="space-y-2">
            {TRACKER.details.map((d) => (
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
                    — Perfect audit. You can spot a fragile tracker from a
                    functional one.
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
