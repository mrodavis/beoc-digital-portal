"use client";
import { useState } from "react";

type Cell = {
  value: string;
  highlight?: boolean;
  header?: boolean;
  updated?: boolean;
};

type Challenge = {
  id: string;
  heading: string;
  instruction: string;
  columnLabels: string[];
  grid: Cell[][];
  options: string[];
  correctIndex: number;
  explanation: string;
};

const CHALLENGES: Challenge[] = [
  {
    id: "sum",
    heading: "Total the expense column",
    instruction:
      'The highlighted cell should display the sum of all expense amounts. Which formula belongs in cell B6?',
    columnLabels: ["A", "B"],
    grid: [
      [{ value: "Category", header: true }, { value: "Amount", header: true }],
      [{ value: "Supplies" }, { value: "$450" }],
      [{ value: "Software" }, { value: "$1,200" }],
      [{ value: "Travel" }, { value: "$875" }],
      [{ value: "Meals" }, { value: "$320" }],
      [{ value: "Total:" }, { value: "= ?", highlight: true }],
    ],
    options: ["=SUM(B2:B5)", "=COUNT(B2:B5)", "=AVERAGE(B2:B5)", "=ADD(B2:B5)"],
    correctIndex: 0,
    explanation:
      "=SUM(B2:B5) adds every value from B2 through B5 and updates automatically if any amount changes. =COUNT counts entries, not values. =ADD is not a real formula.",
  },
  {
    id: "count",
    heading: "Count the clients",
    instruction:
      "The highlighted cell should show how many clients are in the list. Which formula belongs in cell A6?",
    columnLabels: ["A", "B"],
    grid: [
      [
        { value: "Client Name", header: true },
        { value: "Status", header: true },
      ],
      [{ value: "Rivera Co." }, { value: "Active" }],
      [{ value: "Bluewave LLC" }, { value: "Active" }],
      [{ value: "Thorne & Sons" }, { value: "Pending" }],
      [{ value: "Nexus Group" }, { value: "Active" }],
      [{ value: "= ?", highlight: true }, { value: "" }],
    ],
    options: [
      "=COUNT(A2:A5)",
      "=COUNTA(A2:A5)",
      "=SUM(A2:A5)",
      "=AVERAGE(A2:A5)",
    ],
    correctIndex: 1,
    explanation:
      "=COUNTA counts all non-empty cells — including text like names. =COUNT only counts cells with numbers, so it returns 0 here. Always use =COUNTA when counting names, labels, or any text column.",
  },
  {
    id: "average",
    heading: "Find the average contract value",
    instruction:
      "The highlighted cell should display the average value across all three contracts. Which formula belongs in cell C5?",
    columnLabels: ["A", "B", "C"],
    grid: [
      [
        { value: "Client", header: true },
        { value: "Start Date", header: true },
        { value: "Value", header: true },
      ],
      [{ value: "Rivera Co." }, { value: "01/2024" }, { value: "$4,500" }],
      [{ value: "Bluewave LLC" }, { value: "03/2024" }, { value: "$2,200" }],
      [{ value: "Thorne & Sons" }, { value: "05/2024" }, { value: "$6,800" }],
      [{ value: "Average:" }, { value: "" }, { value: "= ?", highlight: true }],
    ],
    options: [
      "=SUM(C2:C4)",
      "=COUNT(C2:C4)",
      "=MEAN(C2:C4)",
      "=AVERAGE(C2:C4)",
    ],
    correctIndex: 3,
    explanation:
      "=AVERAGE(C2:C4) adds all values and divides by the count automatically. =MEAN is not a real spreadsheet formula. =SUM gives you the total, not the average. =COUNT gives you the number of entries.",
  },
  {
    id: "static",
    heading: "Spot the silent error",
    instruction:
      "Jordan typed 7500 directly into the Total cell instead of using a formula. She then updates Supplies from $450 to $900. What does the Total cell show after the change?",
    columnLabels: ["A", "B"],
    grid: [
      [{ value: "Category", header: true }, { value: "Amount", header: true }],
      [{ value: "Supplies" }, { value: "$900", updated: true }],
      [{ value: "Software" }, { value: "$1,200" }],
      [{ value: "Travel" }, { value: "$875" }],
      [{ value: "Meals" }, { value: "$320" }],
      [{ value: "Total:" }, { value: "7500", highlight: true }],
    ],
    options: [
      "8,050 — it recalculates automatically",
      "7,500 — the typed number never changes",
      "An error message",
      "It clears and shows 0",
    ],
    correctIndex: 1,
    explanation:
      "A typed number is completely disconnected from the cells above it. The total stays at 7500 no matter what changes — a silent error that looks correct at a glance. This is why you always use =SUM(): so totals update automatically when data changes.",
  },
];

