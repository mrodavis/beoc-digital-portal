/**
 * A labelled progress bar.
 *
 * Server-safe: takes plain numbers, so it renders inside a client component
 * that has read localStorage or inside a static page showing zero.
 */
export default function ProgressBar({
  done,
  total,
  label,
  size = "md",
}: {
  done: number;
  total: number;
  label?: string;
  size?: "sm" | "md";
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const complete = total > 0 && done === total;

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
        <span className="font-medium text-gray-700">{label ?? "Progress"}</span>
        <span className={complete ? "font-semibold text-green-700" : "text-gray-600"}>
          {complete ? "Complete" : `${done} of ${total}`}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${label ?? "Progress"}: ${done} of ${total} complete`}
        className={`w-full overflow-hidden rounded-full bg-gray-200 ${
          size === "sm" ? "h-1.5" : "h-2.5"
        }`}
      >
        <div
          className={`h-full rounded-full transition-all ${
            complete ? "bg-green-600" : "bg-primary-600"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
