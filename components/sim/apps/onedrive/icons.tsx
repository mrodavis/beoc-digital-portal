"use client";

import type { OdKind, OdSync } from "./types";

/** Fluent-style line icons (20 x 20 grid). */
const PATHS: Record<string, string> = {
  home: "M3.5 9 10 3.5 16.5 9v7.5h-4.5v-5h-4v5H3.5z",
  folder: "M2.5 5.5a1 1 0 0 1 1-1h4l1.5 1.5h7.5a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1z",
  files: "M5 2.5h6.5l3.5 3.5v11.5H5zM11.5 2.5V6H15",
  people: "M7.5 9.5a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5zM2.5 16.5c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5M13.5 9.5a2.25 2.25 0 1 0 0-4.5M14.5 12.2c1.8.4 3 1.8 3 4.3",
  person: "M10 9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 17c0-3.1 2.7-5 6-5s6 1.9 6 5",
  star: "M10 2.8l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L2.8 8.1l5-.7z",
  trash: "M4 5.5h12M8 5.5V4h4v1.5M5.5 5.5l.8 11h7.4l.8-11M8.5 8.5v5.5M11.5 8.5v5.5",
  search: "M8.5 14a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM12.5 12.5l4.5 4.5",
  gear: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.5l1.3 1.8 2.2-.4.6 2.1 2 1-.8 2 .8 2-2 1-.6 2.1-2.2-.4L10 17.5l-1.3-1.8-2.2.4-.6-2.1-2-1 .8-2-.8-2 2-1 .6-2.1 2.2.4z",
  help: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM8 8a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.3v.4M10 14v.2",
  plus: "M10 4v12M4 10h12",
  upload: "M10 13V3.5M6.5 7 10 3.5 13.5 7M4 13v3.5h12V13",
  share: "M11.5 4.5 16 8.5l-4.5 4V10C8 10 5.5 11.5 4 14.5c.5-4 3-7 7.5-7.5z",
  link: "M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2l-1 1M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2l1-1",
  download: "M10 3.5V13M6.5 9.5 10 13l3.5-3.5M4 16.5h12",
  delete: "M4 5.5h12M8 5.5V4h4v1.5M5.5 5.5l.8 11h7.4l.8-11",
  move: "M3 10h11M10.5 6.5 14 10l-3.5 3.5M17 4v12",
  copy: "M7 7h9v9.5H7zM4 13V3.5h9",
  rename: "M3.5 16.5h3l8.5-8.5-3-3-8.5 8.5zM11 6l3 3",
  more: "M5 10h.01M10 10h.01M15 10h.01",
  info: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM10 9v5M10 6.2v.2",
  close: "M5 5l10 10M15 5 5 15",
  chevronRight: "M8 5l5 5-5 5",
  chevronDown: "M5 8l5 5 5-5",
  chevronLeft: "M12 5l-5 5 5 5",
  check: "M4.5 10.5 8 14l7.5-8",
  lock: "M5.5 9h9v8h-9zM7.5 9V6.5a2.5 2.5 0 0 1 5 0V9",
  unlock: "M5.5 9h9v8h-9zM7.5 9V6.5a2.5 2.5 0 0 1 4.8-1",
  history: "M3.5 10a6.5 6.5 0 1 0 2-4.7M3.5 3.5v3h3M10 6.5V10l2.5 2",
  restore: "M4 10a6 6 0 1 0 1.8-4.3M4 4v3h3",
  list: "M7 5.5h10M7 10h10M7 14.5h10M3.5 5.5h.01M3.5 10h.01M3.5 14.5h.01",
  tiles: "M3.5 3.5h5.5v5.5H3.5zM11 3.5h5.5v5.5H11zM3.5 11h5.5v5.5H3.5zM11 11h5.5v5.5H11z",
  sort: "M6 4v12M3 13l3 3 3-3M14 16V4M11 7l3-3 3 3",
  globe: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM2.5 10h15M10 2.5c2 2 3 4.6 3 7.5s-1 5.5-3 7.5c-2-2-3-4.6-3-7.5s1-5.5 3-7.5z",
  building: "M4 17V4.5h8V17M12 8h4v9M2.5 17h15M6.5 7h1M9 7h1M6.5 10h1M9 10h1M6.5 13h1M9 13h1",
  pen: "M3.5 16.5h3l8.5-8.5-3-3-8.5 8.5zM11 6l3 3",
  eye: "M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10zM10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  comment: "M3.5 4.5h13v9h-7l-4 3v-3h-2z",
  send: "M3 10 17 3.5 13 17l-3-5.5zM10 11.5 17 3.5",
  cloud: "M6 15.5a3.5 3.5 0 0 1-.4-7A4.5 4.5 0 0 1 14.3 7 3.5 3.5 0 0 1 14 15.5z",
  sync: "M15.5 8A6 6 0 0 0 4.7 6.5M4.5 3.5v3h3M4.5 12a6 6 0 0 0 10.8 1.5M15.5 16.5v-3h-3",
  pause: "M7 4.5v11M13 4.5v11",
  play: "M6.5 4.5l9 5.5-9 5.5z",
  shield: "M10 2.5 16 5v4.5c0 3.8-2.6 6.6-6 8-3.4-1.4-6-4.2-6-8V5z",
  calendar: "M3.5 5h13v11.5h-13zM3.5 8.5h13M7 3v3M13 3v3",
  image: "M3 4h14v12H3zM3 13l4-4 3 3 2.5-2.5L17 14M13 7.5h.01",
  video: "M3 5h10v10H3zM13 8.5l4-2.5v8l-4-2.5",
  back: "M16 10H4M9 5l-5 5 5 5",
  forward: "M4 10h12M11 5l5 5-5 5",
  refresh: "M15.5 8A6 6 0 1 0 16 11M16 4v4h-4",
  open: "M11 3.5h5.5V9M16.5 3.5 9 11M14 11.5v5H3.5V6h5",
  desktop: "M2.5 4h15v9.5h-15zM7 17h6M10 13.5V17",
  pc: "M2.5 4h15v9.5h-15zM7 17h6M10 13.5V17",
  documents: "M5 2.5h6.5l3.5 3.5v11.5H5zM7.5 10h5M7.5 13h5",
  pictures: "M3 4h14v12H3zM3 13l4-4 3 3 2.5-2.5L17 14",
  mail: "M2.5 5h15v10h-15zM2.5 5.5 10 11l7.5-5.5",
  filter: "M3 4.5h14l-5.5 6.5v5L8.5 17.5V11z",
  chat: "M3.5 4.5h13v9h-7l-4 3v-3h-2z",
  error: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM7.5 7.5l5 5M12.5 7.5l-5 5",
  waffle: "M4 4h2v2H4zM9 4h2v2H9zM14 4h2v2h-2zM4 9h2v2H4zM9 9h2v2H9zM14 9h2v2h-2zM4 14h2v2H4zM9 14h2v2H9zM14 14h2v2h-2z",
  shortcut: "M7 13c0-3 2-5 5.5-5H15M12.5 5 15.5 8l-3 3",
  key: "M7 13.5a3.5 3.5 0 1 1 3.2-4.9l6.3-.1v3h-2v2h-2.5v-2H10.2A3.5 3.5 0 0 1 7 13.5z",
  phone: "M6 2.5h8v15H6zM9 15h2",
  bell: "M5 13.5V9a5 5 0 0 1 10 0v4.5l1.5 1.5h-13zM8 16.5a2 2 0 0 0 4 0",
  word: "M4 3.5h12v13H4z",
  minimize: "M5 10h10",
  maximize: "M5 5h10v10H5z",
  edge: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z",
  activity: "M2.5 10h3l2-5 3 10 2-5h5",
  print: "M5.5 8V3.5h9V8M5.5 14h-2V8h13v6h-2M5.5 11.5h9v5h-9z",
  pin: "M12 3l5 5-2 1-3 3 .5 3.5L11 17l-3-3-4 4M8 14l-2-2 1.5-1.5L11 7l1-2",
};

