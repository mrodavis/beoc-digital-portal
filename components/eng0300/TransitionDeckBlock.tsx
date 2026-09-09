"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TransitionDeck,
  TransitionWord,
} from "@/lib/content/eng0300/writing/transitions";

/**
 * The academic transition-word deck.
 *
 * Four modes, following the ENGL0150 Healthcare Word Bank pattern:
 *   study  — flip a card from word to relationship, meaning, and example
 *   spell  — type the word from its meaning
 *   choose — pick the sentence that uses the word correctly
 *   use    — WRITE a sentence using the word, then self-check it
 *
 * The fourth mode is the reason this deck exists. ENGL0150's "use it" mode is
 * recognition (choose the correct sentence); here that job belongs to "Choose
 * the Word", and "Use It" asks for production instead. Students already
 * recognize however and therefore. What they cannot yet do is reach for the
 * right one while writing.
 *
 * Nothing here is graded, scored by software, or transmitted. Use It drafts are
 * saved to the student's own browser with the same try/catch discipline as
 * every other store in this course, and the self-check is the student's own.
 */

type Mode = "study" | "spell" | "choose" | "use";

const modes: { id: Mode; label: string; hint: string }[] = [
  {
    id: "study",
    label: "Study",
    hint: "Flip each card for the relationship it signals, the meaning, and an example.",
  },
  {
    id: "spell",
    label: "Spell it",
    hint: "Read the meaning and type the word. Spelling these correctly matters — a misspelled transition still reads as an error.",
  },
  {
    id: "choose",
    label: "Choose the word",
    hint: "Pick the sentence that uses the word correctly. The wrong option swaps in a transition that promises the wrong relationship.",
  },
  {
    id: "use",
    label: "Use it",
    hint: "Write your own sentence. Nothing is scored — you check it yourself against three questions.",
  },
];

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ---------------- mode 1: flip card ---------------- */
function StudyCard({ word }: { word: TransitionWord }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-expanded={flipped}
      className="h-full w-full rounded-2xl border border-eng-navy-200 bg-white p-5 text-left transition-colors hover:border-eng-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
    >
      <span className="font-display text-xl font-bold text-eng-navy-900">
        {word.word}
      </span>
      <span className="ml-2 rounded-full bg-eng-teal-50 px-2 py-0.5 text-xs font-semibold text-eng-teal-800">
        {word.relationship}
      </span>
      {flipped ? (
        <span className="mt-3 block">
          <span className="block text-[0.9375rem] leading-relaxed text-eng-navy-700">
            {word.meaning}
          </span>
          <span className="mt-2 block italic leading-relaxed text-eng-navy-600">
            “{word.example}”
          </span>
        </span>
      ) : (
        <span className="mt-3 block text-sm text-eng-navy-500">
          Tap to see what it signals and how it is used.
        </span>
      )}
    </button>
  );
}