export default function SpreadsheetAuditExercise() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const challenge = CHALLENGES[currentIndex];
  const isCorrect = revealed && selected === challenge.correctIndex;

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
  };

  const handleCheck = () => {
    if (selected == null) return;
    setRevealed(true);
  };

  const handleNext = () => {
    const newScores = [...scores, selected === challenge.correctIndex];
    setScores(newScores);
    if (currentIndex + 1 >= CHALLENGES.length) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelected(null);
    setRevealed(false);
    setScores([]);
    setDone(false);
  };

  const finalScore = scores.filter(Boolean).length;

  if (done) {
    return (
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Formula Lab</h2>
            <p className="text-gray-500 text-sm">
              Apply the right formula to the right situation
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 text-center space-y-4">
          <p className="text-4xl font-bold text-gray-900">
            {finalScore} / {CHALLENGES.length}
          </p>
          <p className="text-gray-600">
            {finalScore === CHALLENGES.length
              ? "Perfect. You know your formulas — and you know why static values are dangerous."
              : finalScore >= 3
              ? "Good work. Review any explanations you missed before moving on."
              : "Revisit the lesson and try again — formula selection is a core skill."}
          </p>
          <button
            onClick={handleReset}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">📊</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Formula Lab</h2>
          <p className="text-gray-500 text-sm">
            Apply the right formula to the right situation
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-8 space-y-6">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {CHALLENGES.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-8 rounded-full transition-colors ${
                  i < currentIndex
                    ? "bg-blue-500"
                    : i === currentIndex
                    ? "bg-blue-300"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">
            {currentIndex + 1} of {CHALLENGES.length}
          </span>
        </div>

        {/* Heading + instruction */}
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
            {challenge.heading}
          </p>
          <p className="text-gray-800 font-medium">{challenge.instruction}</p>
        </div>

        {/* Spreadsheet grid */}
        <div className="overflow-x-auto">
          <table className="border-collapse text-sm font-mono w-auto">
            <thead>
              <tr>
                <th className="w-8 bg-gray-100 border border-gray-300 text-gray-400 text-xs font-normal px-2 py-1" />
                {challenge.columnLabels.map((col) => (
                  <th
                    key={col}
                    className="bg-gray-100 border border-gray-300 text-gray-500 text-xs font-semibold px-4 py-1 text-center min-w-[120px]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {challenge.grid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="bg-gray-100 border border-gray-300 text-gray-400 text-xs text-center px-2 py-1">
                    {rowIndex + 1}
                  </td>
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border px-3 py-1.5 ${
                        cell.highlight
                          ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold ring-2 ring-blue-400 ring-inset"
                          : cell.header
                          ? "bg-blue-600 text-white font-semibold border-blue-700"
                          : cell.updated
                          ? "bg-amber-50 text-amber-800 border-gray-300"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {cell.value}
                      {cell.updated && (
                        <span className="ml-1 text-xs text-amber-600 font-sans font-medium">
                          ← updated
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {challenge.options.map((opt, i) => {
            let cls =
              "text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all font-mono ";
            if (!revealed) {
              cls +=
                selected === i
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700";
            } else {
              if (i === challenge.correctIndex) {
                cls += "bg-green-50 text-green-800 border-green-400";
              } else if (selected === i) {
                cls += "bg-red-50 text-red-700 border-red-300";
              } else {
                cls += "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed";
              }
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={revealed}
                className={cls}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {revealed && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              isCorrect
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <span className="font-semibold">
              {isCorrect
                ? "Correct. "
                : `Incorrect — the answer is ${challenge.options[challenge.correctIndex]}. `}
            </span>
            {challenge.explanation}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!revealed ? (
            <button
              onClick={handleCheck}
              disabled={selected == null}
              className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
            >
              {currentIndex + 1 < CHALLENGES.length
                ? "Next Challenge →"
                : "See Results"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
