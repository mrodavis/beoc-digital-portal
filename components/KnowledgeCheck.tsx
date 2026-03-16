"use client";

import { useState } from "react";
import { ContentBlock } from "@/types/lesson";

type KnowledgeCheckBlock = Extract<
  ContentBlock,
  { type: "knowledge-check" }
>;

interface KnowledgeCheckProps {
  block: KnowledgeCheckBlock;
}

export default function KnowledgeCheck({ block }: KnowledgeCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="border rounded-xl p-6 bg-gray-50">

      <p className="font-semibold mb-4 text-lg">
        {block.question}
      </p>

      {block.options.map((option, index) => {

        const isCorrect = index === block.correctIndex;
        const isSelected = selected === index;

        return (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`block w-full text-left p-3 mb-2 rounded-lg border transition
              ${
                isSelected
                  ? isCorrect
                    ? "bg-green-200 border-green-400"
                    : "bg-red-200 border-red-400"
                  : "bg-white hover:bg-gray-100"
              }
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}