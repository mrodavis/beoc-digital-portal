"use client";
import { useState } from "react";

type Action = "reply" | "archive" | "delegate" | "delete";

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  correctAction: Action;
  reason: string;
}

const EMAILS: Email[] = [
  {
    id: 1,
    from: "sarah.chen@company.com",
    subject: "Re: Q3 Budget Report — your feedback needed",
    preview:
      "Hi, I've attached the Q3 report. Can you review sections 2–4 and send your comments by Thursday? Thanks.",
    correctAction: "reply",
    reason:
      "This requires your input and has a deadline — reply promptly with your feedback.",
  },
  {
    id: 2,
    from: "noreply@newsletters.example.com",
    subject: "Your weekly industry digest is here!",
    preview:
      "Top stories this week: 5 trends in digital marketing, how AI is changing...",
    correctAction: "delete",
    reason:
      "An unsolicited newsletter you didn't sign up for — unsubscribe or delete it.",
  },
  {
    id: 3,
    from: "hr@company.com",
    subject: "All Staff: Open Enrollment closes Friday",
    preview:
      "Reminder: benefits open enrollment ends Friday. Log into the portal to make your selections.",
    correctAction: "archive",
    reason:
      "FYI only — read it, take action in the HR portal, then archive the email.",
  },
  {
    id: 4,
    from: "james.wilson@company.com",
    subject: "Vendor invoice approval — needs sign-off",
    preview:
      "Hey, got an invoice from Apex Supplies for $1,200. Not sure who approves these — can you handle it?",
    correctAction: "delegate",
    reason:
      "Not your responsibility — forward it to the right person (e.g., Finance team).",
  },
  {
    id: 5,
    from: "priya.patel@company.com",
    subject: "Thanks for your help yesterday!",
    preview:
      "Just wanted to say thank you for stepping in on the client call. Really appreciated it!",
    correctAction: "archive",
    reason: "A kind note — no action required. Read it and archive.",
  },
];

const ACTIONS: { value: Action; label: string; colors: string }[] = [
  {
    value: "reply",
    label: "Reply",
    colors: "bg-blue-100 text-blue-700 border-blue-300 ring-blue-500",
  },
  {
    value: "archive",
    label: "Archive",
    colors: "bg-gray-100 text-gray-700 border-gray-300 ring-gray-500",
  },
  {
    value: "delegate",
    label: "Delegate",
    colors: "bg-purple-100 text-purple-700 border-purple-300 ring-purple-500",
  },
  {
    value: "delete",
    label: "Delete",
    colors: "bg-red-100 text-red-700 border-red-300 ring-red-500",
  },
];

export default function InboxExercise() {
  const [selections, setSelections] = useState<Record<number, Action>>({});
  const [revealed, setRevealed] = useState(false);

  const allAnswered = EMAILS.every((e) => selections[e.id] !== undefined);
  const correctCount = EMAILS.filter(
    (e) => selections[e.id] === e.correctAction
  ).length;

  const select = (id: number, action: Action) => {
    if (!revealed) setSelections((prev) => ({ ...prev, [id]: action }));
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">📥</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Inbox Triage Exercise
          </h2>
          <p className="text-gray-500 text-sm">
            Categorize each email: Reply, Archive, Delegate, or Delete
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-4">
        {EMAILS.map((email) => {
          const selected = selections[email.id];
          const isCorrect = revealed && selected === email.correctAction;
          const isWrong = revealed && selected !== email.correctAction;
          const correctMeta = ACTIONS.find(
            (a) => a.value === email.correctAction
          )!;

          return (
            <div
              key={email.id}
              className={`rounded-xl border-2 p-5 transition-all ${
                isCorrect
                  ? "border-green-400 bg-green-50"
                  : isWrong
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">{email.from}</p>
                  <p className="font-semibold text-gray-800 text-sm">
                    {email.subject}
                  </p>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                    {email.preview}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap shrink-0">
                  {ACTIONS.map(({ value, label, colors }) => (
                    <button
                      key={value}
                      onClick={() => select(email.id, value)}
                      disabled={revealed}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                        selected === value
                          ? `${colors} ring-2 ring-offset-1`
                          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {revealed && (
                <div
                  className={`mt-3 text-xs p-3 rounded-lg ${
                    isCorrect
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {isCorrect ? (
                    <>✓ Correct! </>
                  ) : (
                    <>
                      ✗ Best action:{" "}
                      <span className="font-semibold">
                        {correctMeta.label}
                      </span>
                      .{" "}
                    </>
                  )}
                  {email.reason}
                </div>
              )}
            </div>
          );
        })}

        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 flex-wrap">
          {!revealed ? (
            <>
              <button
                onClick={() => setRevealed(true)}
                disabled={!allAnswered}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Answers
              </button>
              {!allAnswered && (
                <p className="text-sm text-gray-400">
                  Categorize all {EMAILS.length} emails to continue
                </p>
              )}
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-800">
                Score: {correctCount} / {EMAILS.length}
                {correctCount === EMAILS.length && (
                  <span className="text-green-600 ml-2">
                    — Perfect! Inbox under control.
                  </span>
                )}
                {correctCount >= 3 && correctCount < EMAILS.length && (
                  <span className="text-amber-600 ml-2">
                    — Good, review the misses above.
                  </span>
                )}
                {correctCount < 3 && (
                  <span className="text-red-600 ml-2">
                    — Review the inbox strategies and try again.
                  </span>
                )}
              </p>
              <button
                onClick={() => {
                  setSelections({});
                  setRevealed(false);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
