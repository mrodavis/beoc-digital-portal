"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
}

export default function Slideshow({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setCurrent((i) => Math.min(slides.length - 1, i + 1)),
    [slides.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-950 select-none">
      {/* Slide image */}
      <div className="relative aspect-video">
        <Image
          src={slides[current].src}
          alt={slides[current].alt}
          fill
          className="object-contain"
          priority={current === 0}
        />

        {/* Prev button */}
        {current > 0 && (
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg transition-colors"
          >
            ←
          </button>
        )}

        {/* Next button */}
        {current < slides.length - 1 && (
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg transition-colors"
          >
            →
          </button>
        )}
      </div>

      {/* Footer: dots + counter */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-t border-gray-200">
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all ${
                i === current
                  ? "w-4 h-2 bg-primary-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <span className="text-sm text-gray-500 font-medium">
          {current + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}
