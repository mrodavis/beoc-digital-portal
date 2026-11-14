import Link from "next/link";

interface ModuleCardProps {
  num: number;
  slug: string;
  emoji?: string;
  title: string;
  description: string;
  href: string;
  level?: string;
  estimatedMinutes?: number;
  lessonCount?: number;
  locked?: boolean;
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function ModuleCard({
  num,
  title,
  description,
  href,
  level,
  estimatedMinutes,
  lessonCount,
  locked = false,
}: ModuleCardProps) {
  const tones = [
    { bg: "#E8EDFF", fg: "#2F5BFF" },
    { bg: "#E3F8EE", fg: "#067647" },
    { bg: "#FFF3DB", fg: "#9A5B00" },
    { bg: "#EEEAFF", fg: "#5B3FD9" },
  ];
  const tone = locked ? { bg: "#F2F4F7", fg: "#667085" } : tones[(num - 1) % tones.length];

  const card = (
    <div
      className={`flex h-full flex-col rounded-[22px] border border-ink-line bg-white p-6 transition-all duration-200 ${
        locked ? "cursor-not-allowed opacity-70" : "card-hover cursor-pointer"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="grid h-12 w-12 place-items-center rounded-[14px] font-display text-[15px] font-bold"
          style={{ background: tone.bg, color: tone.fg }}
          aria-hidden="true"
        >
          M{num}
        </span>
        <span className="rounded-full bg-[#F2F4F7] px-2.5 py-1 text-xs font-semibold text-ink-soft">
          {locked ? "Coming soon" : `Module ${num}`}
        </span>
      </div>

      <h3 className="mt-5 line-clamp-2 font-display text-lg font-semibold leading-snug tracking-tight text-ink">{title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">{description}</p>

      {!locked && (level || estimatedMinutes !== undefined || lessonCount !== undefined) && (
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink-line pt-4 text-xs font-medium text-ink-soft">
          {level && <span className="rounded-full bg-ink-canvas px-2.5 py-1">{level}</span>}
          {estimatedMinutes !== undefined && (
            <span className="rounded-full bg-ink-canvas px-2.5 py-1">{formatDuration(estimatedMinutes)}</span>
          )}
          {lessonCount !== undefined && (
            <span className="rounded-full bg-ink-canvas px-2.5 py-1">
              {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (locked) return <div className="h-full">{card}</div>;

  return (
    <Link href={href} className="block h-full">
      {card}
    </Link>
  );
}
