import type { Metadata } from "next";
import WordBankDeck from "@/components/engl0150/WordBankDeck";
import { wordLists, getSpiralLists } from "@/lib/content/engl0150/wordLists";
import { courseMap } from "@/lib/content/engl0150/topics";

export const metadata: Metadata = {
  title: "Healthcare Word Bank | ENGL0150",
  description:
    "Spelling and usage words for ENGL0150, with study, spelling, and usage practice. Lists spiral forward through the course.",
};

export default function WordBankPage() {
  const built = new Set(wordLists.map((l) => l.topicNumber));
  const pending = courseMap.filter(
    (t) => typeof t.number === "number" && !built.has(t.number)
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-engl-ink-900 sm:text-4xl">
        Healthcare Word Bank
      </h1>
      <p className="mt-3 max-w-[70ch] leading-relaxed text-engl-ink-700">
        Every topic adds a short list of spelling and usage words. Lists spiral
        forward — from List 2 onward you can fold earlier lists back in, because
        a word you spelled correctly once is not a word you have learned.
      </p>
      <p className="mt-2 text-sm text-engl-ink-500">
        Practice only. Nothing here is graded or recorded.
      </p>

      <div className="mt-8 space-y-12">
        {wordLists.map((list) => (
          <section key={list.number}>
            <div className="mb-3 flex flex-wrap items-baseline gap-3">
              <h2 className="font-display text-2xl font-bold text-engl-ink-900">
                List {list.number}
              </h2>
              <span className="rounded-full bg-engl-ink-100 px-3 py-1 text-sm font-medium text-engl-ink-700">
                Topic {list.topicNumber}
              </span>
              <span className="text-sm text-engl-ink-600">
                {list.words.length} words
              </span>
            </div>
            <WordBankDeck
              list={list}
              spiralLists={getSpiralLists(list.number)}
              title="Practice"
            />
          </section>
        ))}
      </div>

      {pending.length > 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-amber-400 bg-amber-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Still to come
          </p>
          <p className="mt-1 text-amber-900">
            Word lists for the following topics are specified in the
            Instructor&apos;s Guide and will appear here as those topics are
            built:
          </p>
          <ul className="mt-3 space-y-1 text-sm text-amber-900">
            {pending.map((t) => (
              <li key={String(t.number)}>
                Topic {t.number} — {t.title}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-amber-900">
            <strong>Instructor to confirm:</strong> the Instructor&apos;s Guide
            lists no spelling words for Topic 10 or for the Final Assessment.
          </p>
        </div>
      )}
    </div>
  );
}
