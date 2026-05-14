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

const gradients = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-purple-700",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-rose-500 to-pink-600",
  "from-indigo-500 to-blue-700",
  "from-cyan-500 to-blue-600",
  "from-yellow-500 to-orange-500",
];

const lockedGradients = [
  "from-slate-400 to-slate-500",
  "from-slate-400 to-slate-500",
  "from-slate-400 to-slate-500",
  "from-slate-400 to-slate-500",
  "from-slate-400 to-slate-500",
  "from-slate-400 to-slate-500",
  "from-slate-400 to-slate-500",
  "from-slate-400 to-slate-500",
];

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function ModuleCard({
  num,
  emoji,
  title,
  description,
  href,
  level,
  estimatedMinutes,
  lessonCount,
  locked = false,
}: ModuleCardProps) {
  const gradient = locked
    ? lockedGradients[(num - 1) % lockedGradients.length]
    : gradients[(num - 1) % gradients.length];

  const card = (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden h-full flex flex-col transition-all duration-200 ${
        locked
          ? "opacity-70 cursor-not-allowed"
          : "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      }`}
    >
      {/* Gradient Header */}
      <div className={`bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between min-h-[160px]`}>
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full backdrop-blur-sm">
            Module {num}
          </span>
          {locked && (
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
              Coming Soon
            </span>
          )}
        </div>
        {emoji && (
          <span className="text-5xl mt-4 drop-shadow-sm">{emoji}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>

        {/* Stats Footer */}
        {!locked && (level || estimatedMinutes !== undefined || lessonCount !== undefined) && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500 flex-wrap">
            {level && (
              <span className="flex items-center gap-1">
                🎓 {level}
              </span>
            )}
            {estimatedMinutes !== undefined && (
              <span className="flex items-center gap-1">
                ⏱ {formatDuration(estimatedMinutes)}
              </span>
            )}
            {lessonCount !== undefined && (
              <span className="flex items-center gap-1">
                📚 {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (locked) return <div className="h-full">{card}</div>;

  return (
    <Link href={href} className="block h-full">
      {card}
    </Link>
  );
}
