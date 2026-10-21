import { FINGER_COLOR, FINGER_NAME, FINGER_STRONG, keyFor, type Finger } from "@/lib/typing-lab/keyboard";

/** Finger shapes for the left hand; the right hand mirrors them. [finger, x, top, height] */
const LEFT: [Finger, number, number, number][] = [
  ["lp", 18, 52, 50],
  ["lr", 46, 34, 66],
  ["lm", 74, 26, 74],
  ["li", 102, 36, 64],
];

/**
 * Two simple hands with the finger for the next key filled in a strong color
 * and outlined. When the key needs Shift, the pinky that holds Shift gets a
 * dashed outline too.
 */
export default function HandsGuide({ next }: { next: string | null }) {
  const kf = next !== null ? keyFor(next) : null;
  const active = kf?.finger ?? null;
  const shiftFinger: Finger | null = kf?.shift === "ShiftL" ? "lp" : kf?.shift === "ShiftR" ? "rp" : null;
  const finger = (f: Finger, x: number, top: number, h: number) => {
    const on = active === f || (active === "th" && f === "th");
    const sh = shiftFinger === f;
    return (
      <rect
        key={`${f}-${x}`}
        x={x}
        y={top}
        width={24}
        height={h + 30}
        rx={12}
        fill={on ? FINGER_STRONG[f] : FINGER_COLOR[f]}
        stroke={on ? "#111827" : sh ? "#111827" : "#9ca3af"}
        strokeWidth={on ? 3 : sh ? 2.5 : 1}
        strokeDasharray={sh && !on ? "5 4" : undefined}
      />
    );
  };
  const label = kf ? (kf.finger === "th" ? "Thumb on the space bar" : `Use your ${FINGER_NAME[kf.finger]}${kf.shift ? ` and hold ${kf.shift === "ShiftL" ? "left" : "right"} Shift (dashed)` : ""}`) : " ";
  return (
    <figure className="mx-auto w-full max-w-[420px]">
      <svg viewBox="0 0 400 160" className="h-auto w-full" role="img" aria-label={kf ? label : "Hands on the home row"}>
        {/* left hand */}
        <rect x={14} y={96} width={118} height={58} rx={22} fill="#f3f4f6" stroke="#9ca3af" />
        {LEFT.map(([f, x, top, h]) => finger(f, x, top, h))}
        <g transform="rotate(-38 150 120)">
          <rect x={132} y={92} width={24} height={62} rx={12} fill={active === "th" ? FINGER_STRONG.th : FINGER_COLOR.th} stroke={active === "th" ? "#111827" : "#9ca3af"} strokeWidth={active === "th" ? 3 : 1} />
        </g>
        {/* right hand (mirror) */}
        <g transform="translate(400 0) scale(-1 1)">
          <rect x={14} y={96} width={118} height={58} rx={22} fill="#f3f4f6" stroke="#9ca3af" />
          {LEFT.map(([f, x, top, h]) => {
            const rf = ({ lp: "rp", lr: "rr", lm: "rm", li: "ri" } as Record<string, Finger>)[f];
            return finger(rf, x, top, h);
          })}
          <g transform="rotate(-38 150 120)">
            <rect x={132} y={92} width={24} height={62} rx={12} fill={active === "th" ? FINGER_STRONG.th : FINGER_COLOR.th} stroke={active === "th" ? "#111827" : "#9ca3af"} strokeWidth={active === "th" ? 3 : 1} />
          </g>
        </g>
        <text x={73} y={150} textAnchor="middle" fontSize={12} fill="#4b5563">
          Left hand
        </text>
        <text x={327} y={150} textAnchor="middle" fontSize={12} fill="#4b5563">
          Right hand
        </text>
      </svg>
      <figcaption className="mt-1 min-h-[1.25rem] text-center text-sm font-medium text-gray-800">{label}</figcaption>
    </figure>
  );
}
