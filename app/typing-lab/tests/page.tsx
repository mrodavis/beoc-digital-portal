import type { Metadata } from "next";
import TimedTest from "@/components/typing-lab/TimedTest";
import { TEST_LENGTHS, type TestLength } from "@/lib/typing-lab/scoring";
import { TOPICS, type TopicId } from "@/lib/typing-lab/passages";

export const metadata: Metadata = {
  title: "Timed Tests · Typing Lab · BEOC Digital Skills Portal",
  description: "1-, 2-, 3- and 5-minute typing tests with workplace passages, scored in net WPM, gross WPM and accuracy.",
};

export default async function TestsPage({ searchParams }: { searchParams: Promise<{ minutes?: string; topic?: string }> }) {
  const sp = await searchParams;
  const m = Number(sp.minutes);
  const minutes = (TEST_LENGTHS as readonly number[]).includes(m) ? (m as TestLength) : 1;
  const topic = TOPICS.some((t) => t.id === sp.topic) ? (sp.topic as TopicId) : "mixed";
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Timed tests</h1>
      <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-700">
        Pick a length and a topic, then start typing. The clock starts on your first key. Every passage is workplace writing from Lakeside Medical Associates, and the text changes each time.
      </p>
      <div className="mt-6">
        <TimedTest initialMinutes={minutes} initialTopic={topic} />
      </div>
    </div>
  );
}
