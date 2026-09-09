import Link from "next/link";
import type { Metadata } from "next";
import TransitionDeckBlock from "@/components/eng0300/TransitionDeckBlock";
import BrightspaceReturn from "@/components/eng0300/BrightspaceReturn";
import {
  transitionDecks,
  transitionWordTotal,
} from "@/lib/content/eng0300/writing/transitions";

export const metadata: Metadata = {
  title: "Transition Words | ENG0300 Writing Lab",
  description:
    "Academic transition and signal word flashcards for ENG0300, in four modes. Ungraded practice.",
};

/**
 * The transition-word deck page.
 *
 * ?deck=<n> opens a specific week's deck; without it the page shows the whole
 * release schedule and opens on Deck 1. Decks spiral, so an earlier deck is
 * always reachable from a later one.
 */
export default async function TransitionsPage({
  searchParams,
}: {
  searchParams: Promise<{ deck?: string }>;
}) {
  const params = await searchParams;
  const requested = Number(params.deck);
  const active =
    transitionDecks.find((d) => d.number === requested) ?? transitionDecks[0];
  const spiralDecks = transitionDecks.filter((d) => d.number < active.number);

  return (
    <div>
      <header className="bg-gradient-to-br from-eng-teal-900 to-eng-teal-700">
        <div className="container mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/80">
            <Link href="/eng0300" className="hover:text-white">
              ENG0300
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/eng0300/writing-lab" className="hover:text-white">
              Writing Lab
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="font-medium text-white">Transition Words</span>
          </nav>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Academic transition words
          </h1>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-white/90 sm:text-lg">
            {transitionWordTotal} signal words across {transitionDecks.length}{" "}
            decks, released one deck a week. Every transition makes a promise
            about what comes next — these cards are about learning to keep it.
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Release schedule */}
        <nav aria-label="Decks" className="mb-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
            Decks
          </h2>
          <ul className="flex flex-wrap gap-2">
            {transitionDecks.map((deck) => {
              const isActive = deck.number === active.number;
              return (
                <li key={deck.number}>
                  <Link
                    href={`/eng0300/writing-lab/transitions?deck=${deck.number}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-block rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2 ${
                      isActive
                        ? "border-eng-navy-800 bg-eng-navy-800 text-white"
                        : "border-eng-navy-200 bg-white text-eng-navy-700 hover:border-eng-teal-500 hover:bg-eng-teal-50"
                    }`}
                  >
                    <span className="block text-xs font-bold uppercase tracking-widest opacity-70">
                      Week {deck.week}
                    </span>
                    {deck.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="mb-6 max-w-[68ch] rounded-xl border border-eng-navy-200 bg-white p-4 text-[0.9375rem] leading-relaxed text-eng-navy-700">
          <span className="font-semibold">This deck: </span>
          {active.focus}
        </p>

        <TransitionDeckBlock deck={active} spiralDecks={spiralDecks} />

        <div className="mt-12">
          <BrightspaceReturn />
        </div>
      </div>
    </div>
  );
}
