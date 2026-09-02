import type { Metadata } from "next";
import CommunicationCheck from "@/components/engl0150/CommunicationCheck";
import {
  engl0150Course,
  portfolioOutcomes,
  portfolioPieces,
} from "@/lib/content/engl0150/course";

export const metadata: Metadata = {
  title: "Writing Portfolio | ENGL0150",
  description:
    "The ENGL0150 Writing Portfolio — a record of process and progress across five pieces of healthcare writing.",
};

/** Portfolio state is keyed to topic 0, which no topic page uses. */
const PORTFOLIO_KEY = 0;

export default function PortfolioPage() {
  const cycle = ["Write", "Get feedback", "Revise", "Reflect"];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-engl-ink-900 sm:text-4xl">
        Writing Portfolio
      </h1>
      <p className="mt-3 max-w-[70ch] leading-relaxed text-engl-ink-700">
        Your portfolio is a record of process and progress, not a folder of
        finished work. What it shows is how your writing changed — which is the
        thing this course is actually about.
      </p>

      {/* The cycle */}
      <div className="mt-6 rounded-2xl border border-engl-care-300 bg-engl-care-50 p-6">
        <h2 className="font-display text-lg font-bold text-engl-ink-900">
          The cycle
        </h2>
        <ol className="mt-3 flex flex-wrap items-center gap-2">
          {cycle.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-xl bg-white px-4 py-2 font-semibold text-engl-care-800">
                {step}
              </span>
              {i < cycle.length - 1 && (
                <span className="text-engl-care-600" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-engl-ink-700">
          You return to this cycle throughout the course. Each piece shows its
          journey: original draft → feedback → revised version → reflection.
        </p>
      </div>

      {/* The five pieces */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          The five pieces
        </h2>
        <div className="mt-4 space-y-3">
          {portfolioPieces.map((piece) => (
            <div
              key={piece.title}
              className="rounded-2xl border border-engl-ink-200 bg-white p-5"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl" aria-hidden="true">
                  {piece.icon}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-engl-ink-900">
                    {piece.title}
                  </h3>
                  <p className="mt-1 text-engl-ink-700">{piece.description}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {piece.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded bg-engl-ink-100 px-2 py-1 text-xs font-medium text-engl-ink-700"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI stance */}
      <section className="mt-10 rounded-2xl border border-engl-plum-300 bg-engl-plum-50 p-6">
        <h2 className="font-display text-2xl font-bold text-engl-plum-900">
          {engl0150Course.aiStance}
        </h2>
        <p className="mt-2 leading-relaxed text-engl-ink-800">
          {engl0150Course.aiDetail}
        </p>
        <p className="mt-3 text-sm text-engl-ink-700">
          When AI is the source of feedback on a portfolio piece, say so in your
          reflection, and say what you accepted and what you rejected. That
          judgment is the part that belongs to you.
        </p>
      </section>

      {/* I can… self-assessment */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          I can&hellip;
        </h2>
        <p className="mt-1 text-engl-ink-600">
          Come back to this at the end of the course and see what changed.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-engl-ink-200">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-engl-ink-50">
                <th className="px-4 py-3 font-semibold text-engl-ink-900">
                  I can
                </th>
                <th className="px-4 py-3 font-semibold text-engl-ink-900">
                  Which means
                </th>
              </tr>
            </thead>
            <tbody>
              {portfolioOutcomes.map((o) => (
                <tr key={o.claim} className="border-t border-engl-ink-100">
                  <td className="px-4 py-3 font-medium text-engl-ink-900">
                    {o.claim}
                  </td>
                  <td className="px-4 py-3 text-engl-ink-700">{o.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Communication Check */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl font-bold text-engl-ink-900">
          Check any piece against these five
        </h2>
        <CommunicationCheck
          topicNumber={PORTFOLIO_KEY}
          heading="Portfolio Communication Check"
        />
      </section>

      <p className="mt-8 rounded-2xl bg-engl-ink-50 p-4 text-sm text-engl-ink-600">
        Portfolio pieces are submitted through Brightspace. This page is for
        understanding what each piece needs and checking your own work before
        you hand it in.
      </p>
    </div>
  );
}
