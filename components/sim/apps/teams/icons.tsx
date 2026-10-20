/* Fluent-style outline glyphs for the Teams mock (20×20 viewBox, currentColor). */

const P: Record<string, React.ReactNode> = {
  activity: <path d="M10 2.8a4.6 4.6 0 0 0-4.6 4.6v3.2L4 13.2h12l-1.4-2.6V7.4A4.6 4.6 0 0 0 10 2.8ZM8 15.4a2 2 0 0 0 4 0" />,
  chat: <path d="M10 3c-4 0-7 2.6-7 6 0 1.6.7 3.1 2 4.2L4.4 16.6l3.4-1.6c.7.2 1.4.3 2.2.3 4 0 7-2.6 7-6S14 3 10 3Z" />,
  teams: (
    <>
      <circle cx="7.5" cy="7" r="2.6" />
      <circle cx="14" cy="7.6" r="2" />
      <path d="M2.8 16c.3-2.8 2.2-4.5 4.7-4.5s4.4 1.7 4.7 4.5M13 11.6c2.3-.2 4 1.2 4.3 3.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="14" height="13" rx="2" />
      <path d="M3 8h14M7 2.5v3M13 2.5v3" />
    </>
  ),
  calls: <path d="M6.2 3.2 4.4 3.6c-.8.2-1.3 1-1.2 1.8.6 5.6 5 10 10.6 10.6.8.1 1.6-.4 1.8-1.2l.4-1.8c.1-.5-.1-1-.6-1.2l-2.4-1.1c-.4-.2-.9-.1-1.2.2l-1 1.1a8 8 0 0 1-4-4l1.1-1c.3-.3.4-.8.2-1.2L7.4 3.8c-.2-.5-.7-.7-1.2-.6Z" />,
  onedrive: <path d="M5.6 15.5h9.6a3 3 0 0 0 .4-6 4.4 4.4 0 0 0-8.4-1.2A3.6 3.6 0 0 0 5.6 15.5Z" />,
  apps: (
    <>
      <rect x="3" y="3" width="5.5" height="5.5" rx="1" />
      <rect x="11.5" y="3" width="5.5" height="5.5" rx="1" />
      <rect x="3" y="11.5" width="5.5" height="5.5" rx="1" />
      <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1" />
    </>
  ),
  more: (
    <>
      <circle cx="4.5" cy="10" r="1.1" fill="currentColor" />
      <circle cx="10" cy="10" r="1.1" fill="currentColor" />
      <circle cx="15.5" cy="10" r="1.1" fill="currentColor" />
    </>
  ),
  search: (
    <>
      <circle cx="8.5" cy="8.5" r="5" />
      <path d="m12.3 12.3 4.5 4.5" />
    </>
  ),
  newchat: <path d="M9 4H5.5A2.5 2.5 0 0 0 3 6.5v8A2.5 2.5 0 0 0 5.5 17h8a2.5 2.5 0 0 0 2.5-2.5V11M14.6 3.2a1.6 1.6 0 0 1 2.2 2.2L10 12.2l-3 .8.8-3 6.8-6.8Z" />,
  filter: <path d="M3.5 5h13M6 10h8M8.5 15h3" />,
  video: (
    <>
      <rect x="2.5" y="5.5" width="10.5" height="9" rx="2" />
      <path d="m13 9 4.5-2.6v7.2L13 11" />
    </>
  ),
  videoOff: (
    <>
      <path d="M13 9.5v-2a2 2 0 0 0-2-2H7.5M4 5.8a2 2 0 0 0-1.5 1.9v4.8a2 2 0 0 0 2 2H11a2 2 0 0 0 1.7-1M13 9l4.5-2.6v7.2L14 11.6M2.5 2.5l15 15" />
    </>
  ),
  addPeople: (
    <>
      <circle cx="8" cy="7" r="3" />
      <path d="M2.5 16.5c.4-3 2.6-4.8 5.5-4.8 1 0 1.9.2 2.6.6M15 11v6M12 14h6" />
    </>
  ),
  send: <path d="M3 10 17 3.5l-3.4 13L10 11.2 3 10Zm7 1.2 7-7.7" />,
  format: (
    <>
      <path d="m3 15 4-11h1.4l4 11M4.6 11h6" />
      <path d="M13.4 16.5 17 12.9a1.2 1.2 0 0 0-1.7-1.7l-3.6 3.6-.5 2.2 2.2-.5Z" />
    </>
  ),
  emoji: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M7 12c.7 1 1.8 1.6 3 1.6s2.3-.6 3-1.6" />
      <circle cx="7.5" cy="8.3" r=".8" fill="currentColor" />
      <circle cx="12.5" cy="8.3" r=".8" fill="currentColor" />
    </>
  ),
  attach: <path d="m15.5 9.2-5.8 5.9a3.4 3.4 0 0 1-4.8-4.8l6.2-6.2a2.3 2.3 0 0 1 3.2 3.2l-6 6a1.1 1.1 0 0 1-1.6-1.6l5.4-5.4" />,
  plus: <path d="M10 4v12M4 10h12" />,
  mic: (
    <>
      <rect x="7.2" y="2.8" width="5.6" height="9.4" rx="2.8" />
      <path d="M4.6 9.6a5.4 5.4 0 0 0 10.8 0M10 15v2.4" />
    </>
  ),
  micOff: (
    <>
      <path d="M12.8 9.4V5.6a2.8 2.8 0 0 0-5.3-1.3M7.2 7.4v2.2a2.8 2.8 0 0 0 4.6 2.1M4.6 9.6a5.4 5.4 0 0 0 9 4M15.4 9.6c0 .7-.1 1.3-.4 1.9M10 15v2.4M3 3l14 14" />
    </>
  ),
  share: (
    <>
      <rect x="2.5" y="4" width="15" height="11" rx="2" />
      <path d="M10 12.5V7.2M7.6 9.4 10 7l2.4 2.4" />
    </>
  ),
  hand: <path d="M7 10.5V4.8a1.2 1.2 0 0 1 2.4 0V9.5M9.4 9V3.7a1.2 1.2 0 0 1 2.4 0V9M11.8 9.3V5a1.2 1.2 0 0 1 2.4 0v6.5c0 3.2-2 5.5-5 5.5-2 0-3.2-1-4.2-2.6L3.4 11.6a1.2 1.2 0 0 1 2-1.3L7 12.3" />,
  react: (
    <>
      <circle cx="9" cy="10" r="6.5" />
      <path d="M6.3 11.6c.6.9 1.6 1.4 2.7 1.4s2.1-.5 2.7-1.4" />
      <circle cx="6.9" cy="8.4" r=".7" fill="currentColor" />
      <circle cx="11.1" cy="8.4" r=".7" fill="currentColor" />
    </>
  ),
  leave: <path d="M2.8 11.3c3.9-3.9 10.5-3.9 14.4 0 .4.4.4 1 0 1.4l-1.4 1.3c-.4.4-1 .4-1.4 0l-1.3-1.2a1 1 0 0 1-.2-1.1l.5-1.2a9.1 9.1 0 0 0-4.8 0l.5 1.2c.2.4.1.8-.2 1.1L7.6 14c-.4.4-1 .4-1.4 0l-1.4-1.3a1 1 0 0 1 0-1.4Z" />,
  people: (
    <>
      <circle cx="7.5" cy="7" r="2.8" />
      <path d="M2.5 16.5c.3-3 2.3-4.8 5-4.8s4.7 1.8 5 4.8M13 4.6a2.6 2.6 0 0 1 0 5M14.6 12c1.6.6 2.6 2.2 2.9 4.5" />
    </>
  ),
  record: (
    <>
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="3.2" fill="currentColor" />
    </>
  ),
  cc: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M8.6 8.4a2 2 0 1 0 0 3.2M14 8.4a2 2 0 1 0 0 3.2" />
    </>
  ),
  gear: (
    <>
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" />
    </>
  ),
  check: <path d="m4 10.5 3.8 3.8L16 6" />,
  chevronDown: <path d="m5 7.5 5 5 5-5" />,
  chevronRight: <path d="m7.5 5 5 5-5 5" />,
  chevronLeft: <path d="m12.5 5-5 5 5 5" />,
  chevronUp: <path d="m5 12.5 5-5 5 5" />,
  pin: <path d="m12.2 2.8 5 5-2.4 1.2-2.6 2.6-.4 3.6-1.2 1.2-2.6-2.6-4 4M7.9 13.1 5 10.2l1.2-1.2 3.6-.4 2.6-2.6 1.2-2.4" />,
  reply: <path d="M8 5 3.5 9.5 8 14M3.5 9.5H12c2.5 0 4.5 2 4.5 4.5v1" />,
  edit: <path d="M13.6 3.4a1.8 1.8 0 0 1 2.6 2.6L7 15.2l-3.5.9.9-3.5 9.2-9.2Z" />,
  trash: <path d="M3.5 5.5h13M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M5 5.5l.8 10.6a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L15 5.5" />,
  bookmark: <path d="M5.5 3.5h9v13.5L10 13.6 5.5 17V3.5Z" />,
  link: <path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2L10 5.8M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2L10 14.2" />,
  forward: <path d="M12 5l4.5 4.5L12 14M16.5 9.5H8c-2.5 0-4.5 2-4.5 4.5v1" />,
  close: <path d="m5 5 10 10M15 5 5 15" />,
  info: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 9v4.5M10 6.5v.1" />
    </>
  ),
  upload: <path d="M10 13V3.5M6.5 7 10 3.5 13.5 7M3.5 13.5v1.5A1.5 1.5 0 0 0 5 16.5h10a1.5 1.5 0 0 0 1.5-1.5v-1.5" />,
  download: <path d="M10 3.5V13M6.5 9.5 10 13l3.5-3.5M3.5 13.5v1.5A1.5 1.5 0 0 0 5 16.5h10a1.5 1.5 0 0 0 1.5-1.5v-1.5" />,
  folder: <path d="M2.5 6A1.5 1.5 0 0 1 4 4.5h3.6l1.6 1.8H16A1.5 1.5 0 0 1 17.5 7.8v6.7A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5V6Z" />,
  back: <path d="M16 10H4.5M9 5 4 10l5 5" />,
  fwd: <path d="M4 10h11.5M11 5l5 5-5 5" />,
  sparkle: <path d="M10 2.5c.6 3.6 1.9 4.9 5.5 5.5-3.6.6-4.9 1.9-5.5 5.5-.6-3.6-1.9-4.9-5.5-5.5 3.6-.6 4.9-1.9 5.5-5.5ZM15.5 13c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />,
  bold: <path d="M6 4h5a3 3 0 0 1 0 6H6V4Zm0 6h5.8a3 3 0 0 1 0 6H6v-6Z" strokeWidth="1.8" />,
  italic: <path d="M9 4h6M5 16h6M12 4 8 16" />,
  underline: <path d="M6 4v5.5a4 4 0 0 0 8 0V4M5 17h10" />,
  strike: <path d="M4 10h12M13.5 6.2C13 4.9 11.7 4 10 4 7.8 4 6.4 5.2 6.4 6.8M6.6 13.6c.5 1.5 1.9 2.4 3.7 2.4 2.2 0 3.6-1.2 3.6-2.8" />,
  bullets: (
    <>
      <circle cx="4.5" cy="5.5" r="1" fill="currentColor" />
      <circle cx="4.5" cy="10" r="1" fill="currentColor" />
      <circle cx="4.5" cy="14.5" r="1" fill="currentColor" />
      <path d="M8 5.5h8.5M8 10h8.5M8 14.5h8.5" />
    </>
  ),
  numbers: <path d="M8 5.5h8.5M8 10h8.5M8 14.5h8.5M3.5 4.2l1.2-.7V7.4M3.2 12.3c.2-.5.7-.8 1.3-.8.7 0 1.2.4 1.2 1s-.5 1-1.2 1.6l-1.2 1h2.4" />,
  important: <path d="M10 3.5v9M10 15.8v.4" strokeWidth="2" />,
  speaker: <path d="M3.5 7.5h3L10.5 4v12l-4-3.5h-3v-5ZM13.5 7.2a4 4 0 0 1 0 5.6M15.6 5a7 7 0 0 1 0 10" />,
  blur: (
    <>
      <circle cx="10" cy="7" r="3" />
      <path d="M4.5 16.5c.4-3 2.6-4.8 5.5-4.8s5.1 1.8 5.5 4.8" />
      <circle cx="3.5" cy="4" r=".7" fill="currentColor" />
      <circle cx="16.5" cy="4" r=".7" fill="currentColor" />
      <circle cx="3" cy="10" r=".7" fill="currentColor" />
      <circle cx="17" cy="10" r=".7" fill="currentColor" />
    </>
  ),
  effects: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 17c.4-3 2.6-4.8 5.5-4.8 1.3 0 2.5.4 3.4 1M15.5 2.5c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />
    </>
  ),
  bellOff: <path d="M6 6.2a4.6 4.6 0 0 0-.6 2.2v3L4 14h9.5M14.6 11.4V8.4A4.6 4.6 0 0 0 7.6 4.5M8 15.4a2 2 0 0 0 4 0M3 3l14 14" />,
  eyeOff: <path d="M3 3l14 14M8.2 5.2A8 8 0 0 1 10 5c4 0 6.6 3 7.5 5-.4.8-1 1.8-1.9 2.6M5.6 6.6C4.1 7.6 3 9 2.5 10c.9 2 3.5 5 7.5 5 1.5 0 2.8-.4 3.9-1M8.5 8.6a2 2 0 0 0 2.9 2.9" />,
  unread: (
    <>
      <rect x="2.5" y="5" width="12.5" height="10" rx="1.8" />
      <path d="m3 6 6.2 4.6L13 7.8" />
      <circle cx="16" cy="5" r="2.2" fill="currentColor" />
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4.2l2.8 1.8" />
    </>
  ),
  location: (
    <>
      <path d="M10 17.5s-5.5-5-5.5-9a5.5 5.5 0 0 1 11 0c0 4-5.5 9-5.5 9Z" />
      <circle cx="10" cy="8.5" r="2" />
    </>
  ),
  repeat: <path d="M4 9V8a3 3 0 0 1 3-3h9M13.5 2.5 16 5l-2.5 2.5M16 11v1a3 3 0 0 1-3 3H4M6.5 17.5 4 15l2.5-2.5" />,
  copy: (
    <>
      <rect x="6.5" y="6.5" width="10" height="10" rx="1.6" />
      <path d="M13.5 6.5V5A1.5 1.5 0 0 0 12 3.5H5A1.5 1.5 0 0 0 3.5 5v7A1.5 1.5 0 0 0 5 13.5h1.5" />
    </>
  ),
  view: (
    <>
      <rect x="2.5" y="4" width="6.5" height="5" rx="1" />
      <rect x="11" y="4" width="6.5" height="5" rx="1" />
      <rect x="2.5" y="11" width="6.5" height="5" rx="1" />
      <rect x="11" y="11" width="6.5" height="5" rx="1" />
    </>
  ),
  rooms: (
    <>
      <rect x="2.5" y="3.5" width="15" height="13" rx="2" />
      <path d="M10 3.5v13M2.5 10h15" />
    </>
  ),
  door: <path d="M5 17V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13M3 17h14M12 10v.5" />,
  shield: <path d="M10 2.8 4 5v4.6c0 3.6 2.6 6.6 6 7.6 3.4-1 6-4 6-7.6V5l-6-2.2Z" />,
  headset: <path d="M4 12V9.5a6 6 0 0 1 12 0V12M4 11.5h2.2v4.5H4.6a.6.6 0 0 1-.6-.6v-3.9Zm12 0h-2.2v4.5h1.6a.6.6 0 0 0 .6-.6v-3.9ZM13.8 16c0 1-1.3 1.5-3 1.5" />,
  monitor: (
    <>
      <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" />
      <path d="M7 17h6M10 13.5V17" />
    </>
  ),
  window: (
    <>
      <rect x="2.5" y="3.5" width="15" height="13" rx="1.5" />
      <path d="M2.5 7h15" />
    </>
  ),
  whiteboard: <path d="M3 4.5h14v9H3zM7 17l3-3.5 3 3.5M5.5 10.5c1.5-2 3-2 4 0s2.5 2 4.5-1" />,
  lock: (
    <>
      <rect x="4.5" y="8.5" width="11" height="8.5" rx="1.5" />
      <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3c2 2 2.8 4.4 2.8 7S12 15 10 17c-2-2-2.8-4.4-2.8-7S8 5 10 3Z" />
    </>
  ),
  note: <path d="M5 3.5h7l3.5 3.5v9.5H5V3.5Zm7 0V7h3.5M7.5 10.5h5M7.5 13.5h5" />,
  star: <path d="m10 3 2.1 4.4 4.8.6-3.5 3.3.9 4.8L10 13.8l-4.3 2.3.9-4.8L3.1 8l4.8-.6L10 3Z" />,
  home: <path d="M3.5 9 10 3.5 16.5 9v7a1 1 0 0 1-1 1h-3.5v-5h-4v5H4.5a1 1 0 0 1-1-1V9Z" />,
  minimize: <path d="M5 10h10" />,
  maximize: <rect x="5" y="5" width="10" height="10" rx="1" />,
  popout: <path d="M11 3.5h5.5V9M16.5 3.5 9.5 10.5M14 12v3a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 4 15V7.5A1.5 1.5 0 0 1 5.5 6H8" />,
};

