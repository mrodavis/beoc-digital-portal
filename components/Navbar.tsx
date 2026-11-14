"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#programs", label: "Programs", match: "/learning-paths" },
  { href: "/#academic", label: "Academics", match: "/eng" },
  { href: "/ehr-simulator", label: "EHR Simulator", match: "/ehr-simulator" },
  { href: "/typing-lab", label: "Typing Lab", match: "/typing-lab" },
  { href: "/progress", label: "My Progress", match: "/progress" },
];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-ink-line bg-white/90 backdrop-blur-xl">
      <div className="container-x">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-ink font-display text-lg font-bold text-white">
              B
            </span>
            <span className="font-display text-[19px] font-bold tracking-tight">BEOC Digital</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = pathname.startsWith(l.match);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-[10px] px-3.5 py-2.5 text-[15px] font-medium transition-colors ${
                    active ? "bg-[#F0F2F5] text-ink" : "text-ink-soft hover:bg-[#F0F2F5] hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href="https://ehr.beocdigital.org"
              className="rounded-xl bg-primary-600 px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Join with class code
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-xl border border-ink-line bg-white lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B1B33" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-line bg-white lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-[#F0F2F5]">
                {l.label}
              </Link>
            ))}
            <a href="https://ehr.beocdigital.org" className="mt-2 rounded-xl bg-primary-600 px-4 py-3.5 text-center font-semibold text-white">
              Join with class code
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
