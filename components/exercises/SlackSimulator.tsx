"use client";
import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const CHANNELS = ["general", "team-updates", "project-alpha"] as const;
type Channel = (typeof CHANNELS)[number];

interface Message {
  sender: string;
  avatar: string;
  text: string;
  time: string;
}

const SCENARIOS: Record<Channel, { messages: Message[]; prompt: string }> = {
  general: {
    prompt:
      'Your manager just asked you to update the client about a project delay. Write a professional Slack message to your team.',
    messages: [
      {
        sender: "Jordan (Manager)",
        avatar: "J",
        text: "Hey team, the client just reached out. Can someone update them about the delay on the Henderson project? We owe them a response today.",
        time: "9:02 AM",
      },
      {
        sender: "Maya (Coworker)",
        avatar: "M",
        text: "I'm slammed with the Q4 report. Can someone else take point on this?",
        time: "9:05 AM",
      },
      {
        sender: "Jordan (Manager)",
        avatar: "J",
        text: "Let's get a volunteer — please respond here so we can coordinate.",
        time: "9:07 AM",
      },
    ],
  },
  "team-updates": {
    prompt:
      'A deadline has moved up by two days. Write a professional message informing your team and offering next steps.',
    messages: [
      {
        sender: "Alex (PM)",
        avatar: "A",
        text: "Heads-up everyone — the client moved the deadline for the onboarding deck. We now have until Wednesday instead of Friday.",
        time: "10:15 AM",
      },
      {
        sender: "Sam (Designer)",
        avatar: "S",
        text: "That's a tight turnaround. We need this ASAP.",
        time: "10:18 AM",
      },
      {
        sender: "Alex (PM)",
        avatar: "A",
        text: "Agreed. Who can confirm their availability for an urgent check-in today?",
        time: "10:20 AM",
      },
    ],
  },
  "project-alpha": {
    prompt:
      'A bug was found in a feature you built. Write a professional message acknowledging it and outlining your plan to fix it.',
    messages: [
      {
        sender: "Riley (QA)",
        avatar: "R",
        text: "Found a bug in the export feature — files aren't downloading correctly in Chrome. Ticket #412 is open.",
        time: "2:30 PM",
      },
      {
        sender: "Casey (Lead)",
        avatar: "C",
        text: "This is blocking a demo tomorrow morning. We need this resolved before 9 AM.",
        time: "2:33 PM",
      },
    ],
  },
};

// ─── Feedback logic ───────────────────────────────────────────────────────────

interface FeedbackItem {
  pass: boolean;
  label: string;
  suggestion: string;
}

const SLANG = ["yo", "hey", "asap", "lol", "omg", "thx", "ttyl", "brb", "np", "bc", "tbh", "idk"];
const GREETINGS = ["hi", "hello", "hey team", "good morning", "good afternoon", "greetings"];