export function TIcon({ name, size = 20, className, strokeWidth = 1.4 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {P[name] ?? <circle cx="10" cy="10" r="6" />}
    </svg>
  );
}

/** Office-style file type tile. */
export function FileIcon({ name, size = 28 }: { name: string; size?: number }) {
  const ext = (/\.([a-z0-9]+)$/i.exec(name)?.[1] ?? "").toLowerCase();
  const map: Record<string, [string, string]> = {
    docx: ["#185abd", "W"],
    doc: ["#185abd", "W"],
    xlsx: ["#107c41", "X"],
    xls: ["#107c41", "X"],
    csv: ["#107c41", "X"],
    pptx: ["#c43e1c", "P"],
    pdf: ["#d13438", "PDF"],
    png: ["#8764b8", "IMG"],
    jpg: ["#8764b8", "IMG"],
    txt: ["#605e5c", "TXT"],
    mp4: ["#8764b8", "MP4"],
  };
  const [color, label] = map[ext] ?? ["#605e5c", ext.toUpperCase().slice(0, 3) || "FILE"];
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center rounded-[3px] font-bold text-white shadow-sm" style={{ width: size * 0.8, height: size, background: color, fontSize: label.length > 1 ? size * 0.28 : size * 0.45 }} aria-hidden="true">
      {label}
    </span>
  );
}

export function FolderIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <path d="M2 7a2 2 0 0 1 2-2h7l2.5 2.5H24a2 2 0 0 1 2 2V22a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z" fill="#ffb900" />
      <path d="M2 10h24v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10Z" fill="#ffd75e" />
    </svg>
  );
}