/* ---------------- mode 2: spell it ---------------- */
function SpellCard({ word }: { word: TransitionWord }) {
  const [entry, setEntry] = useState("");
  const [checked, setChecked] = useState(false);
  const correct = entry.trim().toLowerCase() === word.word.toLowerCase();

  return (
    <div className="rounded-2xl border border-eng-navy-200 bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-eng-teal-800">
        {word.relationship}
      </p>
      <p className="mt-1 text-[0.9375rem] leading-relaxed text-eng-navy-700">
        {word.meaning}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <label className="sr-only" htmlFor={`spell-${word.word}`}>
          Type the transition word that matches this meaning
        </label>
        <input
          id={`spell-${word.word}`}
          value={entry}
          onChange={(e) => {
            setEntry(e.target.value);
            setChecked(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && setChecked(true)}
          autoComplete="off"
          spellCheck={false}
          placeholder="Type the word"
          className="min-w-0 flex-1 rounded-lg border border-eng-navy-300 px-3 py-2 focus:border-eng-teal-600 focus:outline-none focus:ring-1 focus:ring-eng-teal-600"
        />
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-lg bg-eng-navy-800 px-4 py-2 font-medium text-white hover:bg-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-800 focus-visible:ring-offset-2"
        >
          Check
        </button>
      </div>
      {checked && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 rounded-lg p-3 text-sm leading-relaxed ${
            correct
              ? "bg-eng-green-50 text-eng-green-700"
              : "bg-eng-gold-50 text-eng-gold-700"
          }`}
        >
          {correct ? (
            <>
              Correct — <strong>{word.word}</strong>.
            </>
          ) : (
            <>
              The word is <strong>{word.word}</strong>. Look at the letters you
              missed, then try the next one.
            </>
          )}
        </p>
      )}
    </div>
  );
}

/* ---------------- mode 3: choose the word ---------------- */
function ChooseCard({ word }: { word: TransitionWord }) {
  const [picked, setPicked] = useState<number | null>(null);

  // The wrong option swaps in a transition promising a different relationship —
  // the actual error students make, not a nonsense sentence.
  const options = useMemo(() => {
    const pattern = new RegExp(`\\b${word.word}\\b`, "i");
    const wrong = word.example.replace(pattern, word.confusedWith);
    return shuffle([
      { text: word.example, correct: true },
      { text: wrong, correct: false },
    ]);
    // Shuffled once per mount so the answer position is not predictable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.word]);

  return (
    <div className="rounded-2xl border border-eng-navy-200 bg-white p-5">
      <p className="mb-3 font-semibold text-eng-navy-900">
        Which sentence uses{" "}
        <span className="text-eng-teal-700">{word.word}</span> correctly?
      </p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          const answered = picked !== null;
          const state = !answered
            ? "border-eng-navy-200 hover:border-eng-teal-500 hover:bg-eng-teal-50"
            : opt.correct
              ? "border-eng-green-600 bg-eng-green-50"
              : picked === i
                ? "border-red-400 bg-red-50"
                : "border-eng-navy-200 opacity-60";
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => setPicked(i)}
              className={`block w-full rounded-xl border-2 p-3 text-left text-[0.9375rem] leading-relaxed text-eng-navy-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2 disabled:cursor-default ${state}`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div role="status" aria-live="polite" className="mt-3 space-y-2">
          <p className="rounded-lg bg-eng-navy-50 p-3 text-sm leading-relaxed text-eng-navy-700">
            <span className="font-bold uppercase tracking-wide text-eng-teal-800">
              {word.word}
            </span>{" "}
            signals {word.relationship.toLowerCase()}. {word.meaning}
          </p>
          <p className="rounded-lg bg-eng-gold-50 p-3 text-sm leading-relaxed text-eng-gold-700">
            <span className="font-semibold">
              Why “{word.confusedWith}” is wrong here:
            </span>{" "}
            {word.whyWrong}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------------- mode 4: use it (production) ---------------- */
const USE_KEY = "eng0300:transitions:use:v1";

function readUse(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(USE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    // Private window or blocked storage — the mode still works, it just
    // does not persist between visits.
    return {};
  }
}

function writeUse(next: Record<string, string>) {
  try {
    window.localStorage.setItem(USE_KEY, JSON.stringify(next));
  } catch {
    // Saving is a convenience here, never a requirement.
  }
}

const useChecks = [
  "My sentence signals the same relationship the word promises",
  "The sentence still makes sense if I read it aloud",
  "I did not copy the example on the study card",
];

function UseCard({
  word,
  saved,
  onSave,
}: {
  word: TransitionWord;
  saved: string;
  onSave: (word: string, text: string) => void;
}) {
  const [text, setText] = useState(saved);
  const [checked, setChecked] = useState<boolean[]>(() =>
    useChecks.map(() => false)
  );

  // Debounced save, matching the 800ms used by the Write It drafts.
  useEffect(() => {
    if (text === saved) return;
    const t = setTimeout(() => onSave(word.word, text), 800);
    return () => clearTimeout(t);
  }, [text, saved, word.word, onSave]);

  const id = `use-${word.word.replace(/\s+/g, "-")}`;

  return (
    <div className="rounded-2xl border border-eng-navy-200 bg-white p-5">
      <div className="mb-2 flex flex-wrap items-baseline gap-2">
        <span className="font-display text-lg font-bold text-eng-navy-900">
          {word.word}
        </span>
        <span className="rounded-full bg-eng-teal-50 px-2 py-0.5 text-xs font-semibold text-eng-teal-800">
          {word.relationship}
        </span>
      </div>
      <label
        htmlFor={id}
        className="block text-[0.9375rem] leading-relaxed text-eng-navy-700"
      >
        {word.usePrompt}
      </label>
      <textarea
        id={id}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        spellCheck
        placeholder="Write your sentence here."
        className="mt-2 w-full resize-y rounded-lg border border-eng-navy-300 p-3 text-[0.9375rem] leading-relaxed text-eng-navy-900 focus:border-eng-teal-600 focus:outline-none focus:ring-1 focus:ring-eng-teal-600"
      />

      {text.trim().length > 0 && (
        <fieldset className="mt-3 rounded-lg bg-eng-navy-50 p-3">
          <legend className="px-1 text-xs font-bold uppercase tracking-wide text-eng-navy-500">
            Check your own sentence
          </legend>
          <ul className="space-y-2">
            {useChecks.map((check, i) => {
              const checkId = `${id}-check-${i}`;
              return (
                <li key={check} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id={checkId}
                    checked={checked[i]}
                    onChange={(e) =>
                      setChecked((prev) =>
                        prev.map((v, j) => (j === i ? e.target.checked : v))
                      )
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-eng-navy-300 text-eng-teal-700 focus:ring-2 focus:ring-eng-teal-600 focus:ring-offset-1"
                  />
                  <label
                    htmlFor={checkId}
                    className={`text-sm leading-relaxed ${
                      checked[i]
                        ? "text-eng-navy-400 line-through"
                        : "text-eng-navy-700"
                    }`}
                  >
                    {check}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}
    </div>
  );
}

/* ---------------- deck ---------------- */
export default function TransitionDeckBlock({
  deck,
  spiralDecks = [],
}: {
  deck: TransitionDeck;
  /** Earlier decks, folded in when the student turns on review. */
  spiralDecks?: TransitionDeck[];
}) {
  const [mode, setMode] = useState<Mode>("study");
  const [spiral, setSpiral] = useState(false);
  const [useDrafts, setUseDrafts] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUseDrafts(readUse());
    setReady(true);
  }, []);

  const saveUse = useCallback((word: string, text: string) => {
    setUseDrafts((prev) => {
      const next = { ...prev, [word]: text };
      writeUse(next);
      return next;
    });
  }, []);

  const words = useMemo(() => {
    if (!spiral || spiralDecks.length === 0) return deck.words;
    return [...spiralDecks.flatMap((d) => d.words), ...deck.words];
  }, [deck, spiralDecks, spiral]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-eng-navy-900">
            Deck {deck.number} — {deck.title}
          </h3>
          <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-eng-navy-600">
            {modes.find((m) => m.id === mode)?.hint}
          </p>
        </div>
        {deck.spirals && spiralDecks.length > 0 && (
          <label className="flex items-center gap-2 text-sm font-medium text-eng-navy-700">
            <input
              type="checkbox"
              checked={spiral}
              onChange={(e) => setSpiral(e.target.checked)}
              className="h-4 w-4 rounded border-eng-navy-300 text-eng-teal-700 focus:ring-2 focus:ring-eng-teal-600 focus:ring-offset-1"
            />
            Include earlier decks
          </label>
        )}
      </div>

      <div
        role="tablist"
        aria-label="Deck mode"
        className="mb-5 flex flex-wrap gap-2"
      >
        {modes.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`min-h-[2.5rem] rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2 ${
              mode === m.id
                ? "bg-eng-navy-800 text-white"
                : "bg-eng-navy-100 text-eng-navy-700 hover:bg-eng-navy-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {words.map((w) => (
          <div key={`${mode}-${w.word}`}>
            {mode === "study" && <StudyCard word={w} />}
            {mode === "spell" && <SpellCard word={w} />}
            {mode === "choose" && <ChooseCard word={w} />}
            {mode === "use" && ready && (
              <UseCard
                word={w}
                saved={useDrafts[w.word] ?? ""}
                onSave={saveUse}
              />
            )}
          </div>
        ))}
      </div>

      {mode === "use" && (
        <p className="mt-5 rounded-xl border border-eng-navy-200 bg-white p-4 text-sm leading-relaxed text-eng-navy-600">
          Your sentences are saved in this browser only. Nothing is scored,
          submitted, or read by anyone. This deck is ungraded — if points are
          attached to this vocabulary, they come from a Brightspace quiz.
        </p>
      )}
    </div>
  );
}
