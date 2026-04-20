"use client";
import { useState } from "react";

const SCENARIO =
  "Your manager, Sarah Chen, has just sent you an email inviting you to interview for a promotion to Senior Administrative Assistant next Tuesday at 2:00 PM. Write a professional reply confirming your attendance.";

const SAMPLE_ANSWER = `Subject: Re: Interview for Senior Administrative Assistant — Tuesday Confirmed

Dear Sarah,

Thank you for this opportunity. I am happy to confirm my attendance for the interview on Tuesday at 2:00 PM.

I look forward to speaking with you and the team. Please let me know if there is anything I should prepare in advance.

Best regards,
[Your Name]`;

const CHECKLIST = [
  { id: "subject", label: "Clear, relevant subject line" },
  { id: "greeting", label: "Professional greeting (e.g., 'Dear Sarah,')" },
  { id: "confirm", label: "Confirms the date and time" },
  { id: "thanks", label: "Expresses gratitude or enthusiasm" },
  { id: "closing", label: "Professional closing (e.g., 'Best regards,')" },
  { id: "name", label: "Includes your name" },
];

export default function EmailExercise() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggleCheck = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const score = Object.values(checked).filter(Boolean).length;
  const canSubmit = subject.trim().length >= 5 && body.trim().length >= 30;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">✉️</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Email Writing Exercise
          </h2>
          <p className="text-gray-500 text-sm">
            Write a professional email response
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl">
          <p className="font-semibold text-blue-800 mb-1">Scenario</p>
          <p className="text-blue-700 text-sm">{SCENARIO}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Subject Line
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Re: Interview Invitation — Senior Admin Assistant"
            disabled={submitted}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Body
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            placeholder={"Dear Sarah,\n\nThank you for..."}
            disabled={submitted}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none font-mono disabled:bg-gray-50"
          />
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!canSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Email
          </button>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <p className="font-semibold text-gray-800 mb-1">
                Self-Review Checklist
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Check each element your email includes:
              </p>
              <div className="space-y-3">
                {CHECKLIST.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!checked[item.id]}
                      onChange={() => toggleCheck(item.id)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span
                      className={`text-sm ${
                        checked[item.id]
                          ? "text-green-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700">
                  Score: {score} / {CHECKLIST.length}
                  {score === CHECKLIST.length && (
                    <span className="text-green-600 ml-2">— Great work!</span>
                  )}
                  {score >= 4 && score < CHECKLIST.length && (
                    <span className="text-amber-600 ml-2">
                      — Good, review the missing items
                    </span>
                  )}
                  {score < 4 && score > 0 && (
                    <span className="text-red-600 ml-2">
                      — Review the lesson and try again
                    </span>
                  )}
                </p>
              </div>
            </div>

            <details className="border border-gray-200 rounded-xl">
              <summary className="px-6 py-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 rounded-xl">
                See a sample answer
              </summary>
              <div className="px-6 pb-6 pt-2">
                <pre className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {SAMPLE_ANSWER}
                </pre>
              </div>
            </details>

            <button
              onClick={() => {
                setSubmitted(false);
                setSubject("");
                setBody("");
                setChecked({});
              }}
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
