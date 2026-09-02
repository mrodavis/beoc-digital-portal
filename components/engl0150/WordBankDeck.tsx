"use client";

import { useMemo, useState } from "react";
import { VocabWord, WordList } from "@/types/engl0150";

type Mode = "study" | "spell" | "use";

/**
 * The Healthcare Word Bank deck.
 *
 * Three modes, per the build specification:
 *   study — flip a card from word to meaning and healthcare example
 *   spell — type the word from its meaning
 *   use   — choose the sentence using the word correctly
 *
 * Spiral mode folds in every earlier list, which is how the course revisits
 * vocabulary rather than teaching it once.
 */
function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function StudyCard({ word }: { word: VocabWord }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-expanded={flipped}
      className="w-full rounded-2xl border border-engl-ink-200 bg-white p-5 text-left transition-colors hover:border-engl-plum-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-plum-600 focus-visible:ring-offset-2"
    >
      <span className="font-display text-xl font-bold text-engl-ink-900">
        {word.word}
      </span>
      {word.confusedWith && (
        <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
          often confused with {word.confusedWith}
        </span>
      )}
      {flipped ? (
        <span className="mt-3 block">
          <span className="block text-engl-ink-700">{word.meaning}</span>
          <span className="mt-2 block italic text-engl-ink-600">
            “{word.example}”
          </span>
        </span>
      ) : (
        <span className="mt-3 block text-sm text-engl-ink-500">
          Tap to see the meaning and an example.
        </span>
      )}
    </button>
  );
}

function SpellCard({ word }: { word: VocabWord }) {
  const [entry, setEntry] = useState("");
  const [checked, setChecked] = useState(false);
  const correct = entry.trim().toLowerCase() === word.word.toLowerCase();

  return (
    <div className="rounded-2xl border border-engl-ink-200 bg-white p-5">
      <p className="text-engl-ink-700">{word.meaning}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <label className="sr-only" htmlFor={`spell-${word.word}`}>
          Type the word that matches this meaning
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
          className="min-w-0 flex-1 rounded-lg border border-engl-ink-300 px-3 py-2 focus:border-engl-plum-500 focus:outline-none focus:ring-1 focus:ring-engl-plum-500"
          placeholder="Type the word"
        />
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-lg bg-engl-plum-700 px-4 py-2 font-medium text-white hover:bg-engl-plum-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-plum-600 focus-visible:ring-offset-2"
        >
          Check
        </button>
      </div>
      {checked && (
        <p
          role="status"
          className={`mt-3 rounded-lg p-3 ${
            correct
              ? "bg-engl-care-50 text-engl-care-800"
              : "bg-amber-50 text-amber-900"
          }`}
        >
          {correct ? (
            <>Correct — <strong>{word.word}</strong>.</>
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

function UseCard({ word, distractor }: { word: VocabWord; distractor?: VocabWord }) {
  const [picked, setPicked] = useState<number | null>(null);
  // The wrong option swaps in the confusable word, which is the actual error
  // students make — patience for patient, proceed for precede.
  const options = useMemo(() => {
    const wrong = distractor
      ? word.example.replace(
          new RegExp(`\\b${word.word}\\b`, "i"),
          distractor.word
        )
      : `${word.example} (using the wrong word here)`;
    return shuffle([
      { text: word.example, correct: true },
      { text: wrong, correct: false },
    ]);
    // Shuffle once per mount so the answer position is not predictable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.word]);

  return (
    <div className="rounded-2xl border border-engl-ink-200 bg-white p-5">
      <p className="mb-3 font-semibold text-engl-ink-900">
        Which sentence uses <span className="text-engl-plum-700">{word.word}</span>{" "}
        correctly?
      </p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          const answered = picked !== null;
          const state = !answered
            ? "border-engl-ink-200 hover:border-engl-plum-400"
            : opt.correct
              ? "border-engl-care-500 bg-engl-care-50"
              : picked === i
                ? "border-red-400 bg-red-50"
                : "border-engl-ink-200 opacity-60";
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => setPicked(i)}
              className={`block w-full rounded-xl border p-3 text-left transition-colors ${state}`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p role="status" className="mt-3 text-sm text-engl-ink-700">
          <span className="font-medium">{word.word}:</span> {word.meaning}
        </p>
      )}
    </div>
  );
}

export default function WordBankDeck({
  list,
  spiralLists = [],
  title = "Word Bank",
}: {
  list: WordList;
  /** Earlier lists, folded in when the student turns on spiral mode. */
  spiralLists?: WordList[];
  title?: string;
}) {
  const [mode, setMode] = useState<Mode>("study");
  const [spiral, setSpiral] = useState(false);

  const words = useMemo(() => {
    const base = list.words;
    if (!spiral || spiralLists.length === 0) return base;
    return [...spiralLists.flatMap((l) => l.words), ...base];
  }, [list, spiralLists, spiral]);

  const byWord = useMemo(
    () => new Map(words.map((w) => [w.word.toLowerCase(), w])),
    [words]
  );

  const modes: { id: Mode; label: string; hint: string }[] = [
    { id: "study", label: "Study", hint: "Flip each card for the meaning and an example." },
    { id: "spell", label: "Spell it", hint: "Read the meaning and type the word." },
    { id: "use", label: "Use it", hint: "Choose the sentence that uses the word correctly." },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-engl-ink-900">
            {title} — List {list.number}
          </h3>
          <p className="text-sm text-engl-ink-600">
            {modes.find((m) => m.id === mode)?.hint}
          </p>
        </div>
        {list.spirals && spiralLists.length > 0 && (
          <label className="flex items-center gap-2 text-sm font-medium text-engl-ink-700">
            <input
              type="checkbox"
              checked={spiral}
              onChange={(e) => setSpiral(e.target.checked)}
              className="h-4 w-4 rounded border-engl-ink-300 text-engl-plum-600 focus:ring-engl-plum-600"
            />
            Include earlier lists
          </label>
        )}
      </div>

      <div
        role="tablist"
        aria-label="Word bank mode"
        className="mb-4 flex flex-wrap gap-2"
      >
        {modes.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-plum-600 focus-visible:ring-offset-2 ${
              mode === m.id
                ? "bg-engl-plum-700 text-white"
                : "bg-engl-ink-100 text-engl-ink-700 hover:bg-engl-ink-200"
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
            {mode === "use" && (
              <UseCard
                word={w}
                distractor={
                  w.confusedWith
                    ? byWord.get(w.confusedWith.toLowerCase())
                    : undefined
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
