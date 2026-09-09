import { WritingWorkedExample } from "@/lib/content/eng0300/writing/tiers";

/**
 * A writing worked example: a draft, the reasoning that improves it, and the
 * revision. It mirrors the Reading Lab's WorkedExampleBlock rhythm — setup,
 * ordered think-aloud steps, result, takeaway — but shows a before and after
 * instead of a passage and an answer, because that is what modelling writing
 * actually requires.
 */
export default function WritingWorkedExampleBlock({
  example,
}: {
  example: WritingWorkedExample;
}) {
  return (
    <div className="rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
      <h3 className="font-display text-xl font-bold text-eng-navy-900">
        {example.title}
      </h3>
      <p className="mt-1 max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
        {example.setup}
      </p>

      <div className="mt-5">
        <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
          The draft
        </h4>
        <blockquote className="rounded-xl border-l-4 border-eng-gold-500 bg-eng-gold-50/60 p-4 text-[0.9375rem] leading-relaxed text-eng-navy-800">
          {example.before}
        </blockquote>
      </div>

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
          The thinking, in order
        </h4>
        <ol className="space-y-3">
          {example.steps.map((step, i) => (
            <li
              key={step.move}
              className="rounded-xl border border-eng-navy-100 bg-eng-navy-50/50 p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-eng-navy-800 text-xs font-bold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-eng-navy-900">{step.move}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-eng-navy-700">
                    {step.thinking}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6">
        <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
          The revision
        </h4>
        <blockquote className="rounded-xl border-l-4 border-eng-green-600 bg-eng-green-50 p-4 text-[0.9375rem] leading-relaxed text-eng-navy-800">
          {example.after}
        </blockquote>
      </div>

      <p className="mt-5 rounded-xl bg-eng-navy-800 p-4 text-[0.9375rem] leading-relaxed text-white">
        <span className="font-bold uppercase tracking-wide text-white/70">
          Takeaway
        </span>
        <span className="mt-1 block">{example.takeaway}</span>
      </p>
    </div>
  );
}
