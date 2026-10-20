/* Fluent-style outline glyphs for the Copilot / Power Automate mock (20×20 viewBox). */

const P: Record<string, React.ReactNode> = {
  sparkle: <path d="M10 2.5c.6 3.6 1.9 4.9 5.5 5.5-3.6.6-4.9 1.9-5.5 5.5-.6-3.6-1.9-4.9-5.5-5.5 3.6-.6 4.9-1.9 5.5-5.5ZM15.5 13c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />,
  plus: <path d="M10 4v12M4 10h12" />,
  send: <path d="M10 16V4M5 9l5-5 5 5" />,
  attach: <path d="m15.5 9.2-5.8 5.9a3.4 3.4 0 0 1-4.8-4.8l6.2-6.2a2.3 2.3 0 0 1 3.2 3.2l-6 6a1.1 1.1 0 0 1-1.6-1.6l5.4-5.4" />,
  copy: (
    <>
      <rect x="6.5" y="6.5" width="10" height="10" rx="1.6" />
      <path d="M13.5 6.5V5A1.5 1.5 0 0 0 12 3.5H5A1.5 1.5 0 0 0 3.5 5v7A1.5 1.5 0 0 0 5 13.5h1.5" />
    </>
  ),
  edit: <path d="M13.6 3.4a1.8 1.8 0 0 1 2.6 2.6L7 15.2l-3.5.9.9-3.5 9.2-9.2Z" />,
  regenerate: <path d="M16 10a6 6 0 1 1-1.8-4.3M16 3.5v3.2h-3.2" />,
  thumbUp: <path d="M6.5 9v7.5H4a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h2.5Zm0 0 3-5.5c1.2 0 2 .9 1.8 2.1L10.8 8.5h4.4a1.5 1.5 0 0 1 1.5 1.8l-1.1 5A1.5 1.5 0 0 1 14.1 16.5H6.5" />,
  thumbDown: <path d="M6.5 11V3.5H4a1 1 0 0 0-1 1V10a1 1 0 0 0 1 1h2.5Zm0 0 3 5.5c1.2 0 2-.9 1.8-2.1l-.5-2.9h4.4a1.5 1.5 0 0 0 1.5-1.8l-1.1-5A1.5 1.5 0 0 0 14.1 3.5H6.5" />,
  more: (
    <>
      <circle cx="4.5" cy="10" r="1.1" fill="currentColor" />
      <circle cx="10" cy="10" r="1.1" fill="currentColor" />
      <circle cx="15.5" cy="10" r="1.1" fill="currentColor" />
    </>
  ),
  close: <path d="m5 5 10 10M15 5 5 15" />,
  chat: <path d="M10 3c-4 0-7 2.6-7 6 0 1.6.7 3.1 2 4.2L4.4 16.6l3.4-1.6c.7.2 1.4.3 2.2.3 4 0 7-2.6 7-6S14 3 10 3Z" />,
  newchat: <path d="M9 4H5.5A2.5 2.5 0 0 0 3 6.5v8A2.5 2.5 0 0 0 5.5 17h8a2.5 2.5 0 0 0 2.5-2.5V11M14.6 3.2a1.6 1.6 0 0 1 2.2 2.2L10 12.2l-3 .8.8-3 6.8-6.8Z" />,
  gear: (
    <>
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" />
    </>
  ),
  shield: <path d="M10 2.8 4 5v4.6c0 3.6 2.6 6.6 6 7.6 3.4-1 6-4 6-7.6V5l-6-2.2ZM7.5 10l1.8 1.8L12.8 8.3" />,
  globe: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3c2 2 2.8 4.4 2.8 7S12 15 10 17c-2-2-2.8-4.4-2.8-7S8 5 10 3Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="6" width="14" height="10" rx="1.5" />
      <path d="M7.5 6V4.5A1 1 0 0 1 8.5 3.5h3a1 1 0 0 1 1 1V6M3 10.5h14" />
    </>
  ),
  flow: (
    <>
      <path d="M3 4.5h6l3 5.5-3 5.5H3l3-5.5-3-5.5Z" />
      <path d="M11 4.5h6l-3 5.5 3 5.5h-6" />
    </>
  ),
  home: <path d="M3.5 9 10 3.5 16.5 9v7a1 1 0 0 1-1 1h-3.5v-5h-4v5H4.5a1 1 0 0 1-1-1V9Z" />,
  templates: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </>
  ),
  list: <path d="M7 5.5h10M7 10h10M7 14.5h10M3.5 5.5h.1M3.5 10h.1M3.5 14.5h.1" />,
  play: <path d="M6 4v12l10-6L6 4Z" />,
  save: <path d="M4 3.5h9.5L16.5 6.5V16a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5ZM6.5 3.5v4h6v-4M6 16.5v-5h8v5" />,
  check: <path d="m4 10.5 3.8 3.8L16 6" />,
  chevronDown: <path d="m5 7.5 5 5 5-5" />,
  chevronRight: <path d="m7.5 5 5 5-5 5" />,
  search: (
    <>
      <circle cx="8.5" cy="8.5" r="5" />
      <path d="m12.3 12.3 4.5 4.5" />
    </>
  ),
  trash: <path d="M3.5 5.5h13M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M5 5.5l.8 10.6a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L15 5.5" />,
  file: <path d="M5 3.5h7l3.5 3.5v9.5H5V3.5Zm7 0V7h3.5" />,
  back: <path d="M16 10H4.5M9 5 4 10l5 5" />,
  info: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 9v4.5M10 6.5v.1" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="8.5" width="11" height="8.5" rx="1.5" />
      <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5" />
    </>
  ),
  prompts: <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H15v12H5.5A1.5 1.5 0 0 0 4 16.5v-12ZM4 16.5A1.5 1.5 0 0 0 5.5 18H15v-3M7.5 6.5h4.5M7.5 9h3" />,
  bolt: <path d="M11 2.5 4.5 11h5l-1 6.5L15.5 9h-5l.5-6.5Z" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="m3 5.5 7 5 7-5" />
    </>
  ),
  word: <rect x="3.5" y="3.5" width="13" height="13" rx="2" />,
  upload: <path d="M10 13V3.5M6.5 7 10 3.5 13.5 7M3.5 13.5v1.5A1.5 1.5 0 0 0 5 16.5h10a1.5 1.5 0 0 0 1.5-1.5v-1.5" />,
  warning: <path d="M10 3 2.5 16.5h15L10 3ZM10 8v4M10 14.2v.1" />,
  link: <path d="M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2L10 5.8M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2L10 14.2" />,
  approvals: <path d="M4 10.5 7.8 14.3 16 6M3 4h6M3 7h4" />,
  power: <path d="M10 3v7M6 5.5a6 6 0 1 0 8 0" />,
};

