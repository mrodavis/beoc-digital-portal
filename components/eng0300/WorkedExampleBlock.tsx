import { WorkedExample } from "@/types/eng0300";
import PassageBlock from "./PassageBlock";

/**
 * The SEE IT stage: a passage, the question, and the instructor's think-aloud
 * shown as numbered reasoning moves — the same modeling used in class.
 */
export default function WorkedExampleBlock({
  example,
}: {
  example: WorkedExample;
}) {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl font-bold text-eng-navy-900">
        {example.title}
      </h3>

      <PassageBlock passage={example.passage} />

      <div className="rounded-xl border-2 border-eng-teal-600 bg-white p-4 sm:p-6">
        <p className="mb-1 text-sm font-bold uppercase tracking-wide text-eng-teal-700">
          The question
        </p>
        <p className="text-lg font-semibold leading-relaxed text-eng-navy-900">
          {example.question}
        </p>

        <p className="mb-4 mt-6 text-sm font-bold uppercase tracking-wide text-eng-teal-700">
          Thinking it through
        </p>
        <ol className="space-y-4">
          {example.steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-eng-teal-700 text-sm font-bold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div className="max-w-[62ch]">
                <p className="font-semibold text-eng-navy-900">{step.move}</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-eng-navy-700">
                  {step.thinking}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-lg bg-eng-green-50 p-4">
          <p className="mb-1 text-sm font-bold uppercase tracking-wide text-eng-green-700">
            The answer
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-eng-navy-900">
            {example.answer}
          </p>
        </div>

        <div className="mt-4 rounded-lg border-l-4 border-eng-gold-500 bg-eng-gold-50 p-4">
          <p className="mb-1 text-sm font-bold uppercase tracking-wide text-eng-gold-700">
            Take this with you
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-eng-navy-800">
            {example.takeaway}
          </p>
        </div>
      </div>
    </div>
  );
}
