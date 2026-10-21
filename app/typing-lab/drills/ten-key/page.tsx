import type { Metadata } from "next";
import Link from "next/link";
import TenKeyDrill from "@/components/typing-lab/TenKeyDrill";

export const metadata: Metadata = {
  title: "10-key number entry · Typing Lab · BEOC Digital Skills Portal",
  description: "Numeric keypad practice with whole numbers and dollar amounts, measured in keystrokes per hour.",
};

export default function Page() {
  return (
    <div>
      <Link href="/typing-lab/drills" className="text-sm font-semibold text-primary-700 hover:underline">
        ‹ All workplace drills
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">10-key number entry</h1>
      <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-700">Billing and records work means long columns of numbers. Type each entry and press Enter, keeping your eyes on the screen.</p>
      <div className="mt-6">
        <TenKeyDrill />
      </div>
    </div>
  );
}