export function AIcon({ name, size = 20, className, strokeWidth = 1.4 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {P[name] ?? <circle cx="10" cy="10" r="6" />}
    </svg>
  );
}

/** The Copilot mark: a soft gradient sparkle tile. */
export function CopilotMark({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[30%] text-white shadow-sm" style={{ width: size, height: size, background: "conic-gradient(from 200deg at 50% 50%, #2b88d8, #7f5af0, #e3008c, #f7a440, #2b88d8)" }} aria-hidden="true">
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 20 20" fill="#fff">
        <path d="M10 1.5c.8 4.6 2.4 6.2 7 7-4.6.8-6.2 2.4-7 7-.8-4.6-2.4-6.2-7-7 4.6-.8 6.2-2.4 7-7Z" />
      </svg>
    </span>
  );
}

export function FileTile({ name, size = 24 }: { name: string; size?: number }) {
  const ext = (/\.([a-z0-9]+)$/i.exec(name)?.[1] ?? "").toLowerCase();
  const map: Record<string, [string, string]> = { docx: ["#185abd", "W"], xlsx: ["#107c41", "X"], pptx: ["#c43e1c", "P"], pdf: ["#d13438", "PDF"], txt: ["#605e5c", "TXT"], csv: ["#107c41", "CSV"], eml: ["#0078d4", "✉"], msg: ["#0078d4", "✉"] };
  const [c, l] = map[ext] ?? ["#605e5c", "FILE"];
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[3px] font-bold text-white" style={{ width: size * 0.82, height: size, background: c, fontSize: l.length > 1 ? size * 0.3 : size * 0.48 }} aria-hidden="true">
      {l}
    </span>
  );
}
