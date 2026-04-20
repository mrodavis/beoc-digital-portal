"use client";
import { useState } from "react";

const MESSAGES = [
  {
    label: "Message 1",
    original: "hey did u see the doc?? we need to talk asap its urgent pls respond",
    hint: "Be specific about which document, why it's urgent, and suggest a clear next step.",
    sample:
      "Hi [Name], just wanted to check if you had a chance to review the Q3 Budget doc I shared yesterday. I need your input by EOD — can we connect for 15 minutes this afternoon?",
  },
  {
    label: "Message 2",
    original: "this is taking forever why isn't it done yet",
    hint: "Be professional, reference the specific task, and ask a constructive question.",
    sample:
      "Hi [Name], I wanted to follow up on the status of the client proposal. Could you let me know where things stand and if there's anything I can do to help move it forward?",
  },
  {
    label: "Message 3",
    original: "meeting tomorrow 9am everyone needs to be there",
    hint: "Include context, give a proper heads-up, and make it a request rather than a demand.",
    sample:
      "Hi team — quick heads-up that we have a team sync tomorrow at 9:00 AM to review the Q4 roadmap. Please confirm your attendance if you're able to join. Thanks!",
  },
];

export default function MessageRewriteExercise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rewrites, setRewrites] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const msg = MESSAGES[activeIndex];
  const currentRewrite = rewrites[activeIndex] ?? "";

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">💬</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Message Rewrite Exercise
          </h2>
          <p className="text-gray-500 text-sm">
            Rewrite unprofessional messages for the workplace
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-1">
          {MESSAGES.map((m, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition ${
                activeIndex === i
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
            Original message
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-gray-700 text-sm italic">
            &ldquo;{msg.original}&rdquo;
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-xl text-sm text-amber-800">
          <span className="font-semibold">Hint: </span>
          {msg.hint}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
            Your rewrite
          </p>
          <textarea
            value={currentRewrite}
            onChange={(e) =>
              setRewrites((prev) => ({ ...prev, [activeIndex]: e.target.value }))
            }
            rows={4}
            placeholder="Type your professional version here..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <button
          onClick={() =>
            setRevealed((prev) => ({ ...prev, [activeIndex]: true }))
          }
          disabled={!currentRewrite.trim()}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check Sample Answer
        </button>

        {revealed[activeIndex] && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
              Sample Answer
            </p>
            <p className="text-sm text-gray-700">{msg.sample}</p>
          </div>
        )}
      </div>
    </div>
  );
}
