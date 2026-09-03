"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary-700 transition-colors">
              B
            </div>
            <span className="font-display font-bold text-xl text-gray-900 hidden sm:block">
              BEOC Digital
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={isHome ? "#academic" : "/#academic"}
              className="px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Academics
            </Link>

            <Link
              href={isHome ? "#career" : "/#career"}
              className="px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="hidden sm:inline">Career & Technical</span>
              <span className="sm:hidden">Career</span>
            </Link>

            <Link
              href="/progress"
              className="px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="hidden sm:inline">My Progress</span>
              <span className="sm:hidden">Progress</span>
            </Link>

            <Link
              href="/"
              className="ml-2 px-4 py-2 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
