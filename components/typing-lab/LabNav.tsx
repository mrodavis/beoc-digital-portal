"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/typing-lab", label: "Overview" },
  { href: "/typing-lab/lessons", label: "Key Lessons" },
  { href: "/typing-lab/tests", label: "Timed Tests" },
  { href: "/typing-lab/drills", label: "Workplace Drills" },
  { href: "/typing-lab/games", label: "Games" },
  { href: "/typing-lab/progress", label: "My Progress" },
];

export default function LabNav() {
  const path = usePathname();
  return (
    <nav aria-label="Typing Lab" className="-mx-4 overflow-x-auto px-4">
      <ul className="flex min-w-max gap-1 border-b border-gray-300">
        {LINKS.map((l) => {
          const on = l.href === "/typing-lab" ? path === l.href : path === l.href || path.startsWith(`${l.href}/`);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={on ? "page" : undefined}
                className={`-mb-px block whitespace-nowrap rounded-t-lg border-b-[3px] px-3 py-2.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:px-4 sm:text-base ${
                  on ? "border-primary-700 text-primary-800" : "border-transparent text-gray-700 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
