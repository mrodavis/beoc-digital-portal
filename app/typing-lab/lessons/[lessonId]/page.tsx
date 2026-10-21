import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LessonRunner from "@/components/typing-lab/LessonRunner";
import { LESSONS, lessonById } from "@/lib/typing-lab/lessons";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ lessonId: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ lessonId: string }> }): Promise<Metadata> {
  const { lessonId } = await params;
  const l = lessonById(lessonId);
  return { title: l ? `${l.title} · Typing Lab · BEOC Digital Skills Portal` : "Typing Lab" };
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  if (!lessonById(lessonId)) notFound();
  return <LessonRunner key={lessonId} lessonId={lessonId} />;
}
