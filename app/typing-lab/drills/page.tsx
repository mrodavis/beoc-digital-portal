import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workplace Drills · Typing Lab · BEOC Digital Skills Portal",
  description: "Data entry, 10-key number entry, medical terms, and email punctuation drills for office work.",
};

const DRILLS = [
  { href: "/typing-lab/drills/data-entry", title: "Patient registration data entry", body: "Copy names, dates of birth, phone numbers, addresses, insurance member IDs, and appointment times from an intake form into a registration screen. Every field is checked against the source." },
  { href: "/typing-lab/drills/ten-key", title: "10-key number entry", body: "Enter ZIP codes, chart numbers, quantities, and dollar amounts on the numeric keypad (or the number row on a laptop), measured in keystrokes per hour." },
  { href: "/typing-lab/drills/medical-terms", title: "Medical terms", body: "Type the Module 5 list of 14 medical terms, three times each, and see which terms gave you trouble." },
  { href: "/typing-lab/drills/email", title: "Email punctuation and capitalization", body: "Fix greetings, closings, names, days, apostrophes, and commas the way a professional email needs them." },
];

export default function DrillsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Workplace drills</h1>
      <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-700">
        Typing at work is rarely a paragraph. It is a form, a column of numbers, a long medical word, or a short email. These drills practice those jobs, and each one ends with a printable results page.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {DRILLS.map((d) => (
          <li key={d.href}>
            <Link href={d.href} className="block h-full rounded-xl border-2 border-gray-200 bg-white p-5 transition-colors hover:border-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              <span className="block text-xl font-bold text-gray-900">{d.title}</span>
              <span className="mt-2 block leading-relaxed text-gray-700">{d.body}</span>
              <span className="mt-3 block font-semibold text-primary-700">Start the drill</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
