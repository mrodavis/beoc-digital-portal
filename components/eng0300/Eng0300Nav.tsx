"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/eng0300", label: "Dashboard", exact: true },
  { href: "/eng0300#skills", label: "Skill Labs", match: "/eng0300/skills" },
  { href: "/eng0300/practice", label: "Practice" },
  { href: "/eng0300/tabe", label: "TABE Prep" },
  { href: "/eng0300/resources", label: "Resources" },
];

/**
 * Section navigation for the ENG0300 Reading Lab.
 *
 * Sits directly beneath the site Navbar (h-16), scrolls horizontally on narrow
 * screens so every destination stays reachable on a phone.
 */
export default function Eng0300Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="ENG0300 Reading Lab"
      className="sticky top-16 z-40 border-b border-eng-navy-200 bg-white/95 backdrop-blur"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="-mx-1 flex items-center gap-1 overflow-x-auto py-2">
          <Link
            href="/eng0300"
            className="mr-2 hidden shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 sm:flex"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded bg-eng-navy-800 text-xs font-bold text-white">
              E3
            </span>
            <span className="font-display text-sm font-bold text-eng-navy-900">
              ENG0300
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
                className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2 ${
                  active
                    ? "bg-eng-navy-800 text-white"
                    : "text-eng-navy-600 hover:bg-eng-navy-50 hover:text-eng-navy-900"
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
