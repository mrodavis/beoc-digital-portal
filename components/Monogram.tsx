/* Flat letter tiles used in place of emoji icons across the site (Campus Modern style). */

export const MONOGRAM_TONES = {
  blue: { bg: "#E8EDFF", fg: "#2F5BFF" },
  green: { bg: "#E3F8EE", fg: "#067647" },
  amber: { bg: "#FFF3DB", fg: "#9A5B00" },
  violet: { bg: "#EEEAFF", fg: "#5B3FD9" },
  gray: { bg: "#F2F4F7", fg: "#475467" },
  /* on dark or gradient backgrounds */
  white: { bg: "rgba(255,255,255,0.18)", fg: "#FFFFFF" },
} as const;

export type MonogramTone = keyof typeof MONOGRAM_TONES;

const SIZES = {
  sm: "h-10 w-10 rounded-[12px] text-[13px]",
  md: "h-12 w-12 rounded-[14px] text-[15px]",
  lg: "h-16 w-16 rounded-[18px] text-xl",
} as const;

/* Letters from a title: "Medical Billing and Coding" -> "MBC" */
export function monogram(title: string, max = 3) {
  const paren = title.match(/\(([A-Z0-9]{2,5})\)/);
  if (paren) return paren[1];
  return title
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !/^(and|of|for|the|a|an|w|with|to|in|on|your)$/i.test(w))
    .slice(0, max)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function Monogram({
  text,
  tone = "blue",
  size = "md",
  className = "",
}: {
  text: string;
  tone?: MonogramTone;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const t = MONOGRAM_TONES[tone];
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center font-display font-bold leading-none ${SIZES[size]} ${className}`}
      style={{ background: t.bg, color: t.fg }}
    >
      {text}
    </span>
  );
}
