import Link from "next/link";
import LabNav from "@/components/typing-lab/LabNav";

export default function TypingLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-6xl px-4 pb-16 pt-8">
      <nav className="mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary-700">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <Link href="/typing-lab" className="font-medium text-gray-900 hover:text-primary-700">
          Typing Lab
        </Link>
      </nav>
      <LabNav />
      <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 sm:hidden">
        The Typing Lab needs a physical keyboard. You can look around on a phone, but do the lessons and tests on a computer or a tablet with a keyboard.
      </p>
      <div className="pt-6">{children}</div>
    </div>
  );
}
