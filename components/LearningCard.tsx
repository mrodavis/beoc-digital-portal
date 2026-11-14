import Link from "next/link";

interface LearningCardProps {
  title: string;
  description: string;
  href: string;
  status: "available" | "coming-soon";
  icon?: string;
  abbr?: string;
  area?: string;
}

const tints: Record<string, { bg: string; fg: string }> = {
  Healthcare: { bg: "#E8EDFF", fg: "#2F5BFF" },
  Business: { bg: "#FFF3DB", fg: "#9A5B00" },
  Hospitality: { bg: "#FFF3DB", fg: "#9A5B00" },
  "Public Safety": { bg: "#E3F8EE", fg: "#067647" },
  Academic: { bg: "#EEEAFF", fg: "#5B3FD9" },
};

/* Monogram from the title: "Medical Billing and Coding" -> "MBC" */
function monogram(title: string) {
  const paren = title.match(/\(([A-Z0-9]{2,5})\)/);
  if (paren) return paren[1];
  const code = title.match(/^([A-Z]{3,4}\d{3,4})/);
  if (code) return code[1].replace(/\d+/, "");
  return title
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !/^(and|of|for|the|w|with|to)$/i.test(w))
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function LearningCard({ title, description, href, status, abbr, area }: LearningCardProps) {
  const isAvailable = status === "available";
  const tone = (area && tints[area]) || { bg: "#E8EDFF", fg: "#2F5BFF" };

  const body = (
    <div
      className={`flex h-full flex-col gap-3.5 rounded-[22px] border border-ink-line bg-white p-6 ${
        isAvailable ? "card-hover" : "opacity-75"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="grid h-12 w-12 place-items-center rounded-[14px] font-display text-[15px] font-bold"
          style={{ background: tone.bg, color: tone.fg }}
          aria-hidden="true"
        >
          {abbr || monogram(title)}
        </span>
        {area ? (
          <span className="rounded-full bg-[#F2F4F7] px-2.5 py-1 text-xs font-semibold text-ink-soft">{area}</span>
        ) : isAvailable ? (
          <span className="rounded-full bg-[#E3F8EE] px-2.5 py-1 text-xs font-semibold text-[#067647]">Available</span>
        ) : (
          <span className="rounded-full bg-accent-100 px-2.5 py-1 text-xs font-semibold text-[#9A5B00]">Coming soon</span>
        )}
      </div>
      <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">{title}</h3>
      <p className="text-[15px] leading-relaxed text-ink-muted">{description}</p>
    </div>
  );

  return isAvailable ? (
    <Link href={href} className="block h-full rounded-[22px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">
      {body}
    </Link>
  ) : (
    body
  );
}
