import type { Metadata } from "next";
import Link from "next/link";
import EmailFixDrill from "@/components/typing-lab/EmailFixDrill";

export const metadata: Metadata = {
  title: "Email punctuation and capitalization · Typing Lab · BEOC Digital Skills Portal",
  description: "Fix capitalization and punctuation in short professional email lines.",
};

export default function Page() {
  return (
    <div>
      <Link href="/typing-lab/drills" className="text-sm font-semibold text-primary-700 hover:underline">
        ‹ All workplace drills
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Email punctuation and capitalization</h1>
      <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-700">Small mistakes make a professional email look careless. Type each line the way it should appear in an email to a patient or a coworker.</p>
      <div className="mt-6">
        <EmailFixDrill />
      </div>
    </div>
  );
}
