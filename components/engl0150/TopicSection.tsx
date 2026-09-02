import { ReactNode } from "react";

/**
 * One of the seven sections every ENGL0150 topic page renders, in order.
 *
 * The repetition is pedagogically intentional: it teaches students how to
 * learn in the course while the content changes, so the numbering and headings
 * are fixed rather than per-topic.
 */
export default function TopicSection({
  id,
  step,
  title,
  description,
  children,
}: {
  id: string;
  step: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    // scroll-mt-32 clears the site Navbar (64px) plus the ENGL0150 nav (~52px)
    // so in-page links land below both bars.
    <section id={id} className="scroll-mt-32 border-t border-engl-ink-200 pt-10">
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-engl-ink-800 text-sm font-bold text-white"
            aria-hidden="true"
          >
            {step}
          </span>
          <h2 className="font-display text-2xl font-bold text-engl-ink-900 sm:text-3xl">
            {title}
          </h2>
        </div>
        {description && (
          <p className="max-w-[68ch] leading-relaxed text-engl-ink-600">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
