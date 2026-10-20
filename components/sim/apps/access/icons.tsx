"use client";

import type { ReactNode } from "react";

/** Access object icons (Navigation Pane, document tabs, field lists). 16×16 grid. */
const ICONS: Record<string, ReactNode> = {
  table: (
    <>
      <rect x="1.5" y="2.5" width="13" height="11" fill="#fff" stroke="#a4373a" />
      <rect x="1.5" y="2.5" width="13" height="3" fill="#a4373a" />
      <path d="M1.5 8.5h13M1.5 11h13M6 5.5v8M10.5 5.5v8" stroke="#a4373a" strokeWidth="0.8" />
    </>
  ),
  query: (
    <>
      <rect x="1.5" y="1.5" width="9" height="8" fill="#fff" stroke="#7a7a7a" />
      <rect x="1.5" y="1.5" width="9" height="2.2" fill="#7a7a7a" />
      <rect x="5.5" y="6" width="9" height="8.5" fill="#fff" stroke="#a4373a" />
      <rect x="5.5" y="6" width="9" height="2.4" fill="#a4373a" />
      <path d="M5.5 11h9M10 8.4v6" stroke="#a4373a" strokeWidth="0.8" />
    </>
  ),
  form: (
    <>
      <rect x="1.5" y="1.5" width="13" height="13" fill="#fff" stroke="#a4373a" />
      <rect x="1.5" y="1.5" width="13" height="3" fill="#a4373a" />
      <path d="M3.5 7h3M3.5 10h3M3.5 13h3" stroke="#555" strokeWidth="0.9" />
      <rect x="7.5" y="6" width="5.5" height="2" fill="#fff" stroke="#888" strokeWidth="0.7" />
      <rect x="7.5" y="9" width="5.5" height="2" fill="#fff" stroke="#888" strokeWidth="0.7" />
    </>
  ),
  report: (
    <>
      <path d="M3 1.5h7l3 3v10H3z" fill="#fff" stroke="#a4373a" />
      <path d="M10 1.5v3h3" fill="none" stroke="#a4373a" />
      <path d="M5 6.5h6M5 8.5h6M5 10.5h6M5 12.5h4" stroke="#777" strokeWidth="0.9" />
    </>
  ),
  macro: (
    <>
      <rect x="1.5" y="2.5" width="13" height="11" rx="1" fill="#fff" stroke="#a4373a" />
      <path d="M4 6l2.5 2L4 10M7.5 10.5h4" stroke="#a4373a" strokeWidth="1.3" fill="none" />
    </>
  ),
  module: (
    <>
      <rect x="2.5" y="1.5" width="11" height="13" fill="#fff" stroke="#3a6ea5" />
      <path d="M5 5h6M5 7.5h4M6 10h5M5 12.5h3" stroke="#3a6ea5" strokeWidth="0.9" />
    </>
  ),
  key: (
    <>
      <circle cx="5" cy="8" r="3" fill="none" stroke="#c8a400" strokeWidth="1.6" />
      <path d="M8 8h6.5M12 8v2.5M14 8v2" stroke="#c8a400" strokeWidth="1.6" />
    </>
  ),
  relationships: (
    <>
      <rect x="1" y="2" width="6" height="7" fill="#fff" stroke="#a4373a" />
      <rect x="9" y="7" width="6" height="7" fill="#fff" stroke="#a4373a" />
      <path d="M7 5h1.5v6H9" fill="none" stroke="#333" />
    </>
  ),
  documenter: (
    <>
      <path d="M3 1.5h7l3 3v10H3z" fill="#fff" stroke="#555" />
      <path d="M5 6h6M5 8h6M5 10h6" stroke="#999" />
    </>
  ),
  pencil: <path d="M3 13l1-3 7-7 2 2-7 7z" fill="#555" />,
  arrow: <path d="M5 3l6 5-6 5z" fill="#333" />,
  star: <text x="8" y="13" textAnchor="middle" fontSize="13" fill="#333">*</text>,
  search: (
    <>
      <circle cx="6.5" cy="6.5" r="4" fill="none" stroke="#555" strokeWidth="1.4" />
      <path d="M9.5 9.5l4 4" stroke="#555" strokeWidth="1.6" />
    </>
  ),
  chevronDown: <path d="M4 6l4 4 4-4" fill="none" stroke="#444" strokeWidth="1.4" />,
  chevronUp: <path d="M4 10l4-4 4 4" fill="none" stroke="#444" strokeWidth="1.4" />,
  chevronLeft: <path d="M10 3l-5 5 5 5" fill="none" stroke="#444" strokeWidth="1.4" />,
  doubleLeft: <path d="M8 3l-5 5 5 5M13 3l-5 5 5 5" fill="none" stroke="#444" strokeWidth="1.3" />,
  doubleRight: <path d="M3 3l5 5-5 5M8 3l5 5-5 5" fill="none" stroke="#444" strokeWidth="1.3" />,
  first: <path d="M4 3v10M12 3l-6 5 6 5z" fill="#555" stroke="#555" />,
  prev: <path d="M11 3l-6 5 6 5z" fill="#555" />,
  next: <path d="M5 3l6 5-6 5z" fill="#555" />,
  last: <path d="M12 3v10M4 3l6 5-6 5z" fill="#555" stroke="#555" />,
  newRec: (
    <>
      <path d="M2 3l6 5-6 5z" fill="#555" />
      <text x="12" y="10" textAnchor="middle" fontSize="11" fill="#555">*</text>
    </>
  ),
  filter: <path d="M2 3h12l-4.5 5v5l-3-1.5V8z" fill="#fff" stroke="#555" />,
  filterOn: <path d="M2 3h12l-4.5 5v5l-3-1.5V8z" fill="#4472c4" stroke="#2f5597" />,
  close: <path d="M4 4l8 8M12 4l-8 8" stroke="#444" strokeWidth="1.4" />,
  warning: (
    <>
      <path d="M8 1.5l7 13H1z" fill="#ffd94a" stroke="#c89b00" />
      <path d="M8 6v4" stroke="#333" strokeWidth="1.6" />
      <circle cx="8" cy="12" r="0.9" fill="#333" />
    </>
  ),
  info: (
    <>
      <circle cx="8" cy="8" r="7" fill="#2b7cd3" />
      <path d="M8 7v5" stroke="#fff" strokeWidth="1.8" />
      <circle cx="8" cy="4.6" r="1" fill="#fff" />
    </>
  ),
  error: (
    <>
      <circle cx="8" cy="8" r="7" fill="#d13438" />
      <path d="M5 5l6 6M11 5l-6 6" stroke="#fff" strokeWidth="1.8" />
    </>
  ),
  question: (
    <>
      <circle cx="8" cy="8" r="7" fill="#2b7cd3" />
      <text x="8" y="11.8" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">?</text>
    </>
  ),
  run: <path d="M4 2.5l9 5.5-9 5.5z" fill="#2e8b3d" />,
  stop: <rect x="4" y="4" width="8" height="8" fill="#1f4e79" />,
  pause: <path d="M4.5 3v10M11.5 3v10" stroke="#1f4e79" strokeWidth="2.6" />,
  folder: <path d="M1.5 4.5h5l1.5 1.5h6.5v7.5h-13z" fill="#f8d775" stroke="#c9a227" />,
  folderOpen: <path d="M1.5 4h5l1.5 1.5h6v2H4l-2.5 6z" fill="#f8d775" stroke="#c9a227" />,
  excel: (
    <>
      <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" fill="#1d6f42" />
      <path d="M5 5l6 6M11 5l-6 6" stroke="#fff" strokeWidth="1.6" />
    </>
  ),
  pdf: (
    <>
      <path d="M3 1.5h7l3 3v10H3z" fill="#fff" stroke="#d13438" />
      <rect x="2" y="8" width="9" height="4.5" fill="#d13438" />
      <text x="6.5" y="11.6" textAnchor="middle" fontSize="3.6" fontWeight="700" fill="#fff">PDF</text>
    </>
  ),
  text: (
    <>
      <path d="M3 1.5h7l3 3v10H3z" fill="#fff" stroke="#666" />
      <path d="M5 6h6M5 8h6M5 10h4" stroke="#999" />
    </>
  ),
  accdb: (
    <>
      <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" fill="#a4373a" />
      <text x="8" y="11.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">A</text>
    </>
  ),
  plus: <path d="M8 3v10M3 8h10" stroke="#2e8b3d" strokeWidth="1.8" />,
  dots: <path d="M3.5 8h.01M8 8h.01M12.5 8h.01" stroke="#444" strokeWidth="2.4" strokeLinecap="round" />,
  check: <path d="M3 8.5l3 3 7-7" stroke="#222" strokeWidth="1.8" fill="none" />,
  calendar: (
    <>
      <rect x="2" y="3" width="12" height="11" fill="#fff" stroke="#666" />
      <rect x="2" y="3" width="12" height="3" fill="#a4373a" />
      <path d="M5 2v2.5M11 2v2.5" stroke="#555" />
    </>
  ),
};

export function AccIcon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" className={`shrink-0 ${className ?? ""}`}>
      {ICONS[name] ?? <rect x="2" y="2" width="12" height="12" fill="#eee" stroke="#aaa" />}
    </svg>
  );
}
