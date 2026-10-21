import type { Metadata } from "next";
import Link from "next/link";
import KeyboardView, { FingerLegend } from "@/components/typing-lab/KeyboardView";
import OverviewProgress from "@/components/typing-lab/OverviewProgress";
import EmployerNote from "@/components/typing-lab/EmployerNote";

export const metadata: Metadata = {
  title: "Typing Lab · BEOC Digital Skills Portal",
  description: "Learn touch typing key by key, take 1- to 5-minute timed tests, and practice data entry, 10-key, and medical terms, all inside BEOC Digital.",
};

const PARTS = [
  { href: "/typing-lab/lessons", title: "Key lessons", body: "28 short lessons, from F and J to parentheses and @. Each drill uses only keys you have learned." },
  { href: "/typing-lab/tests", title: "Timed tests", body: "1, 2, 3, or 5 minutes of medical office, front desk, customer service, or email writing. Scored in net WPM." },
  { href: "/typing-lab/drills", title: "Workplace drills", body: "Patient registration data entry, 10-key number entry, medical terms, and email punctuation." },
  { href: "/typing-lab/games", title: "Games", body: "Race a pace car, and drag keys onto the fingers that press them." },
];

export default function TypingLabHome() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Typing Lab</h1>
          <p className="mt-3 text-xl leading-relaxed text-gray-700">
            Every finger has its own keys. Learn them one row at a time, build accuracy first and speed second, and print your results when you are done. Everything happens here, so there is no outside site to sign up for.
          </p>
        </div>
        <div>
          <KeyboardView next={null} />
          <FingerLegend />
        </div>
        <OverviewProgress />
      </section>

      <section aria-labelledby="how-h">
        <h2 id="how-h" className="text-2xl font-bold text-gray-900">
          A good way to practice
        </h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Take a 1-minute test", "Find your starting point. Write down your net WPM and accuracy, or print the results."],
            ["Work through the key lessons", "Go in order. Do not look down; the hands and the keyboard on screen show the right finger."],
            ["Practice a little every day", "Short daily sessions beat one long session a week. Mix lessons, drills, and a game."],
            ["Test again and print", "Take a timed test, compare with your first one, and submit the results page."],
          ].map(([t, b], i) => (
            <li key={t} className="rounded-xl border border-gray-200 bg-white p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              <span className="mt-2 block font-bold text-gray-900">{t}</span>
              <span className="mt-1 block text-gray-700">{b}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="parts-h">
        <h2 id="parts-h" className="text-2xl font-bold text-gray-900">
          What is in the lab
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {PARTS.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="block h-full rounded-xl border-2 border-gray-200 bg-white p-5 transition-colors hover:border-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                <span className="block text-xl font-bold text-gray-900">{p.title}</span>
                <span className="mt-1 block leading-relaxed text-gray-700">{p.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="score-h" className="space-y-4">
        <h2 id="score-h" className="text-2xl font-bold text-gray-900">
          How typing speed is scored
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-900">
                <th scope="col" className="px-4 py-3 text-sm font-semibold">Measure</th>
                <th scope="col" className="px-4 py-3 text-sm font-semibold">How it is figured</th>
                <th scope="col" className="px-4 py-3 text-sm font-semibold">Example: 1 minute, 200 characters, 6 errors left</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-semibold">Gross WPM</td>
                <td className="px-4 py-3">(characters typed ÷ 5) ÷ minutes. A &quot;word&quot; is any 5 characters, including spaces.</td>
                <td className="px-4 py-3">(200 ÷ 5) ÷ 1 = 40</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-semibold">Net WPM</td>
                <td className="px-4 py-3">Gross WPM − (uncorrected errors ÷ minutes)</td>
                <td className="px-4 py-3">40 − (6 ÷ 1) = 34</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 font-semibold">Accuracy</td>
                <td className="px-4 py-3">correct characters ÷ characters typed × 100</td>
                <td className="px-4 py-3">194 ÷ 200 × 100 = 97%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <EmployerNote />
      </section>
    </div>
  );
}
