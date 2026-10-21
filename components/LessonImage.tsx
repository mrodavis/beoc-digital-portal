"use client";

import { useState } from "react";

/**
 * A lesson picture. If the file is missing, the figure is left out rather than
 * showing a broken-image icon and orphaned caption.
 */
export default function LessonImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="rounded-xl border border-gray-200 shadow-sm" />
      {caption && <figcaption className="text-sm text-gray-500 mt-2 italic">{caption}</figcaption>}
    </figure>
  );
}
