/**
 * Shown where a stage is not yet authored.
 *
 * We say so plainly rather than rendering an empty section or filler, so a
 * student is never left wondering whether something failed to load.
 */
export default function PendingContent({
  stage,
  skillTitle,
}: {
  stage: string;
  skillTitle: string;
}) {
  return (
    <div className="rounded-xl border-2 border-dashed border-eng-navy-200 bg-eng-navy-50 p-6">
      <p className="font-semibold text-eng-navy-900">
        The {stage} for {skillTitle} is still being written.
      </p>
      <p className="mt-2 max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-700">
        The lesson, worked example, and practice above are ready to use now. In
        the meantime, your instructor will cover this material in class, and the
        Practice Center has additional sets for this skill.
      </p>
    </div>
  );
}
