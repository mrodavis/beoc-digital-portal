import { RubricStrand } from "@/types/eng0300";

/**
 * The ENG0300 10-point writing rubric.
 *
 * This is the same rubric attached to all six Brightspace writing dropboxes.
 * It exists here so a student can score their OWN draft before submitting —
 * it is a self-check, never a machine score, and the total a student gives
 * themselves is not recorded or transmitted anywhere.
 *
 * The four strands total 10 points. `writingRubricTotal` asserts that below,
 * so the site and the Brightspace rubric cannot silently drift apart.
 */
export const writingRubric: RubricStrand[] = [
  {
    id: "focus",
    label: "Focus",
    points: 3,
    lookFor:
      "One clear controlling idea, stated early and held to. Every sentence belongs to that idea — nothing wanders off the question that was asked.",
  },
  {
    id: "evidence",
    label: "Evidence & Development",
    points: 3,
    lookFor:
      "Specific support from the passage — details, examples, or quoted words — and an explanation of what that support shows. Not just a detail dropped in and left alone.",
  },
  {
    id: "organization",
    label: "Organization",
    points: 2,
    lookFor:
      "A sensible order a reader can follow, with transitions that signal how one sentence relates to the next. A beginning, a middle, and an ending that lands.",
  },
  {
    id: "conventions",
    label: "Conventions",
    points: 2,
    lookFor:
      "Complete sentences, subject-verb agreement, capitalization, and end punctuation. Errors do not stop a reader from understanding you.",
  },
];

/** 10. Kept in sync by construction rather than by hand. */
export const writingRubricTotal = writingRubric.reduce(
  (sum, strand) => sum + strand.points,
  0
);

/** Guards against a strand being edited without the total being reconsidered. */
if (writingRubricTotal !== 10) {
  throw new Error(
    `ENG0300 writing rubric must total 10 points; got ${writingRubricTotal}.`
  );
}

export const rubricSelfCheckPrompt =
  "Which strand did you score lowest? That is where to revise.";
