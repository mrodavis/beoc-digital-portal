import {
  BEOC_TABE_URL,
  tabeRequirements,
  type TabeRequirement,
} from "@/lib/content/tabeRequirements";

/**
 * The "Entry requirement" box on a program page: the TABE scores (or the
 * placement test) BEOC requires for the program, with a link to BEOC's own
 * TABE page. The numbers live in lib/content/tabeRequirements.ts. Renders
 * nothing for a program BEOC's chart does not list.
 */
export default function TabeRequirementBox({
  programKey,
  className = "",
}: {
  /** A key of tabeRequirements: a program slug, or "office-assistant". */
  programKey: string;
  className?: string;
}) {
  const req: TabeRequirement | undefined = tabeRequirements[programKey];
  if (!req) return null;

  const heading =
    req.kind === "minimum"
      ? "TABE Scores to Enroll"
      : req.kind === "range"
        ? "TABE Score Range"
        : "Placement Test";

  const tiles =
    req.kind === "placement"
      ? [{ label: "Test", value: req.test }]
      : [
          { label: "Reading", value: req.reading },
          ...(req.math ? [{ label: "Math", value: req.math }] : []),
        ];

  return (
    <section
      aria-label="Entry requirement"
      className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-primary-700 mb-1">
        Entry requirement
      </p>
      <h3 className="font-semibold text-gray-900 mb-3">{heading}</h3>

      <dl
        className={`grid gap-3 mb-2 ${tiles.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
      >
        {tiles.map((t) => (
          <div
            key={t.label}
            className="rounded-lg bg-primary-50 border border-primary-100 px-3 py-2 text-center"
          >
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-600">
              {t.label}
            </dt>
            <dd
              className={`font-bold text-primary-700 ${req.kind === "placement" ? "text-lg" : "text-2xl"}`}
            >
              {t.value}
            </dd>
          </div>
        ))}
      </dl>
      {req.kind !== "placement" && (
        <p className="text-xs text-gray-500 mb-3">
          {req.kind === "minimum"
            ? "Minimum TABE scale score"
            : "TABE scale score range for placement"}
        </p>
      )}

      <p className="text-sm text-gray-700 leading-relaxed mb-2">
        {req.kind === "minimum" &&
          `BEOC uses the TABE (Test of Adult Basic Education) to place students, and BEOC sets the minimum ${req.math ? "scores" : "score"} for ${req.beocProgram}.`}
        {req.kind === "range" &&
          `BEOC uses the TABE (Test of Adult Basic Education) to place students, and BEOC sets the score ranges for ${req.beocProgram}.`}
        {req.kind === "placement" && req.detail}
      </p>
      {req.kind === "minimum" && (
        <p className="text-sm text-gray-600 leading-relaxed mb-2">
          Below the score? That is not a no. BEOC can help you find next steps,
          such as retesting or academic support.
        </p>
      )}

      <a
        href={BEOC_TABE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-sm font-semibold text-primary-700 underline-offset-2 hover:underline"
      >
        See BEOC&rsquo;s TABE page →
      </a>
    </section>
  );
}
