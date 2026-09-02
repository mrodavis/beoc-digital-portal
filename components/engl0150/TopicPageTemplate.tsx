import Link from "next/link";
import { Topic, WordList } from "@/types/engl0150";
import { getGoal } from "@/lib/content/engl0150/course";
import TopicSection from "./TopicSection";
import Pending, { isPending } from "./Pending";
import CommunicationCheck from "./CommunicationCheck";
import GrammarDrill from "./GrammarDrill";
import WordBankDeck from "./WordBankDeck";
import Sorter from "./Sorter";
import Rewrite from "./Rewrite";
import Sequencer from "./Sequencer";
import Builder from "./Builder";

/**
 * The ENGL0150 topic page.
 *
 * Renders the seven-section architecture from the Instructor's Guide, in the
 * specified order, with the specified headings. Every topic uses this — the
 * consistency is the point.
 */
export default function TopicPageTemplate({
  topic,
  wordList,
  spiralLists,
  previous,
  next,
}: {
  topic: Topic;
  wordList?: WordList;
  spiralLists?: WordList[];
  previous?: Topic;
  next?: Topic;
}) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      {/* Session banner */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <Link
          href="/engl0150"
          className="font-medium text-engl-ink-600 underline hover:text-engl-ink-900"
        >
          ENGL0150
        </Link>
        <span className="text-engl-ink-400">/</span>
        <span className="rounded-full bg-engl-ink-100 px-3 py-1 font-semibold text-engl-ink-700">
          Unit {topic.unit.number} · {topic.unit.title}
        </span>
        <span className="rounded-full bg-engl-plum-100 px-3 py-1 font-semibold text-engl-plum-800">
          Topic {topic.number}
        </span>
        <span className="rounded-full bg-engl-ink-100 px-3 py-1 font-semibold text-engl-ink-700">
          {topic.sessions} {topic.sessions === "1" ? "session" : "sessions"}
        </span>
      </div>

      <h1 className="font-display text-3xl font-bold text-engl-ink-900 sm:text-4xl">
        {topic.title}
      </h1>

      {topic.sessionsNote && (
        <div className="mt-4">
          <Pending content={topic.sessionsNote} />
        </div>
      )}

      {/* Workplace product badge */}
      {!isPending(topic.product) && (
        <div className="mt-5 rounded-2xl border border-engl-care-300 bg-engl-care-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-engl-care-800">
            Workplace product
          </p>
          <p className="mt-1 font-semibold text-engl-ink-900">
            {topic.product.label}
          </p>
        </div>
      )}

      {/* Learning goals this topic advances */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-engl-ink-500">
          Course goals advanced
        </p>
        <ul className="flex flex-wrap gap-2">
          {topic.goals.map((id) => {
            const goal = getGoal(id);
            if (!goal) return null;
            return (
              <li
                key={id}
                className="rounded-lg border border-engl-ink-200 bg-white px-3 py-1.5 text-sm text-engl-ink-700"
              >
                <span className="font-bold text-engl-ink-900">
                  {goal.number}.
                </span>{" "}
                {goal.title}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Spiral banner */}
      {topic.spiralsFrom && topic.spiralsFrom.length > 0 && (
        <div className="mt-5 rounded-2xl border border-engl-plum-200 bg-engl-plum-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-engl-plum-800">
            Spiraling back
          </p>
          <p className="mt-1 text-engl-ink-800">
            This topic revisits grammar you met earlier, in a harder context:{" "}
            {topic.spiralsFrom.map((n, i) => (
              <span key={n}>
                {i > 0 && ", "}
                <Link
                  href={`/engl0150/topics/${n}`}
                  className="font-semibold text-engl-plum-800 underline hover:text-engl-plum-900"
                >
                  Topic {n}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      )}

      {topic.intro && topic.intro.length > 0 && (
        <div className="mt-6 space-y-3">
          {topic.intro.map((p, i) => (
            <p key={i} className="leading-relaxed text-engl-ink-700">
              {p}
            </p>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-10">
        {/* 1 — Essential Question */}
        <TopicSection id="essential-question" step={1} title="Essential Question">
          {isPending(topic.essentialQuestion) ? (
            <Pending content={topic.essentialQuestion} />
          ) : (
            <blockquote className="rounded-2xl border-l-4 border-engl-plum-600 bg-engl-plum-50 p-6">
              <p className="font-display text-xl font-semibold leading-relaxed text-engl-ink-900 sm:text-2xl">
                {topic.essentialQuestion}
              </p>
            </blockquote>
          )}
        </TopicSection>

        {/* 2 — Teaching & Learning Concepts */}
        <TopicSection
          id="concepts"
          step={2}
          title="Teaching &amp; Learning Concepts"
          description="The communication principles, workplace expectations, and healthcare context behind this topic."
        >
          <ul className="space-y-2">
            {topic.concepts.map((c, i) => (
              <li key={i} className="flex gap-3 text-engl-ink-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-engl-care-600" aria-hidden="true" />
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </TopicSection>

        {/* 3 — Grammar Focus */}
        <TopicSection
          id="grammar"
          step={3}
          title="Grammar Focus"
          description="A small set of high-value grammar skills, tied directly to this topic's communication task."
        >
          {isPending(topic.grammar) ? (
            <Pending content={topic.grammar} />
          ) : (
            <div className="space-y-4">
              {topic.grammar.map((block, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-engl-ink-200 bg-white p-5"
                >
                  <h3 className="mb-3 font-display text-lg font-bold text-engl-ink-900">
                    {block.heading}
                  </h3>
                  <ul className="space-y-2">
                    {block.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-engl-ink-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-engl-ink-400" aria-hidden="true" />
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </TopicSection>

        {/* 4 — Healthcare Vocabulary */}
        <TopicSection
          id="vocabulary"
          step={4}
          title="Healthcare Vocabulary"
          description="This topic's spelling and usage words. Earlier lists spiral forward — turn them on to review."
        >
          {isPending(topic.wordListNumber) || !wordList ? (
            <Pending
              content={
                isPending(topic.wordListNumber)
                  ? topic.wordListNumber
                  : { note: "Word list for this topic has not been supplied." }
              }
            />
          ) : (
            <WordBankDeck list={wordList} spiralLists={spiralLists} />
          )}
        </TopicSection>

        {/* 5 — Formative Practice */}
        <TopicSection
          id="practice"
          step={5}
          title="Formative Practice"
          description="Guided activities and short exercises. None of this is graded — it is here so you can find out what you know before it counts."
        >
          {topic.practice.length === 0 ? (
            <Pending
              content={{
                note: "Formative practice activities for this topic have not been built yet.",
              }}
            />
          ) : (
            <div className="space-y-8">
              {topic.practice.map((widget, i) => {
                switch (widget.kind) {
                  case "grammar-drill":
                    return (
                      <GrammarDrill
                        key={i}
                        title={widget.title}
                        instructions={widget.instructions}
                        items={widget.items}
                      />
                    );
                  case "word-bank":
                    return wordList ? (
                      <WordBankDeck
                        key={i}
                        list={wordList}
                        spiralLists={spiralLists}
                        title={widget.title}
                      />
                    ) : null;
                  case "sorter":
                    return (
                      <Sorter
                        key={i}
                        title={widget.title}
                        instructions={widget.instructions}
                        bins={widget.bins}
                        items={widget.items}
                      />
                    );
                  case "rewrite":
                    return (
                      <Rewrite
                        key={i}
                        title={widget.title}
                        instructions={widget.instructions}
                        items={widget.items}
                      />
                    );
                  case "sequencer":
                    return (
                      <Sequencer
                        key={i}
                        title={widget.title}
                        instructions={widget.instructions}
                        items={widget.items}
                      />
                    );
                  case "builder":
                    return (
                      <Builder
                        key={i}
                        topicNumber={topic.number}
                        storageKey={widget.storageKey}
                        title={widget.title}
                        instructions={widget.instructions}
                        scenario={widget.scenario}
                        fields={widget.fields}
                      />
                    );
                  default:
                    return (
                      <Pending
                        key={i}
                        content={{
                          note: `The "${widget.title}" activity is specified but its widget is not built yet.`,
                        }}
                      />
                    );
                }
              })}
            </div>
          )}
        </TopicSection>

        {/* 6 — Cumulative Workplace Product */}
        <TopicSection
          id="product"
          step={6}
          title="Cumulative Workplace Product"
          description="Combine this topic's grammar, vocabulary, and communication skills into something you would actually produce at work."
        >
          {isPending(topic.product) ? (
            <Pending content={topic.product} />
          ) : (
            <div className="rounded-2xl border border-engl-care-300 bg-white p-6">
              <h3 className="font-display text-xl font-bold text-engl-ink-900">
                {topic.product.label}
              </h3>
              <p className="mt-2 leading-relaxed text-engl-ink-700">
                {topic.product.description}
              </p>
              {topic.product.scenario && (
                <div className="mt-4 rounded-xl bg-engl-ink-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-engl-ink-500">
                    Scenario
                  </p>
                  <p className="mt-1 leading-relaxed text-engl-ink-800">
                    {topic.product.scenario}
                  </p>
                </div>
              )}
              <p className="mt-4 text-sm text-engl-ink-500">
                Submit through Brightspace. This page is for drafting and
                self-checking.
              </p>
            </div>
          )}
        </TopicSection>

        {/* 7 — Revision & Reflection */}
        <TopicSection
          id="reflection"
          step={7}
          title="Revision &amp; Reflection"
          description="Review your work against the Communication Check, then name one thing to improve next time."
        >
          <div className="space-y-6">
            <CommunicationCheck topicNumber={topic.number} />
            {topic.reflection && topic.reflection.length > 0 && (
              <div className="rounded-2xl border border-engl-ink-200 bg-white p-5">
                <h3 className="mb-3 font-display text-lg font-bold text-engl-ink-900">
                  Think about
                </h3>
                <ul className="space-y-2">
                  {topic.reflection.map((r, i) => (
                    <li key={i} className="flex gap-3 text-engl-ink-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-engl-plum-500" aria-hidden="true" />
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TopicSection>
      </div>

      {/* Before You Leave */}
      {topic.beforeYouLeave && topic.beforeYouLeave.length > 0 && (
        <div className="mt-10 rounded-2xl border border-engl-ink-300 bg-engl-ink-50 p-6">
          <h2 className="font-display text-xl font-bold text-engl-ink-900">
            Before You Leave
          </h2>
          <ul className="mt-3 space-y-2">
            {topic.beforeYouLeave.map((item, i) => (
              <li key={i} className="flex gap-3 text-engl-ink-700">
                <span className="mt-0.5 shrink-0 font-bold text-engl-care-700" aria-hidden="true">
                  ☐
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {topic.closingLine && (
        <p className="mt-8 rounded-2xl bg-engl-plum-50 p-6 text-center font-display text-lg font-semibold text-engl-plum-900">
          {topic.closingLine}
        </p>
      )}

      {/* Prev / next */}
      <nav
        aria-label="Topic navigation"
        className="mt-10 flex items-center justify-between gap-4 border-t border-engl-ink-200 pt-6"
      >
        {previous ? (
          <Link
            href={`/engl0150/topics/${previous.number}`}
            className="font-medium text-engl-ink-600 hover:text-engl-ink-900"
          >
            ← Topic {previous.number}: {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/engl0150/topics/${next.number}`}
            className="text-right font-medium text-engl-care-700 hover:text-engl-care-900"
          >
            Topic {next.number}: {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
