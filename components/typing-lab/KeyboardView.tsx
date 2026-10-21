import { FINGER_COLOR, FINGER_NAME, ROWS, keyFor, keyLabel, type Finger } from "@/lib/typing-lab/keyboard";

/**
 * On-screen keyboard colored by finger zone. The next key (and the Shift to
 * hold with it) is drawn dark with a ring, so it reads without relying on
 * color alone. Purely visual: screen readers get the same information from
 * the hint line next to it.
 */
export default function KeyboardView({
  next,
  learned,
  focus,
}: {
  /** The next character to type, or null. */
  next: string | null;
  /** Keys learned so far; other letter keys are dimmed. Omit to show every key at full strength. */
  learned?: Set<string>;
  /** Keys this lesson introduces; drawn bold. */
  focus?: string[];
}) {
  const nk = next !== null ? keyFor(next) : null;
  const focusSet = new Set((focus ?? []).map((k) => k.toLowerCase()));
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[760px] select-none rounded-2xl border border-gray-300 bg-gray-200 p-1.5 sm:p-2">
      {ROWS.map((row, i) => (
        <div key={i} className={`mb-1 flex gap-[3px] last:mb-0 sm:gap-1 ${i === 4 ? "justify-center" : ""}`}>
          {row.map((key) => {
            const isNext = !!nk && (key.k === nk.key || key.k === nk.shift);
            const isChar = key.k.length === 1;
            const dim = !!learned && isChar && key.k !== " " && !learned.has(key.k) && !(key.shifted && learned.has(key.shifted)) && !isNext;
            const bump = key.k === "f" || key.k === "j";
            return (
              <div
                key={key.k}
                className={`relative flex h-7 min-w-0 flex-col items-center justify-center rounded-md border text-[9px] leading-none sm:h-10 sm:text-xs ${
                  isNext ? "z-10 border-primary-900 text-white ring-[3px] ring-primary-300" : "border-black/10 text-gray-900"
                } ${focusSet.has(key.k) && !isNext ? "font-extrabold underline decoration-2 underline-offset-2" : "font-medium"}`}
                style={{ flex: key.w ?? 1, background: isNext ? "#1d4ed8" : FINGER_COLOR[key.f], opacity: dim ? 0.4 : 1 }}
              >
                {key.shifted && <span className={`hidden text-[10px] sm:block ${isNext ? "text-white" : "text-gray-600"}`}>{key.shifted}</span>}
                <span className="truncate px-0.5">{key.label ?? keyLabel(key.k)}</span>
                {bump && <span className={`absolute bottom-1 h-[2px] w-3 rounded ${isNext ? "bg-white" : "bg-gray-700"}`} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const LEGEND: { fingers: Finger[]; label: string }[] = [
  { fingers: ["lp", "rp"], label: "Pinkies" },
  { fingers: ["lr", "rr"], label: "Ring fingers" },
  { fingers: ["lm", "rm"], label: "Middle fingers" },
  { fingers: ["li", "ri"], label: "Index fingers" },
  { fingers: ["th"], label: "Thumbs (space bar)" },
];

export function FingerLegend() {
  return (
    <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-700" aria-label="Finger colors">
      {LEGEND.map((l) => (
        <li key={l.label} className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border border-black/10" style={{ background: FINGER_COLOR[l.fingers[0]] }} aria-hidden="true" />
          {l.label}
        </li>
      ))}
      <li className="text-gray-600">Bumps on F and J mark the home row.</li>
    </ul>
  );
}

export { FINGER_NAME };
