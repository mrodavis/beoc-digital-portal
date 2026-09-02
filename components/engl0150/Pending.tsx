import { PendingContent } from "@/types/engl0150";

/**
 * A visible editorial placeholder.
 *
 * The build specification forbids fabricating course content. Where the
 * Instructor's Guide does not supply something the seven-section template
 * expects, this renders in its place so the gap is obvious to the instructor
 * rather than silently filled or silently omitted.
 */
export default function Pending({ content }: { content: PendingContent }) {
  return (
    <div className="rounded-xl border border-dashed border-amber-400 bg-amber-50 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-amber-800">
        Instructor to confirm
      </p>
      <p className="mt-1 text-amber-900">{content.note}</p>
    </div>
  );
}

/** Narrows the union used throughout the Topic model. */
export function isPending(value: unknown): value is PendingContent {
  return (
    typeof value === "object" &&
    value !== null &&
    "note" in (value as Record<string, unknown>)
  );
}
