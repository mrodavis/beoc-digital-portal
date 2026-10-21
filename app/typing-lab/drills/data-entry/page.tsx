import type { Metadata } from "next";
import Link from "next/link";
import DataEntryDrill from "@/components/typing-lab/DataEntryDrill";

export const metadata: Metadata = {
  title: "Patient registration data entry · Typing Lab · BEOC Digital Skills Portal",
  description: "Enter fictional patient registration records and check every field against the source.",
};

export default function Page() {
  return (
    <div>
      <Link href="/typing-lab/drills" className="text-sm font-semibold text-primary-700 hover:underline">
        ‹ All workplace drills
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Patient registration data entry</h1>
      <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-700">You are working the front desk at Lakeside Medical Associates. For each new patient, copy the information form and insurance card into the registration screen. Use Tab to move between fields, read every field back, then check the record. All patients are fictional.</p>
      <div className="mt-6">
        <DataEntryDrill />
      </div>
    </div>
  );
}
