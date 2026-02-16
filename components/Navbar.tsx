"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

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
              BEOC Portal
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname === "/"
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            
            <Link
              href="/learning-paths/ms-office"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/learning-paths/ms-office")
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="hidden sm:inline">Microsoft Office 2019</span>
              <span className="sm:hidden">Office</span>
            </Link>
            
            <Link
              href="/learning-paths/certification"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/learning-paths/certification")
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="hidden sm:inline">Certification</span>
              <span className="sm:hidden">Cert</span>
            </Link>
            
            <div className="px-3 sm:px-4 py-2 rounded-lg font-medium text-gray-400 cursor-not-allowed hidden lg:block">
              Digital Fundamentals
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
