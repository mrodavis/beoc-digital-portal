import type { Metadata } from "next";
import LessonList from "@/components/typing-lab/LessonList";

export const metadata: Metadata = {
  title: "Key Lessons · Typing Lab · BEOC Digital Skills Portal",
  description: "Learn touch typing key by key: home row, top row, bottom row, numbers, then Shift and punctuation.",
};

export default function LessonsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Key lessons</h1>
      <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-700">
        Learn the keyboard a few keys at a time, in the order touch typists learn it. Each lesson has three short drills that use only the keys you have learned so far. A wrong key does not move you forward, and a drill passes at 95% accuracy, because accuracy comes before speed.
      </p>
      <div className="mt-8">
        <LessonList />
      </div>
    </div>
  );
}
