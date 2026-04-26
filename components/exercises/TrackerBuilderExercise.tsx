"use client";
import { useState } from "react";

const SCENARIOS: {
  id: string;
  icon: string;
  problem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}[] = [
  {
    id: "scroll",
    icon: "📜",
    problem:
      "You scroll past row 20 in your tracker and can't tell which column is which. You're accidentally entering data into the wrong columns.",
    options: [
      "Sort the data A to Z so the header row stays on top",
      "Freeze the header row so it stays visible as you scroll",
      "Bold the text in the header row",
      "Add a Notes tab explaining what each column means",
    ],
    correctIndex: 1,
    explanation:
      "Freezing the header row locks Row 1 permanently in place no matter how far you scroll. Bold text alone doesn't stop it from scrolling away — only View > Freeze > 1 Row (Google Sheets) or View > Freeze Panes > Freeze Top Row (Excel) does.",
  },
  {
    id: "static-total",
    icon: "🔢",
    problem:
      "You updated an item cost from $12.00 to $18.00, but the Total at the bottom of the Cost column still shows the old number.",
    options: [
      "Delete the total and retype the correct number manually",
      "Apply currency formatting to the total cell",
      "Replace the typed number with a =SUM formula",
      "Sort the column from highest to lowest to recalculate",
    ],
    correctIndex: 2,
    explanation:
      "A typed total is a static value — it never updates on its own. Replace it with =SUM(C2:C9) and the total recalculates automatically every time any value in the range changes. No manual update required, ever.",
  },
  {
    id: "typo",
    icon: "🔤",
    problem:
      "Your teammate typed 'recieved' in the Status column. Your filter for 'Received' now misses that row entirely and the totals look wrong.",
    options: [
      "Manually scan and correct every misspelling as they happen",
      "Apply conditional formatting to highlight misspelled entries",
      "Use Data Validation to restrict entries to an approved dropdown list",
      "Lock the Status column so only you can edit it",
    ],
    correctIndex: 2,
    explanation:
      "Data Validation with a dropdown list makes typos impossible — the column only accepts 'Ordered', 'Received', or 'Out of Stock'. If anyone tries to type something else, the spreadsheet rejects it. No more misspellings, no more broken filters.",
  },
  {
    id: "status-scan",
    icon: "👀",
    problem:
      "Your tracker has 60 rows of supply orders. Finding which items are Out of Stock requires reading every single Status cell one by one.",
    options: [
      "Delete all rows that have been Received to shorten the list",
      "Apply conditional formatting to highlight Out of Stock rows in red",
      "Move Out of Stock items to a separate tab manually",
      "Add a column that counts how many items are Out of Stock",
    ],
    correctIndex: 1,
    explanation:
      "Conditional formatting automatically colors cells based on their value. Set 'Out of Stock' to a red background and you can spot every urgent item in a 60-row tracker at a single glance — no reading required, no items missed.",
  },
];

type Answers = Record<string, number | null>;

export default function TrackerBuilderExercise() {
  const [answers, setAnswers] = useState<Answers>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleSelect = (id: string, index: number) => {
    if (revealed[id]) return;
    setAnswers((prev) => ({ ...prev, [id]: index }));
  };

  const handleCheck = (id: string) => {
    if (answers[id] == null) return;
    setRevealed((prev) => ({ ...prev, [id]: true }));
  };

  const completedCount = Object.keys(revealed).length;
  const allDone = completedCount === SCENARIOS.length;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🛠️</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Tracker Troubleshooter
          </h2>
          <p className="text-gray-500 text-sm">
            Real problems, real fixes — pick the right spreadsheet feature for
            each situation
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {SCENARIOS.map((s, scenarioIndex) => {
          const chosen = answers[s.id] ?? null;
          const isRevealed = revealed[s.id] ?? false;
          const isCorrect = isRevealed && chosen === s.correctIndex;

          return (
            <div
              key={s.id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-5"
            >
              <div className="flex gap-3 items-start">
                <span className="text-3xl mt-0.5">{s.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Problem {scenarioIndex + 1} of {SCENARIOS.length}
                  </p>
                  <p className="text-gray-800 font-medium leading-snug">
                    {s.problem}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {s.options.map((opt, i) => {
                  const isSelected = chosen === i;
                  const isThisCorrect = i === s.correctIndex;

                  let buttonClass =
                    "w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ";

                  if (!isRevealed) {
                    buttonClass += isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700";
                  } else {
                    if (isThisCorrect) {
                      buttonClass +=
                        "bg-green-50 text-green-800 border-green-400";
                    } else if (isSelected && !isThisCorrect) {
                      buttonClass += "bg-red-50 text-red-700 border-red-300";
                    } else {
                      buttonClass +=
                        "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(s.id, i)}
                      disabled={isRevealed}
                      className={buttonClass}
                    >
                      <span className="font-bold mr-2 text-xs">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isRevealed ? (
                <div
                  className={`rounded-xl px-4 py-3 text-sm ${
                    isCorrect
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  <span className="font-semibold">
                    {isCorrect ? "Correct. " : `Incorrect — the right fix is: ${s.options[s.correctIndex]}. `}
                  </span>
                  {s.explanation}
                </div>
              ) : (
                <button
                  onClick={() => handleCheck(s.id)}
                  disabled={chosen == null}
                  className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Check Answer
                </button>
              )}
            </div>
          );
        })}
      </div>

      {allDone && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center">
          <p className="text-gray-800 font-semibold">
            All done —{" "}
            {
              SCENARIOS.filter((s) => answers[s.id] === s.correctIndex).length
            }{" "}
            of {SCENARIOS.length} correct.{" "}
            {SCENARIOS.filter((s) => answers[s.id] === s.correctIndex)
              .length === SCENARIOS.length ? (
              <span className="text-green-600">
                You know exactly which tool fixes which problem.
              </span>
            ) : (
              <span className="text-amber-600">
                Review the explanations above before building your tracker.
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
