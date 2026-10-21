"use client";

import { useState } from "react";

/**
 * A small single-series line chart (one measure per chart, one y-axis).
 * Hovering a point shows its value; the same numbers are in the table view
 * on the progress page, so nothing depends on the picture alone.
 */
export default function LineChart({
  title,
  values,
  labels,
  yMin,
  yMax,
  unit,
  color = "#1d4ed8",
}: {
  title: string;
  values: number[];
  labels: string[];
  yMin: number;
  yMax: number;
  unit: string;
  color?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 600;
  const H = 220;
  const pad = { l: 44, r: 16, t: 16, b: 30 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const n = values.length;
  const x = (i: number) => pad.l + (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = (v: number) => pad.t + ih - ((Math.min(yMax, Math.max(yMin, v)) - yMin) / (yMax - yMin || 1)) * ih;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(yMin + f * (yMax - yMin)));
  const path = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  return (
    <figure className="rounded-xl border border-gray-200 bg-white p-4">
      <figcaption className="mb-2 font-semibold text-gray-900">{title}</figcaption>
      {n === 0 ? (
        <p className="py-8 text-center text-gray-700">Take a timed test to start this chart.</p>
      ) : (
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true" onMouseLeave={() => setHover(null)}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#e5e7eb" strokeWidth={1} />
              <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#4b5563">
                {t}
              </text>
            </g>
          ))}
          <line x1={pad.l} x2={W - pad.r} y1={pad.t + ih} y2={pad.t + ih} stroke="#9ca3af" strokeWidth={1} />
          <text x={pad.l} y={H - 8} fontSize={12} fill="#4b5563">
            {labels[0]}
          </text>
          {n > 1 && (
            <text x={W - pad.r} y={H - 8} fontSize={12} fill="#4b5563" textAnchor="end">
              {labels[n - 1]}
            </text>
          )}
          {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t + ih} stroke="#9ca3af" strokeDasharray="4 4" />}
          <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {values.map((v, i) => (
            <g key={i} onMouseEnter={() => setHover(i)}>
              <circle cx={x(i)} cy={y(v)} r={14} fill="transparent" />
              <circle cx={x(i)} cy={y(v)} r={hover === i ? 6 : 4.5} fill={color} stroke="#fff" strokeWidth={2} />
            </g>
          ))}
          {hover !== null && (
            <g transform={`translate(${Math.min(W - pad.r - 150, Math.max(pad.l, x(hover) - 75))}, ${Math.max(2, y(values[hover]) - 52)})`}>
              <rect width={150} height={40} rx={6} fill="#111827" />
              <text x={10} y={17} fontSize={12} fill="#d1d5db">
                {labels[hover]}
              </text>
              <text x={10} y={33} fontSize={14} fontWeight={700} fill="#ffffff">
                {values[hover]}
                {unit}
              </text>
            </g>
          )}
        </svg>
      )}
    </figure>
  );
}