export function OIcon({ name, size = 18, color = "currentColor", strokeWidth = 1.4, filled }: { name: string; size?: number; color?: string; strokeWidth?: number; filled?: boolean }) {
  const d = PATHS[name] ?? PATHS.info;
  const dots = name === "more" || name === "waffle";
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={filled ? color : "none"} stroke={color} strokeWidth={dots ? 2.4 : strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

const DOC_COLORS: Partial<Record<OdKind, { bg: string; letter: string }>> = {
  word: { bg: "#185abd", letter: "W" },
  excel: { bg: "#107c41", letter: "X" },
  powerpoint: { bg: "#c43e1c", letter: "P" },
  onenote: { bg: "#7719aa", letter: "N" },
};

/** File-type icon like the ones in OneDrive's list. */
export function FileIcon({ kind, size = 24, shared, shortcut }: { kind: OdKind; size?: number; shared?: boolean; shortcut?: boolean }) {
  if (kind === "folder" || kind === "vault") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <path d="M2 7.5A2.5 2.5 0 0 1 4.5 5h7.2l2.6 2.6h13.2A2.5 2.5 0 0 1 30 10.1v15.4a2.5 2.5 0 0 1-2.5 2.5h-23A2.5 2.5 0 0 1 2 25.5z" fill="#ffb900" />
        <path d="M2 11h28v14.5a2.5 2.5 0 0 1-2.5 2.5h-23A2.5 2.5 0 0 1 2 25.5z" fill="#ffd75e" />
        {kind === "vault" && <path d="M16 13.5l5 2v3.6c0 3-2.2 5.3-5 6.4-2.8-1.1-5-3.4-5-6.4v-3.6z" fill="#0f6cbd" />}
        {shared && kind === "folder" && (
          <g fill="#8a6100">
            <circle cx="13" cy="17.5" r="2.2" />
            <circle cx="19.5" cy="18" r="1.8" />
            <path d="M9 24.5c.3-2.6 2-4 4-4s3.7 1.4 4 4zM16.3 24.5c.4-2 1.6-3.1 3.2-3.1s2.8 1.1 3.1 3.1z" />
          </g>
        )}
        {shortcut && (
          <g>
            <rect x="2" y="20" width="10" height="10" rx="1.5" fill="#fff" stroke="#605e5c" strokeWidth="0.8" />
            <path d="M5 27c0-2.5 1.6-4 4-4h1M8.5 21.5 10.5 23l-2 1.6" fill="none" stroke="#0f6cbd" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </svg>
    );
  }
  const c = DOC_COLORS[kind];
  if (c) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9 3h14l6 6v19a1.5 1.5 0 0 1-1.5 1.5h-18A1.5 1.5 0 0 1 8 28V4.5A1.5 1.5 0 0 1 9 3z" fill="#fff" stroke="#c8c6c4" />
        <path d="M23 3v6h6" fill="#f3f2f1" stroke="#c8c6c4" />
        <rect x="2.5" y="10" width="15" height="15" rx="2" fill={c.bg} />
        <text x="10" y="21.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Segoe UI, Arial, sans-serif">{c.letter}</text>
      </svg>
    );
  }
  const color = kind === "pdf" ? "#d13438" : kind === "image" ? "#0078d4" : kind === "video" ? "#8764b8" : kind === "zip" ? "#986f0b" : "#605e5c";
  const label = kind === "pdf" ? "PDF" : kind === "zip" ? "ZIP" : kind === "text" ? "TXT" : "";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 3h14l6 6v19a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 7 28V4.5A1.5 1.5 0 0 1 8.5 3z" fill="#fff" stroke="#c8c6c4" />
      <path d="M21 3v6h6" fill="#f3f2f1" stroke="#c8c6c4" />
      {kind === "image" ? (
        <g>
          <rect x="10" y="13" width="13" height="10" rx="1" fill={color} opacity="0.2" />
          <path d="M10 21l4-4 3 3 2-2 4 4" fill="none" stroke={color} strokeWidth="1.4" />
          <circle cx="19.5" cy="15.8" r="1.2" fill={color} />
        </g>
      ) : kind === "video" ? (
        <path d="M13 13.5v9l7-4.5z" fill={color} />
      ) : (
        <text x="17" y="22" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={color} fontFamily="Segoe UI, Arial, sans-serif">{label}</text>
      )}
    </svg>
  );
}