function evaluate(text: string): FeedbackItem[] {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);

  const hasGreeting = GREETINGS.some((g) => lower.includes(g));
  const hasSlang = SLANG.some((s) => words.includes(s));
  const isLong = text.trim().split(/\s+/).length >= 15;
  const hasPunctuation = /[.!?]$/.test(text.trim());
  const hasActionOrNextStep =
    lower.includes("i will") ||
    lower.includes("i'll") ||
    lower.includes("we can") ||
    lower.includes("let me") ||
    lower.includes("plan to") ||
    lower.includes("happy to") ||
    lower.includes("available") ||
    lower.includes("follow up") ||
    lower.includes("reach out") ||
    lower.includes("please let me know") ||
    lower.includes("can we");

  return [
    {
      pass: hasGreeting,
      label: "Includes a greeting",
      suggestion: 'Start with a greeting like "Hi team," or "Hello Jordan,"',
    },
    {
      pass: !hasSlang,
      label: "Professional tone (no slang)",
      suggestion: `Avoid informal words like: ${SLANG.slice(0, 5).join(", ")}, etc.`,
    },
    {
      pass: isLong,
      label: "Sufficient detail (15+ words)",
      suggestion: "Your response is too brief. Add context, next steps, or a question.",
    },
    {
      pass: hasPunctuation,
      label: "Ends with punctuation",
      suggestion: "End your message with a period, question mark, or exclamation point.",
    },
    {
      pass: hasActionOrNextStep,
      label: "Includes an action or next step",
      suggestion:
        'Offer a concrete next step, e.g., "I\'ll send an update by noon" or "Can we connect at 2 PM?"',
    },
  ];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChannelList({
  active,
  onSelect,
}: {
  active: Channel;
  onSelect: (c: Channel) => void;
}) {
  return (
    <aside className="w-52 bg-[#3f0e40] text-white flex flex-col flex-shrink-0 rounded-l-2xl overflow-hidden">
      <div className="px-4 py-4 border-b border-purple-900">
        <p className="text-white font-bold text-sm tracking-wide">BEOC Workspace</p>
        <p className="text-purple-300 text-xs mt-0.5">Training Environment</p>
      </div>
      <div className="px-3 pt-4 pb-2">
        <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-2 px-1">
          Channels
        </p>
        <ul className="space-y-0.5">
          {CHANNELS.map((ch) => (
            <li key={ch}>
              <button
                onClick={() => onSelect(ch)}
                className={`w-full text-left px-2 py-1.5 rounded text-sm transition ${
                  active === ch
                    ? "bg-[#1164a3] text-white font-semibold"
                    : "text-purple-200 hover:bg-purple-800 hover:text-white"
                }`}
              >
                # {ch}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto px-4 py-4 border-t border-purple-900">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
            Y
          </div>
          <div>
            <p className="text-white text-xs font-semibold">You</p>
            <p className="text-green-400 text-xs">Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ChatWindow({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col gap-4 px-5 py-4 overflow-y-auto flex-1">
      {messages.map((msg, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {msg.avatar}
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-gray-900">{msg.sender}</span>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
            <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MessageInput({
  value,
  onChange,
  onSubmit,
  channel,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  channel: Channel;
  disabled: boolean;
}) {
  return (
    <div className="px-4 py-3 border-t border-gray-200 bg-white">
      <div className="flex items-end gap-2 border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={`Message #${channel}`}
          className="flex-1 text-sm resize-none outline-none text-gray-800 placeholder:text-gray-400 disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (value.trim()) onSubmit();
            }
          }}
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim() || disabled}
          className="bg-[#1164a3] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed self-end"
        >
          Submit
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-1 px-1">Press Enter to submit · Shift+Enter for new line</p>
    </div>
  );
}

function FeedbackPanel({ items, onReset }: { items: FeedbackItem[]; onReset: () => void }) {
  const passed = items.filter((i) => i.pass).length;
  const total = items.length;
  const allGood = passed === total;

  return (
    <div
      className={`mx-4 mb-4 rounded-xl border p-4 ${
        allGood ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{allGood ? "✅" : "⚠️"}</span>
          <span className={`text-sm font-bold ${allGood ? "text-green-700" : "text-amber-700"}`}>
            {allGood
              ? "Great response! All criteria met."
              : `${passed} of ${total} criteria met — see suggestions below`}
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Try again
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 flex-shrink-0">{item.pass ? "✅" : "❌"}</span>
            <div>
              <span className={`font-medium ${item.pass ? "text-green-700" : "text-red-700"}`}>
                {item.label}
              </span>
              {!item.pass && (
                <p className="text-gray-600 text-xs mt-0.5">{item.suggestion}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SlackSimulator() {
  const [activeChannel, setActiveChannel] = useState<Channel>("general");
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<FeedbackItem[] | null>(null);

  const scenario = SCENARIOS[activeChannel];

  function handleSubmit() {
    if (!input.trim()) return;
    setFeedback(evaluate(input));
  }

  function handleChannelSelect(ch: Channel) {
    setActiveChannel(ch);
    setInput("");
    setFeedback(null);
  }

  function handleReset() {
    setInput("");
    setFeedback(null);
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">💬</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Slack Simulator</h2>
          <p className="text-gray-500 text-sm">
            Practice writing professional workplace messages in a Slack-style environment
          </p>
        </div>
      </div>

      {/* Scenario prompt */}
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl px-4 py-3 mb-4 text-sm text-blue-800">
        <span className="font-semibold">Scenario: </span>
        {scenario.prompt}
      </div>

      {/* Simulator shell */}
      <div className="flex h-[480px] rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white">
        <ChannelList active={activeChannel} onSelect={handleChannelSelect} />

        <div className="flex flex-col flex-1 min-w-0">
          {/* Channel header */}
          <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-2 bg-white">
            <span className="text-gray-500 font-semibold text-sm">#</span>
            <span className="text-gray-900 font-bold text-sm">{activeChannel}</span>
            <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              Training simulation
            </span>
          </div>

          {/* Messages */}
          <ChatWindow messages={scenario.messages} />

          {/* Feedback (shown above input when submitted) */}
          {feedback && <FeedbackPanel items={feedback} onReset={handleReset} />}

          {/* Input */}
          <MessageInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            channel={activeChannel}
            disabled={!!feedback}
          />
        </div>
      </div>
    </div>
  );
}
