import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TopicPageTemplate from "@/components/engl0150/TopicPageTemplate";
import {
  allTopics,
  getAdjacentTopics,
  getTopic,
} from "@/lib/content/engl0150/topics";
import { getSpiralLists, getWordList } from "@/lib/content/engl0150/wordLists";
import { isPending } from "@/components/engl0150/Pending";

/** All topic pages render from this one route. */
export function generateStaticParams() {
  return allTopics.map((t) => ({ number: String(t.number) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const topic = getTopic(Number(number));
  if (!topic) return { title: "Topic not found | ENGL0150" };
  return {
    title: `Topic ${topic.number}: ${topic.title} | ENGL0150`,
    description: isPending(topic.essentialQuestion)
      ? topic.title
      : topic.essentialQuestion,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const topic = getTopic(Number(number));
  if (!topic) return notFound();

  const { previous, next } = getAdjacentTopics(topic.number);
  const listNumber = isPending(topic.wordListNumber)
    ? undefined
    : topic.wordListNumber;

  return (
    <TopicPageTemplate
      topic={topic}
      wordList={listNumber ? getWordList(listNumber) : undefined}
      spiralLists={listNumber ? getSpiralLists(listNumber) : undefined}
      previous={previous}
      next={next}
    />
  );
}
