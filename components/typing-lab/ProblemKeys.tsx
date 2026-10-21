import Link from "next/link";
import { FINGER_NAME, keyFor, keyLabel } from "@/lib/typing-lab/keyboard";
import { LESSONS } from "@/lib/typing-lab/lessons";

/** The lesson that teaches a character (letters go to their letter lesson, not the Shift lesson). */
export function lessonForChar(ch: string): string | undefined {
  const lower = /^[A-Z]$/.test(ch) ? ch.toLowerCase() : ch;
  return LESSONS.find((l) => l.newKeys.includes(lower))?.id ?? (/^[A-Z]$/.test(ch) ? "shift-capitals" : undefined);
}

export function topProblemKeys(missByChar: Record<string, number>, n = 6): { ch: string; count: number }[] {
  return Object.entries(missByChar)
    .map(([ch, count]) => ({ ch, count }))
    .sort((a, b) => b.count - a.count || a.ch.localeCompare(b.ch))
    .slice(0, n);
}

export function problemKeysText(missByChar: Record<string, number>): string {
  const top = topProblemKeys(missByChar);
  return top.length ? top.map((k) => `${keyLabel(k.ch)} (${k.count})`).join(", ") : "None";
}

export default function ProblemKeys({ missByChar }: { missByChar: Record<string, number> }) {
  const top = topProblemKeys(missByChar);
  if (!top.length) return <p className="text-gray-700">No wrong keys at all. Nice work.</p>;
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {top.map(({ ch, count }) => {
        const lesson = lessonForChar(ch);
        const kf = keyFor(ch);
        return (
          <li key={ch} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
            <span className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-md border border-gray-400 bg-gray-100 px-2 font-mono text-lg font-bold text-gray-900">{keyLabel(ch)}</span>
            <span className="min-w-0 flex-1 text-sm text-gray-800">
              Missed {count} {count === 1 ? "time" : "times"}. {kf.finger === "th" ? "Thumb" : FINGER_NAME[kf.finger].replace(/^./, (c) => c.toUpperCase())}
              {kf.shift ? ", with Shift" : ""}.
            </span>
            {lesson && (
              <Link href={`/typing-lab/lessons/${lesson}`} className="whitespace-nowrap text-sm font-semibold text-primary-700 underline-offset-2 hover:underline">
                Practice
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