/** Files On-Demand status icon in File Explorer's Status column. */
export function SyncIcon({ status, size = 16 }: { status?: OdSync; size?: number }) {
  if (status === "always") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" role="img" aria-label="Always available on this device">
        <circle cx="8" cy="8" r="7" fill="#107c10" />
        <path d="M4.8 8.3 7 10.4l4.3-4.6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "local") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" role="img" aria-label="Available on this device">
        <circle cx="8" cy="8" r="6.4" fill="#fff" stroke="#107c10" strokeWidth="1.3" />
        <path d="M4.9 8.3 7 10.3l4.1-4.4" fill="none" stroke="#107c10" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "syncing") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" role="img" aria-label="Sync pending">
        <path d="M13 6.5A5.2 5.2 0 0 0 3.6 5M3.4 2.6v2.7h2.7M3 9.5a5.2 5.2 0 0 0 9.4 1.5M12.6 13.4v-2.7H9.9" fill="none" stroke="#0f6cbd" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "error") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" role="img" aria-label="Sync problem">
        <circle cx="8" cy="8" r="7" fill="#c50f1f" />
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" role="img" aria-label="Available when online">
      <path d="M4.8 12.5a2.8 2.8 0 0 1-.3-5.6 3.7 3.7 0 0 1 7.1-1.1 2.8 2.8 0 0 1 .2 6.7z" fill="none" stroke="#0f6cbd" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

/** The OneDrive cloud logo. */
export function OneDriveLogo({ size = 24, mono }: { size?: number; mono?: string }) {
  return (
    <svg width={size} height={size * 0.68} viewBox="0 0 34 23" aria-hidden="true">
      <path d="M9.5 21.5h17.2a6 6 0 0 0 .6-12 8.5 8.5 0 0 0-15.9-2.2A6.8 6.8 0 0 0 9.5 21.5z" fill={mono ?? "#0364b8"} />
      {!mono && <path d="M9.5 21.5h17.2a6 6 0 0 0 .6-12 8.5 8.5 0 0 0-11.2-5.6l-3.5 9.2z" fill="#1490df" />}
      {!mono && <path d="M26.7 21.5a6 6 0 0 0 .6-12c-3.4 0-6 2.4-6.6 5.5L18 21.5z" fill="#28a8ea" />}
    </svg>
  );
}
