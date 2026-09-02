"use client";

import { BuilderField } from "@/types/engl0150";
import { useTopicState } from "@/lib/engl0150/useTopicState";

/**
 * A structured drafting surface with a completeness check.
 *
 * Used for the SOAP note, the SBAR handoff, the referral request, and the
 * final case products. The checker looks for the critical elements a reader
 * would need — it never judges the prose, because prose cannot be auto-graded
 * honestly and a false "incomplete" would teach students to ignore it.
 */
export default function Builder({
  topicNumber,
  storageKey,
  title,
  instructions,
  scenario,
  fields,
}: {
  topicNumber: number;
  storageKey: string;
  title: string;
  instructions?: string;
  scenario: string;
  fields: BuilderField[];
}) {
  const { value, update, clear, ready } = useTopicState<Record<string, string>>(
    topicNumber,
    storageKey,
    {}
  );

  const setField = (id: string, text: string) =>
    update({ ...value, [id]: text });

  const missing = fields.filter((f) => {
    const text = (value[f.id] ?? "").toLowerCase();
    if (text.trim().length === 0) return true;
    if (!f.expects || f.expects.length === 0) return false;
    return !f.expects.some((e) => text.includes(e.toLowerCase()));
  });

  const started = Object.values(value).some((v) => v.trim().length > 0);

  const copyAll = () => {
    const text = fields
      .map((f) => `${f.label.toUpperCase()}\n${value[f.id] ?? ""}`)
      .join("\n\n");
    navigator.clipboard?.writeText(text);
  };

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && <p className="mt-1 text-engl-ink-600">{instructions}</p>}

      <div className="mt-3 rounded-2xl bg-engl-ink-50 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-engl-ink-500">
          Scenario
        </p>
        <p className="mt-1 leading-relaxed text-engl-ink-800">{scenario}</p>
      </div>

      <div className="mt-4 space-y-4">
        {fields.map((f) => (
          <div key={f.id}>
            <label
              htmlFor={`${storageKey}-${f.id}`}
              className="block font-semibold text-engl-ink-900"
            >
              {f.label}
            </label>
            <p className="mb-1 text-sm text-engl-ink-600">{f.prompt}</p>
            <textarea
              id={`${storageKey}-${f.id}`}
              value={value[f.id] ?? ""}
              onChange={(e) => setField(f.id, e.target.value)}
              rows={f.rows ?? 3}
              disabled={!ready}
              className="w-full rounded-xl border border-engl-ink-300 p-3 focus:border-engl-care-500 focus:outline-none focus:ring-1 focus:ring-engl-care-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-engl-ink-200 bg-white p-4">
        <p className="font-semibold text-engl-ink-900">Completeness check</p>
        {!started ? (
          <p className="mt-1 text-sm text-engl-ink-600">
            Fill in the sections above and this will tell you what a reader would
            still be missing.
          </p>
        ) : missing.length === 0 ? (
          <p role="status" className="mt-1 text-engl-care-800">
            Every section has content and includes the critical elements. Now read
            it as the person receiving it — is anything ambiguous?
          </p>
        ) : (
          <ul role="status" className="mt-2 space-y-1.5 text-sm">
            {missing.map((f) => (
              <li key={f.id} className="flex gap-2 text-amber-900">
                <span aria-hidden="true">⚠</span>
                <span>
                  <strong>{f.label}:</strong>{" "}
                  {(value[f.id] ?? "").trim().length === 0
                    ? "nothing written yet."
                    : (f.missingHint ??
                      "may be missing a critical element the reader needs.")}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-engl-ink-500">
          This checks for missing elements only. It does not judge your writing —
          use the Communication Check for that.
        </p>
      </div>

      {started && (
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyAll}
            className="rounded-lg border border-engl-ink-300 px-4 py-2 text-sm font-medium text-engl-ink-700 hover:bg-engl-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
          >
            Copy for submission
          </button>
          <button
            type="button"
            onClick={clear}
            className="text-sm font-medium text-engl-ink-600 underline hover:text-engl-ink-900"
          >
            Clear draft
          </button>
        </div>
      )}
    </div>
  );
}
