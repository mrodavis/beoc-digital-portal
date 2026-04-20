"use client";
import { useState } from "react";

const MEETING = {
  title: "Weekly Team Sync",
  date: "Thursday, April 24 at 10:00 AM",
  attendees: "You, Sarah (Manager), James (Sales), Priya (Design)",
  keyPoints: [
    "James: Q2 sales exceeded target by 12%",
    "Priya presented new homepage mockups — team voted to move forward with Option B",
    "Action items: James to draft follow-up email to top 5 clients by Friday; Priya to finalize mockup by next Monday",
  ],
};

const SAMPLE_RECAP = `Subject: Meeting Recap — Weekly Team Sync, April 24

Hi team,

Here's a summary from our meeting this morning.

Attendees: Sarah, James, Priya, [Your Name]

Key Updates:
- James: Q2 sales exceeded target by 12% — great work!
- Priya: New homepage mockups presented; team selected Option B to move forward.

Action Items:
- James → Draft follow-up email to top 5 clients by Friday, April 26
- Priya → Finalize homepage mockup by Monday, April 28

Let me know if anything was missed.

Best regards,
[Your Name]`;

const CHECKLIST = [
  { id: "subject", label: "Subject line includes 'Meeting Recap' and the date" },
  { id: "attendees", label: "Lists attendees" },
  { id: "decisions", label: "Summarizes key decisions or updates" },
  { id: "actions", label: "Includes action items with owners and deadlines" },
  { id: "closing", label: "Professional closing with your name" },
];

export default function MeetingExercise() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const score = Object.values(checked).filter(Boolean).length;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">📋</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Meeting Recap Exercise
          </h2>
          <p className="text-gray-500 text-sm">
            Write a professional post-meeting summary email
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-6">
        {/* Meeting notes card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-3">
          <p className="font-semibold text-blue-800">Your Meeting Notes</p>
          <div className="grid sm:grid-cols-2 gap-2 text-sm text-blue-700">
            <div>
              <span className="font-medium">Meeting: </span>
              {MEETING.title}
            </div>
            <div>
              <span className="font-medium">Date: </span>
              {MEETING.date}
            </div>
            <div className="sm:col-span-2">
              <span className="font-medium">Attendees: </span>
              {MEETING.attendees}
            </div>
          </div>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Key Points:</p>
            <ul className="list-disc pl-5 space-y-1">
              {MEETING.keyPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Write your recap email
          </label>
          <textarea
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rows={12}
            placeholder={
              "Subject: Meeting Recap — Weekly Team Sync, April 24\n\nHi team,\n\nHere's a quick summary from today's meeting..."
            }
            disabled={submitted}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none font-mono disabled:bg-gray-50"
          />
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={email.trim().length < 50}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Recap
          </button>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <p className="font-semibold text-gray-800 mb-3">
                Self-Review Checklist
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
                      onChange={() => toggle(item.id)}
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
              <p className="mt-4 pt-4 border-t border-gray-200 text-sm font-semibold text-gray-700">
                Score: {score} / {CHECKLIST.length}
                {score === CHECKLIST.length && (
                  <span className="text-green-600 ml-2">
                    — Excellent recap!
                  </span>
                )}
                {score >= 3 && score < CHECKLIST.length && (
                  <span className="text-amber-600 ml-2">
                    — Good, review the missing items
                  </span>
                )}
              </p>
            </div>

            <details className="border border-gray-200 rounded-xl">
              <summary className="px-6 py-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 rounded-xl">
                See a sample recap email
              </summary>
              <div className="px-6 pb-6 pt-2">
                <pre className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {SAMPLE_RECAP}
                </pre>
              </div>
            </details>

            <button
              onClick={() => {
                setSubmitted(false);
                setEmail("");
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
