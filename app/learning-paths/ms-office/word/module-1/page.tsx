import Link from "next/link";
import { wordModule1Lessons } from "@/lib/content/ms-office/word/lessons";

export default function Module1Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6">
        Module 1: Introduction to Word 2019
      </h1>

      <div className="space-y-4">
        {wordModule1Lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/learning-paths/ms-office/word/module-1/${lesson.slug}`}
            className="block bg-white border rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-lg">
                  {index + 1}. {lesson.title}
                </div>
                <p className="text-gray-600 text-sm">
                  {lesson.description}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {lesson.duration}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
