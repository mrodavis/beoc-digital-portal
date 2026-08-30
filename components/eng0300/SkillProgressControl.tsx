"use client";

import { SkillId } from "@/types/eng0300";
import { useSkillProgress } from "@/lib/eng0300/useProgress";

/**
 * Lets a learner mark a skill lab complete. Saved in this browser only — it is
 * a study aid, not a grade. Graded work lives in Brightspace.
 */
export default function SkillProgressControl({
  skillId,
  skillTitle,
}: {
  skillId: SkillId;
  skillTitle: string;
}) {
  const { ready, statusOf, setStatus } = useSkillProgress();
  const status = statusOf(skillId);
  const complete = ready && status === "complete";

  return (
    <div className="rounded-xl border border-eng-navy-200 bg-eng-navy-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-eng-navy-900">
            {complete ? "Marked complete" : `Finished ${skillTitle}?`}
          </p>
          <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-eng-navy-600">
            Marking a lab complete saves a note in this browser so you can track
            your own review. It is not a grade and it is not submitted anywhere.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setStatus(skillId, complete ? "in-progress" : "complete")
          }
          aria-pressed={complete}
          className={`shrink-0 rounded-lg px-5 py-3 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            complete
              ? "border-2 border-eng-green-600 bg-eng-green-50 text-eng-green-700 focus-visible:ring-eng-green-600"
              : "bg-eng-navy-800 text-white hover:bg-eng-navy-900 focus-visible:ring-eng-navy-800"
          }`}
        >
          {complete ? "✓ Complete — undo" : "Mark complete"}
        </button>
      </div>
    </div>
  );
}
