"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/engl0150", label: "Course Home", exact: true },
  { href: "/engl0150#topics", label: "Topics", match: "/engl0150/topics" },
  { href: "/engl0150/word-bank", label: "Word Bank" },
  { href: "/engl0150/portfolio", label: "Portfolio" },
  { href: "/engl0150#advanced", label: "Advanced" },
  { href: "/engl0150/final", label: "Final" },
];

/**
 * Section navigation for ENGL0150.
 *
 * Sits directly beneath the site Navbar (h-16) and scrolls horizontally on
 * narrow screens, matching the ENG0300 pattern so the two courses behave the
 * same way.
 */
export default function Engl0150Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="ENGL0150 Writing for the Workplace"
      className="sticky top-16 z-40 border-b border-engl-ink-200 bg-white/95 backdrop-blur"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="-mx-1 flex items-center gap-1 overflow-x-auto py-2">
          <Link
            href="/engl0150"
            className="mr-2 hidden shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 sm:flex"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded bg-engl-care-700 text-xs font-bold text-white">
              W
            </span>
            <span className="font-display text-sm font-bold text-engl-ink-900">
              ENGL0150
            </span>
          </Link>

          {links.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : link.match
                ? pathname.startsWith(link.match)
                : pathname === link.href.split("#")[0];

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600 focus-visible:ring-offset-2 ${
                  active
                    ? "bg-engl-care-700 text-white"
                    : "text-engl-ink-600 hover:bg-engl-ink-50 hover:text-engl-ink-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
