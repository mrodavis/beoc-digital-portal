import { brightspaceCourseUrl } from "@/lib/content/eng0300/writing/brightspace";

/**
 * "Back to Brightspace" affordance.
 *
 * The Reading Lab never hardcodes a Brightspace URL — the Resources page lists
 * Brightspace as a destination with no link, because the shell URL is not in
 * this repository. This component matches that: it renders the instruction
 * always, and becomes a real link only if `brightspaceCourseUrl` is filled in.
 *
 * Inventing a plausible-looking URL would be worse than having none, since a
 * wrong link sends students somewhere they cannot submit from.
 */
export default function BrightspaceReturn({
  dropbox,
  week,
}: {
  /** The specific dropbox this page's work belongs in, if there is one. */
  dropbox?: string;
  week?: number;
}) {
  return (
    <aside className="rounded-xl border border-eng-navy-200 bg-white p-5">
      <h2 className="font-display text-base font-bold text-eng-navy-900">
        Back to Brightspace
      </h2>
      <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-eng-navy-600">
        {dropbox ? (
          <>
            Graded work for this task goes in{" "}
            <span className="font-semibold text-eng-navy-800">{dropbox}</span>
            {typeof week === "number" && ` (Week ${week})`}. Nothing on this site
            is submitted, recorded, or graded.
          </>
        ) : (
          <>
            Assignments, submissions, attendance, and grades all live in
            Brightspace. Nothing on this site is submitted, recorded, or graded.
          </>
        )}
      </p>
      {brightspaceCourseUrl ? (
        <a
          href={brightspaceCourseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-lg bg-eng-navy-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-800 focus-visible:ring-offset-2"
        >
          Open Brightspace
          <span className="ml-1 font-normal text-white/70">
            (opens outside the portal)
          </span>
        </a>
      ) : (
        <p className="mt-3 text-xs text-eng-navy-500">
          Open Brightspace the way you normally do — through the college portal
          or your bookmark.
        </p>
      )}
    </aside>
  );
}
