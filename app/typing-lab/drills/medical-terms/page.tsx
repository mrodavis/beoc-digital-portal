import type { Metadata } from "next";
import Link from "next/link";
import TermsDrill from "@/components/typing-lab/TermsDrill";

export const metadata: Metadata = {
  title: "Medical terms · Typing Lab · BEOC Digital Skills Portal",
  description: "Type the Module 5 medical terminology list and see which terms need more practice.",
};

export default function Page() {
  return (
    <div>
      <Link href="/typing-lab/drills" className="text-sm font-semibold text-primary-700 hover:underline">
        ‹ All workplace drills
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Medical terms</h1>
      <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-700">Long medical words are easy to misspell and costly to get wrong. Type each term exactly, with a space between terms. The clock starts on your first key.</p>
      <div className="mt-6">
        <TermsDrill />
      </div>
    </div>
  );
}
