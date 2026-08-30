import { Activity } from "@/types/eng0300";

/**
 * The ANSWER REVIEW stage.
 *
 * Collapsed by default so it does not spoil the practice above it. Each entry
 * gives the key, the reasoning behind it, and a line on why every distractor
 * fails — the part that actually moves a score.
 */
export default function AnswerReviewBlock({
  activities,
}: {
  activities: { label: string; activity: Activity }[];
}) {
  return (
    <div className="space-y-6">
      <p className="max-w-[68ch] text-base leading-relaxed text-eng-navy-700">
        Work through the practice first, then open a question below to see the
        full reasoning. Reading why a wrong answer is wrong is what stops you
        from choosing it again on the test.
      </p>

      {activities.map(({ label, activity }) => (
        <section key={activity.id}>
          <h3 className="mb-3 font-display text-lg font-bold text-eng-navy-900">
            {label}
          </h3>
          <div className="space-y-2">
            {activity.questions.map((question, index) => {
              const correctSet = Array.isArray(question.correctAnswer)
                ? question.correctAnswer
                : typeof question.correctAnswer === "number"
                  ? [question.correctAnswer]
                  : [];

              return (
                <details
                  key={question.id}
                  className="group rounded-xl border border-eng-navy-200 bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-3 rounded-xl p-4 font-medium text-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600">
                    <span className="mt-0.5 shrink-0 rounded bg-eng-navy-100 px-2 py-0.5 text-xs font-bold text-eng-navy-700">
                      Q{index + 1}
                    </span>
                    <span className="flex-1 text-[0.9375rem] leading-relaxed">
                      {question.question}
                    </span>
                    <span
                      className="shrink-0 text-eng-navy-400 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </summary>

                  <div className="border-t border-eng-navy-100 p-4">
                    {question.choices && correctSet.length > 0 ? (
                      <p className="mb-3 rounded-lg bg-eng-green-50 p-3 text-[0.9375rem] leading-relaxed text-eng-navy-900">
                        <span className="font-bold text-eng-green-700">
                          Correct answer:{" "}
                        </span>
                        {correctSet
                          .map(
                            (index) =>
                              `${String.fromCharCode(65 + index)}. ${question.choices?.[index]}`
                          )
                          .join("  •  ")}
                      </p>
                    ) : (
                      question.sampleResponse && (
                        <p className="mb-3 rounded-lg bg-eng-teal-50 p-3 text-[0.9375rem] leading-relaxed text-eng-navy-900">
                          <span className="font-bold text-eng-teal-800">
                            Model response:{" "}
                          </span>
                          {question.sampleResponse}
                        </p>
                      )
                    )}

                    <p className="text-[0.9375rem] leading-relaxed text-eng-navy-800">
                      <span className="font-semibold">Why: </span>
                      {question.explanation}
                    </p>

                    {question.choiceRationales && question.choices && (
                      <>
                        <p className="mb-2 mt-4 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
                          Every choice, explained
                        </p>
                        <ul className="space-y-2">
                          {question.choices.map((choice, index) => (
                            <li
                              key={index}
                              className="text-sm leading-relaxed text-eng-navy-700"
                            >
                              <span
                                className={`mr-1 font-bold ${
                                  correctSet.includes(index)
                                    ? "text-eng-green-700"
                                    : "text-red-700"
                                }`}
                              >
                                {String.fromCharCode(65 + index)}.
                              </span>
                              <span className="italic text-eng-navy-500">
                                {choice}
                              </span>{" "}
                              — {question.choiceRationales?.[index]}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
