import { ReactNode } from "react";

/**
 * One stage of the skill-page instructional sequence
 * (Learn → See It → Try It → Practice → Challenge → Answer Review → Mastery Check).
 */
export default function SkillStage({
  id,
  step,
  label,
  title,
  description,
  children,
}: {
  id: string;
  step: number;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    // scroll-mt-32 clears both sticky bars (site Navbar 64px + ENG0300 nav ~52px)
    // so deep links such as /eng0300/skills/main-ideas#practice land below them.
    <section id={id} className="scroll-mt-32 border-t border-eng-navy-200 pt-10">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-eng-navy-800 text-sm font-bold text-white"
            aria-hidden="true"
          >
            {step}
          </span>
          <span className="text-sm font-bold uppercase tracking-widest text-eng-teal-700">
            {label}
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-eng-navy-900 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-eng-navy-600">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
