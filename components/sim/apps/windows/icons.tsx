import type { ReactNode } from "react";

/* Monochrome line icons (24×24, currentColor), Fluent-style. */
const L = (d: string) => <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;

const GLYPHS: Record<string, ReactNode> = {
  search: <>{L("M10.5 4.5a6 6 0 1 1 0 12a6 6 0 0 1 0-12z")}{L("M15 15l5 5")}</>,
  close: L("M6 6l12 12M18 6L6 18"),
  min: L("M5 12h14"),
  max: <rect x="5.5" y="5.5" width="13" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />,
  restore: <>{L("M8.5 8.5h9v9h-9z")}{L("M6.5 15.5v-9h9")}</>,
  back: L("M19 12H5M11 6l-6 6l6 6"),
  forward: L("M5 12h14M13 6l6 6l-6 6"),
  up: L("M12 19V5M6 11l6-6l6 6"),
  refresh: <>{L("M19 12a7 7 0 1 1-2.05-4.95")}{L("M19 4v4.5h-4.5")}</>,
  chevR: L("M9 6l6 6l-6 6"),
  chevL: L("M15 6l-6 6l6 6"),
  chevD: L("M6 9l6 6l6-6"),
  chevU: L("M6 15l6-6l6 6"),
  more: <><circle cx="6" cy="12" r="1.4" fill="currentColor" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><circle cx="18" cy="12" r="1.4" fill="currentColor" /></>,
  moreV: <><circle cx="12" cy="6" r="1.4" fill="currentColor" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><circle cx="12" cy="18" r="1.4" fill="currentColor" /></>,
  cut: <>{L("M7 7a2.5 2.5 0 1 0 0 .01")}<circle cx="6.5" cy="17.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="6.5" cy="6.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M8.6 8.2L19 18M8.6 15.8L19 6")}</>,
  copy: <>{L("M8.5 8.5h10v11h-10z")}{L("M5.5 15.5v-11h10")}</>,
  paste: <>{L("M8 5H6.5A1.5 1.5 0 0 0 5 6.5v12A1.5 1.5 0 0 0 6.5 20h4")}{L("M16 5h1.5A1.5 1.5 0 0 1 19 6.5V10")}{L("M9 3.5h6v3H9z")}{L("M12.5 12.5h7v8h-7z")}</>,
  rename: <>{L("M4 7.5h11M4 16.5h6")}{L("M18 6v12M16 6h4M16 18h4")}</>,
  share: <>{L("M14 5l5 5l-5 5")}{L("M19 10h-6a8 8 0 0 0-8 8")}</>,
  delete: <>{L("M5 7h14M10 4h4M7 7l1 12.5h8L17 7")}{L("M10.5 10.5v6M13.5 10.5v6")}</>,
  sort: <>{L("M7 5v14M4 16l3 3l3-3")}{L("M14 6h6M14 11h4.5M14 16h3")}</>,
  view: <>{L("M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z")}</>,
  plus: L("M12 5v14M5 12h14"),
  newc: <><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M12 8v8M8 12h8")}</>,
  filter: L("M4.5 6h15l-6 7v5l-3 1.5V13z"),
  check: L("M5 12.5l4.5 4.5L19 7.5"),
  wifi: <>{L("M3.5 9.5a12 12 0 0 1 17 0")}{L("M6.5 12.5a7.8 7.8 0 0 1 11 0")}{L("M9.5 15.5a3.6 3.6 0 0 1 5 0")}<circle cx="12" cy="18.5" r="1.2" fill="currentColor" /></>,
  wifiOff: <>{L("M3.5 9.5a12 12 0 0 1 17 0")}{L("M9.5 15.5a3.6 3.6 0 0 1 5 0")}{L("M4 4l16 16")}</>,
  ethernet: <>{L("M5 4.5h14v9H5z")}{L("M8 13.5v3h8v-3M12 16.5V20")}{L("M8 7.5v2.5M11 7.5v2.5M14 7.5v2.5M17 7.5v2.5")}</>,
  globeOff: <>{L("M12 3.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17z")}{L("M4 4l16 16")}</>,
  volume: <>{L("M4.5 9.5h3l4.5-4v13l-4.5-4h-3z")}{L("M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11")}</>,
  mute: <>{L("M4.5 9.5h3l4.5-4v13l-4.5-4h-3z")}{L("M15.5 9.5l5 5M20.5 9.5l-5 5")}</>,
  battery: <>{L("M3.5 8h15v8h-15z")}<rect x="5" y="9.5" width="9" height="5" fill="currentColor" />{L("M20.5 10.5v3")}</>,
  bluetooth: L("M7 7.5l10 9l-5 4v-17l5 4l-10 9"),
  airplane: L("M10.5 4.5c0-1 .7-1.8 1.5-1.8s1.5.8 1.5 1.8v5l7 4v2l-7-2v4l2 1.5v1.5L12 19.5l-3.5 1v-1.5l2-1.5v-4l-7 2v-2l7-4z"),
  sun: <><circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4")}</>,
  moon: L("M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5z"),
  leaf: <>{L("M5 19c0-8 5-13 14-14c0 9-5 14-13 14z")}{L("M5 19l7-7")}</>,
  access: <><circle cx="12" cy="5.5" r="1.8" fill="currentColor" />{L("M5 9l7 1.5L19 9M12 10.5v4l-3 5.5M12 14.5l3 5.5")}</>,
  gear: <>{L("M12 9a3 3 0 1 1 0 6a3 3 0 0 1 0-6z")}{L("M12 3.5l1.6 2.1l2.6-.4l.7 2.5l2.4 1.1l-.8 2.5l1.4 2.2l-2.1 1.6l.2 2.6l-2.6.5l-1.2 2.3l-2.2-1.3l-2.2 1.3l-1.2-2.3l-2.6-.5l.2-2.6l-2.1-1.6l1.4-2.2l-.8-2.5l2.4-1.1l.7-2.5l2.6.4z")}</>,
  edit: L("M5 19l1-4L16 5l3 3L9 18zM14 7l3 3"),
  bell: <>{L("M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z")}{L("M10 20h4")}</>,
  bellOff: <>{L("M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5h-14z")}{L("M4 4l16 16")}</>,
  power: <>{L("M12 3.5v8")}{L("M7.5 6.5a7 7 0 1 0 9 0")}</>,
  lock: <>{L("M6.5 10.5h11v9h-11z")}{L("M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5")}</>,
  unlock: <>{L("M6.5 10.5h11v9h-11z")}{L("M8.5 10.5V8a3.5 3.5 0 0 1 6.8-1.2")}</>,
  user: <><circle cx="12" cy="8.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M5 19.5a7 7 0 0 1 14 0")}</>,
  star: L("M12 4l2.4 5l5.4.6l-4 3.7l1.1 5.4L12 16l-4.9 2.7l1.1-5.4l-4-3.7l5.4-.6z"),
  starFill: <path d="M12 4l2.4 5l5.4.6l-4 3.7l1.1 5.4L12 16l-4.9 2.7l1.1-5.4l-4-3.7l5.4-.6z" fill="currentColor" />,
  favorites: <>{L("M10 5.5l1.8 3.6l4 .5l-2.9 2.8l.7 3.9l-3.6-1.9l-3.6 1.9l.7-3.9L4.2 9.6l4-.5z")}{L("M15 15.5h5M15 18.5h5M17.5 12.5h2.5")}</>,
  history: <>{L("M4.5 12a7.5 7.5 0 1 0 2.2-5.3")}{L("M4.5 4.5v3.5H8")}{L("M12 8v4.5l3 2")}</>,
  download: <>{L("M12 4.5v10M7.5 10.5l4.5 4.5l4.5-4.5")}{L("M5 19.5h14")}</>,
  upload: <>{L("M12 15V5M7.5 9.5L12 5l4.5 4.5")}{L("M5 19.5h14")}</>,
  home: L("M4.5 10.5L12 4.5l7.5 6V19.5h-5v-5h-5v5h-5z"),
  padlock: <>{L("M7 11h10v8H7z")}{L("M9 11V8.5a3 3 0 0 1 6 0V11")}</>,
  warn: <>{L("M12 4.5l8.5 15h-17z")}{L("M12 10v4.5")}<circle cx="12" cy="17" r="0.9" fill="currentColor" /></>,
  info: <><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M12 11v5.5")}<circle cx="12" cy="8" r="0.9" fill="currentColor" /></>,
  pin: <>{L("M14.5 4.5l5 5l-3 1.5l-3.5 3.5l.5 3.5l-1.5 1.5l-3-3l-4 4M9 11L5 7l1.5-1.5L10 6l3.5-3.5z")}</>,
  keyboard: <>{L("M3.5 6.5h17v11h-17z")}{L("M6.5 9.5h1M9.5 9.5h1M12.5 9.5h1M15.5 9.5h1M6.5 12h1M9.5 12h1M12.5 12h1M15.5 12h1M8 14.8h8")}</>,
  globe: <>{L("M12 3.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17z")}{L("M3.5 12h17M12 3.5c-3 3-3 14 0 17M12 3.5c3 3 3 14 0 17")}</>,
  shield: <>{L("M12 3.5l7 3v5.5c0 4.5-3 7.5-7 8.5c-4-1-7-4-7-8.5V6.5z")}</>,
  shieldCheck: <>{L("M12 3.5l7 3v5.5c0 4.5-3 7.5-7 8.5c-4-1-7-4-7-8.5V6.5z")}{L("M8.8 12.2l2.2 2.2l4.3-4.4")}</>,
  printer: <>{L("M7 8V4.5h10V8")}{L("M5 8h14a1.5 1.5 0 0 1 1.5 1.5v6H17M7 15.5H3.5v-6A1.5 1.5 0 0 1 5 8")}{L("M7 13h10v6.5H7z")}</>,
  monitor: <>{L("M3.5 5h17v11h-17z")}{L("M9 19.5h6M12 16v3.5")}</>,
  mouse: <>{L("M12 3.5a5 5 0 0 1 5 5v7a5 5 0 0 1-10 0v-7a5 5 0 0 1 5-5z")}{L("M12 3.5v6M7 9.5h10")}</>,
  headset: <>{L("M5 14v-2a7 7 0 0 1 14 0v2")}{L("M5 14h2.5v5H5zM16.5 14H19v5h-2.5z")}</>,
  phone: <>{L("M8 3.5h8v17H8z")}{L("M11 17.5h2")}</>,
  speaker: <>{L("M7 3.5h10v17H7z")}<circle cx="12" cy="14" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="7.5" r="1" fill="currentColor" /></>,
  cloud: L("M7 18.5a4 4 0 0 1-.6-8a5.5 5.5 0 0 1 10.6 1a3.5 3.5 0 0 1 .5 7z"),
  cloudCheck: <>{L("M7 18.5a4 4 0 0 1-.6-8a5.5 5.5 0 0 1 10.6 1a3.5 3.5 0 0 1 .5 7z")}{L("M9.5 14l2 2l3.5-3.5")}</>,
  sync: <>{L("M5 12a7 7 0 0 1 12-5l1.5 1.5")}{L("M18.5 4.5V8.5h-4")}{L("M19 12a7 7 0 0 1-12 5l-1.5-1.5")}{L("M5.5 19.5v-4h4")}</>,
  link: <>{L("M10 14l4-4")}{L("M8.5 11.5l-2 2a3 3 0 0 0 4.2 4.2l2-2")}{L("M15.5 12.5l2-2a3 3 0 0 0-4.2-4.2l-2 2")}</>,
  people: <><circle cx="9" cy="8.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M3.5 19a5.5 5.5 0 0 1 11 0")}<circle cx="16.5" cy="9.5" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M16 14a4.5 4.5 0 0 1 4.5 4.5")}</>,
  eye: <>{L("M3 12s3.5-6 9-6s9 6 9 6s-3.5 6-9 6s-9-6-9-6z")}<circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /></>,
  comment: L("M4.5 5.5h15v10h-9l-4 3.5v-3.5h-2z"),
  grid: <>{L("M4.5 4.5h4v4h-4zM10 4.5h4v4h-4zM15.5 4.5h4v4h-4zM4.5 10h4v4h-4zM10 10h4v4h-4zM15.5 10h4v4h-4zM4.5 15.5h4v4h-4zM10 15.5h4v4h-4zM15.5 15.5h4v4h-4z")}</>,
  details: <>{L("M4.5 6.5h15M4.5 10.5h15M4.5 14.5h15M4.5 18.5h15")}</>,
  tiles: <>{L("M4.5 5h6v6h-6zM13.5 5h6v6h-6zM4.5 13h6v6h-6zM13.5 13h6v6h-6z")}</>,
  taskview: <>{L("M3.5 6.5h11v11h-11z")}{L("M17.5 8.5h3v7h-3")}</>,
  widgets: <>{L("M4.5 4.5h6.5v6.5H4.5zM13 4.5h6.5v6.5H13zM4.5 13h6.5v6.5H4.5zM13 13h6.5v6.5H13z")}</>,
  emoji: <><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M8.5 14.5a4.5 4.5 0 0 0 7 0")}<circle cx="9" cy="10" r="1" fill="currentColor" /><circle cx="15" cy="10" r="1" fill="currentColor" /></>,
  clip: <>{L("M8 5H6.5A1.5 1.5 0 0 0 5 6.5v12A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 17.5 5H16")}{L("M9 3.5h6v3H9z")}</>,
  compress: <>{L("M5 4.5h14v15H5z")}{L("M12 4.5v2M11 6.5h2v1.5h-2zM12 8v1.5M11 9.5h2V11h-2zM11 12h2v3h-2z")}</>,
  extract: <>{L("M5 4.5h14v15H5z")}{L("M12 9v7M9 13l3 3l3-3")}</>,
  properties: <>{L("M5 4.5h14v15H5z")}{L("M8 9h8M8 12h8M8 15h5")}</>,
  open: <>{L("M13 5h6v6M19 5l-8 8")}{L("M17 13.5V19H5V7h5.5")}</>,
  restoreItem: <>{L("M4.5 12a7.5 7.5 0 1 0 2.2-5.3")}{L("M4.5 4.5v3.5H8")}</>,
  newFolder: <>{L("M3.5 7V18.5h17V8.5h-8.5l-2-2h-6.5z")}{L("M12 11v5M9.5 13.5h5")}</>,
  inPrivate: <><circle cx="8" cy="14" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="16" cy="14" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M11 14h2M4 10l2-5h12l2 5H4z")}</>,
  split: <>{L("M3.5 5.5h17v13h-17zM12 5.5v13")}</>,
  zoomIn: <>{L("M10.5 4.5a6 6 0 1 1 0 12a6 6 0 0 1 0-12z")}{L("M15 15l5 5M8 10.5h5M10.5 8v5")}</>,
  zoomOut: <>{L("M10.5 4.5a6 6 0 1 1 0 12a6 6 0 0 1 0-12z")}{L("M15 15l5 5M8 10.5h5")}</>,
  waffle: <>{[4, 10.5, 17].flatMap((x) => [4, 10.5, 17].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" rx="0.6" fill="currentColor" />))}</>,
  menu: L("M4.5 7h15M4.5 12h15M4.5 17h15"),
  chart: <>{L("M4 19.5h16")}{L("M5 16l4-5l3.5 3l6.5-8")}</>,
  apps: <>{L("M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6z")}{L("M16.5 13v7M13 16.5h7")}</>,
  system: <>{L("M3.5 5h17v11h-17z")}{L("M9 19.5h6")}</>,
  network: <>{L("M12 3.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17z")}{L("M3.5 12h17M12 3.5c-3 3-3 14 0 17M12 3.5c3 3 3 14 0 17")}</>,
  personalization: <>{L("M12 3.5a8.5 8.5 0 1 0 0 17c1.5 0 2-1 1.5-2c-.6-1.3.3-2.5 1.8-2.5H18a2.5 2.5 0 0 0 2.5-2.5A8.5 8.5 0 0 0 12 3.5z")}<circle cx="8" cy="10.5" r="1.1" fill="currentColor" /><circle cx="11" cy="7.3" r="1.1" fill="currentColor" /><circle cx="15.3" cy="8.3" r="1.1" fill="currentColor" /></>,
  accounts: <><circle cx="12" cy="8.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M5 19.5a7 7 0 0 1 14 0")}</>,
  time: <><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M12 7.5V12l3 2")}</>,
  gaming: <>{L("M7 8.5h10a4 4 0 0 1 4 4v1a3 3 0 0 1-5.4 1.8L14.5 14h-5l-1.1 1.3A3 3 0 0 1 3 13.5v-1a4 4 0 0 1 4-4z")}{L("M7.5 11v3M6 12.5h3")}</>,
  accessibility: <><circle cx="12" cy="5.5" r="1.8" fill="currentColor" />{L("M5 9l7 1.5L19 9M12 10.5v4l-3 5.5M12 14.5l3 5.5")}</>,
  privacy: <>{L("M12 3.5l7 3v5.5c0 4.5-3 7.5-7 8.5c-4-1-7-4-7-8.5V6.5z")}</>,
  update: <>{L("M5 12a7 7 0 0 1 12-5l1.5 1.5")}{L("M18.5 4.5V8.5h-4")}{L("M19 12a7 7 0 0 1-12 5l-1.5-1.5")}{L("M5.5 19.5v-4h4")}</>,
  firewall: <>{L("M4 5h16v14H4z")}{L("M4 9.7h16M4 14.3h16M9 5v4.7M15 9.7v4.6M9 14.3V19")}</>,
  app: <>{L("M4 5h16v14H4z")}{L("M4 8.5h16")}</>,
  chip: <>{L("M7 7h10v10H7z")}{L("M9.5 4v3M14.5 4v3M9.5 17v3M14.5 17v3M4 9.5h3M4 14.5h3M17 9.5h3M17 14.5h3")}</>,
  heart: L("M12 19s-7-4.5-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.5C19 14.5 12 19 12 19z"),
  family: <>{L("M8 9.5a2.5 2.5 0 1 0 0-.01M16 9.5a2.5 2.5 0 1 0 0-.01")}{L("M3.5 19a4.5 4.5 0 0 1 9 0M11.5 19a4.5 4.5 0 0 1 9 0")}</>,
  key: <>{L("M14.5 9.5a3.5 3.5 0 1 1 0 .01")}<circle cx="15" cy="9" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M12 12l-7.5 7.5M6.5 17.5l2 2M8.5 15.5l1.5 1.5")}</>,
  fingerprint: <>{L("M7 10a5 5 0 0 1 10 0v2c0 3-1 5.5-2.5 7.5")}{L("M10 10.5a2 2 0 0 1 4 0v1.5c0 3-1 5.5-2.5 7.5")}{L("M5 15a12 12 0 0 0 1.5-3.5")}</>,
  face: <>{L("M4.5 8V5.5a1 1 0 0 1 1-1H8M16 4.5h2.5a1 1 0 0 1 1 1V8M19.5 16v2.5a1 1 0 0 1-1 1H16M8 19.5H5.5a1 1 0 0 1-1-1V16")}<circle cx="9.5" cy="10.5" r="0.9" fill="currentColor" /><circle cx="14.5" cy="10.5" r="0.9" fill="currentColor" />{L("M9.5 14.5a3.5 3.5 0 0 0 5 0")}</>,
  usb: <>{L("M8.5 3.5h7v6h-7z")}{L("M7 9.5h10v11H7z")}{L("M10.5 5.5v1.5M13.5 5.5v1.5")}</>,
  clipboardList: <>{L("M8 5H6.5A1.5 1.5 0 0 0 5 6.5v12A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 17.5 5H16")}{L("M9 3.5h6v3H9zM8.5 11h7M8.5 14.5h7")}</>,
  scissors: <><circle cx="6.5" cy="17.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="6.5" cy="6.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M8.6 8.2L19 18M8.6 15.8L19 6")}</>,
  rect: <rect x="4.5" y="6.5" width="15" height="11" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />,
  windowSnip: <>{L("M4 5h16v14H4z")}{L("M4 8.5h16")}</>,
  fullscreen: <>{L("M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15")}</>,
  freeform: L("M6 15c-2-3 0-8 5-9s9 2 8 6s-6 3-8 5s-1 4 1 4"),
  save: <>{L("M5 4.5h11.5l3 3v12H5z")}{L("M8 4.5v5h7v-5M8 19.5v-6h8v6")}</>,
  print: <>{L("M7 8V4.5h10V8")}{L("M5 8h14a1.5 1.5 0 0 1 1.5 1.5v6H17M7 15.5H3.5v-6A1.5 1.5 0 0 1 5 8")}{L("M7 13h10v6.5H7z")}</>,
  stop: <rect x="6" y="6" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  pause: L("M8.5 5.5v13M15.5 5.5v13"),
  play: L("M7 5l12 7l-12 7z"),
  cancel: <><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M6 18L18 6")}</>,
  run: <>{L("M5 4.5h14v15H5z")}{L("M9 9l3 3l-3 3M13 15h3")}</>,
  efficiency: <>{L("M5 19c0-8 5-13 14-14c0 9-5 14-13 14z")}{L("M5 19l7-7")}</>,
  disk: <>{L("M4.5 6.5h15v11h-15z")}<circle cx="16" cy="14.5" r="1" fill="currentColor" />{L("M7 14.5h5")}</>,
  memory: <>{L("M3.5 7.5h17v8h-17z")}{L("M6 15.5v2.5M10 15.5v2.5M14 15.5v2.5M18 15.5v2.5M6.5 10h2v3h-2zM11 10h2v3h-2zM15.5 10h2v3h-2z")}</>,
  gpu: <>{L("M3.5 7h17v10h-17z")}<circle cx="9" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />{L("M14 10h4M14 13h4")}</>,
  vpn: <>{L("M12 3.5l7 3v5.5c0 4.5-3 7.5-7 8.5c-4-1-7-4-7-8.5V6.5z")}{L("M9 11.5h6v4H9zM10.3 11.5V10a1.7 1.7 0 0 1 3.4 0v1.5")}</>,
  broadcast: <>{L("M7.5 16.5a6.5 6.5 0 0 1 0-9M16.5 7.5a6.5 6.5 0 0 1 0 9")}<circle cx="12" cy="12" r="1.8" fill="currentColor" /></>,
  cast: <>{L("M3.5 9V5.5h17v13H14")}{L("M3.5 13a6 6 0 0 1 6 6M3.5 16.5a2.5 2.5 0 0 1 2.5 2.5")}</>,
  hotspot: <>{L("M7.5 16.5a6.5 6.5 0 0 1 0-9M16.5 7.5a6.5 6.5 0 0 1 0 9")}<circle cx="12" cy="12" r="1.8" fill="currentColor" /></>,
  thumbs: L("M7 10.5v9H4.5v-9zM7 10.5l4-6.5a1.8 1.8 0 0 1 2.5 2.3l-1 3.2h5.5a1.8 1.8 0 0 1 1.7 2.3l-1.8 6a2 2 0 0 1-1.9 1.2H7"),
  calendar: <>{L("M4.5 6h15v13.5h-15z")}{L("M4.5 10h15M8.5 4v3.5M15.5 4v3.5")}</>,
  mail: <>{L("M3.5 6h17v12h-17z")}{L("M3.5 6.5l8.5 7l8.5-7")}</>,
  report: <>{L("M5 20V4.5")}{L("M5 5h12l-2.5 4l2.5 4H5")}</>,
};

export function G({ n, s = 16, className, style }: { n: string; s?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" className={className} style={{ flexShrink: 0, ...style }} aria-hidden="true">
      {GLYPHS[n] ?? GLYPHS.app}
    </svg>
  );
}

/* Windows logo */
export function WinLogo({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="wlogo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3ccbf4" />
          <stop offset="1" stopColor="#0f6cbd" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="9.5" height="9.5" rx="1" fill="url(#wlogo)" />
      <rect x="12.5" y="2" width="9.5" height="9.5" rx="1" fill="url(#wlogo)" />
      <rect x="2" y="12.5" width="9.5" height="9.5" rx="1" fill="url(#wlogo)" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1" fill="url(#wlogo)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* App icons (colored)                                                 */
/* ------------------------------------------------------------------ */

const tile = (bg: string, letter: string, fg = "#fff") => (
  <>
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill={bg} />
    <text x="12" y="16.6" textAnchor="middle" fontSize="12.5" fontWeight="700" fontFamily="Segoe UI, Arial, sans-serif" fill={fg}>
      {letter}
    </text>
  </>
);

const APP_ART: Record<string, ReactNode> = {
  explorer: (
    <>
      <path d="M2 6.5A1.5 1.5 0 0 1 3.5 5h5.6l2 2H20.5A1.5 1.5 0 0 1 22 8.5V18a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18z" fill="#f4b73a" />
      <path d="M2 10h20v8a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18z" fill="#ffd35c" />
      <rect x="2" y="9.2" width="20" height="2.2" fill="#2f7fd8" />
    </>
  ),
  edge: (
    <>
      <defs>
        <linearGradient id="edgeg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1c9ad6" />
          <stop offset="0.55" stopColor="#0d64c2" />
          <stop offset="1" stopColor="#36c96f" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#edgeg)" />
      <path d="M5.5 13.5c.5-4 3.6-6.6 7.3-6.6c3.4 0 5.7 2.2 5.7 5c0 1.8-1.4 3-3.4 3h-5.5c.3 2.2 2.4 3.5 4.8 3.5c1.4 0 2.6-.3 3.6-.9c-1.5 2.1-3.8 3.3-6.4 3.3c-3.6 0-6.4-3-6.1-7.3z" fill="#fff" opacity=".92" />
    </>
  ),
  edgeprivate: (
    <>
      <circle cx="12" cy="12" r="10" fill="#3b3b3b" />
      <path d="M5.5 13.5c.5-4 3.6-6.6 7.3-6.6c3.4 0 5.7 2.2 5.7 5c0 1.8-1.4 3-3.4 3h-5.5c.3 2.2 2.4 3.5 4.8 3.5c1.4 0 2.6-.3 3.6-.9c-1.5 2.1-3.8 3.3-6.4 3.3c-3.6 0-6.4-3-6.1-7.3z" fill="#9ad4ff" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="10" fill="#5a6573" />
      <path d="M12 6.2l1.2 1.6l2-.3l.5 1.9l1.8.8l-.6 1.9l1.1 1.7l-1.6 1.2l.2 2l-2 .4l-.9 1.8l-1.7-1l-1.7 1l-.9-1.8l-2-.4l.2-2l-1.6-1.2l1.1-1.7l-.6-1.9l1.8-.8l.5-1.9l2 .3z" fill="#e6e9ee" />
      <circle cx="12" cy="12" r="2.4" fill="#5a6573" />
    </>
  ),
  store: (
    <>
      <path d="M4 8h16l-1 12.5H5z" fill="#2b2b2b" />
      <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" stroke="#2b2b2b" strokeWidth="1.6" fill="none" />
      <rect x="8" y="11" width="3.5" height="3.5" fill="#f25022" />
      <rect x="12.5" y="11" width="3.5" height="3.5" fill="#7fba00" />
      <rect x="8" y="15.5" width="3.5" height="3.5" fill="#00a4ef" />
      <rect x="12.5" y="15.5" width="3.5" height="3.5" fill="#ffb900" />
    </>
  ),
  word: tile("#185abd", "W"),
  excel: tile("#107c41", "X"),
  powerpoint: tile("#c43e1c", "P"),
  outlook: tile("#0f6cbd", "O"),
  teams: tile("#5b5fc7", "T"),
  onedrive: <path d="M6.5 18.5a4 4 0 0 1-.6-8a5.6 5.6 0 0 1 10.6 1a3.6 3.6 0 0 1 .7 7z" fill="#0f78d4" />,
  notepad: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" fill="#3b9ae1" />
      <rect x="6" y="6.5" width="12" height="12.5" rx="1" fill="#fff" />
      <path d="M7.5 9.5h9M7.5 12h9M7.5 14.5h6" stroke="#3b9ae1" strokeWidth="1.2" />
    </>
  ),
  calculator: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" fill="#3a3a3a" />
      <rect x="6" y="4.5" width="12" height="4" rx="1" fill="#9be1ff" />
      {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={6 + c * 4.2} y={10 + r * 3.7} width="3.4" height="2.9" rx=".6" fill={c === 2 && r === 2 ? "#0f6cbd" : "#666"} />))}
    </>
  ),
  snip: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#1f6fd1" />
      <circle cx="8.5" cy="16.5" r="2.2" fill="none" stroke="#fff" strokeWidth="1.5" />
      <circle cx="15.5" cy="16.5" r="2.2" fill="none" stroke="#ff8a80" strokeWidth="1.5" />
      <path d="M9.5 14.5L15 6M14.5 14.5L9 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  taskmgr: (
    <>
      <rect x="2.5" y="3.5" width="19" height="17" rx="3" fill="#1e3a5f" />
      <path d="M5 15l3.5-4l3 2.5l3.5-5.5L19 11" stroke="#4fd1a1" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </>
  ),
  cmd: (
    <>
      <rect x="2.5" y="3.5" width="19" height="17" rx="2.5" fill="#1c1c1c" />
      <path d="M6 9l3.5 3L6 15" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 15.5h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  security: (
    <>
      <path d="M12 2.5l8 3.3v6c0 5-3.3 8.5-8 9.7c-4.7-1.2-8-4.7-8-9.7v-6z" fill="#0f6cbd" />
      <path d="M12 2.5v19.2c4.7-1.2 8-4.7 8-9.7v-6z" fill="#2b88d8" />
    </>
  ),
  photos: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="3" fill="#0f78d4" />
      <circle cx="8.5" cy="9.5" r="2" fill="#ffe08a" />
      <path d="M4 18l5-5l3 3l3.5-4l4.5 6z" fill="#7fd1ff" />
    </>
  ),
  paint: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.5 0 2.1-1 1.6-2.1c-.6-1.4.3-2.6 1.9-2.6H18A3 3 0 0 0 21 13.3A9 9 0 0 0 12 3z" fill="#f5c26b" />
      <circle cx="7.8" cy="11" r="1.6" fill="#e74856" />
      <circle cx="10.8" cy="7.3" r="1.6" fill="#0f78d4" />
      <circle cx="15.5" cy="8.3" r="1.6" fill="#16c60c" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" fill="#2b5797" />
      <circle cx="12" cy="12" r="7.5" fill="#fff" />
      <path d="M12 7.5V12l3 2" stroke="#2b5797" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
  camera: (
    <>
      <rect x="2.5" y="6" width="19" height="13" rx="3" fill="#454545" />
      <circle cx="12" cy="12.5" r="4" fill="#9ad4ff" stroke="#fff" strokeWidth="1.2" />
      <rect x="8" y="4" width="8" height="3" rx="1" fill="#454545" />
    </>
  ),
  printqueue: (
    <>
      <rect x="6" y="3" width="12" height="6" fill="#d8d8d8" />
      <rect x="3" y="8" width="18" height="9" rx="2" fill="#6b6b6b" />
      <rect x="6" y="13" width="12" height="8" fill="#fff" stroke="#999" />
    </>
  ),
  devmgmt: (
    <>
      <rect x="3" y="4" width="16" height="11" rx="1.5" fill="#3a6ea5" />
      <rect x="4.5" y="5.5" width="13" height="8" fill="#9fd0ff" />
      <rect x="8" y="15" width="6" height="2.5" fill="#6b6b6b" />
      <circle cx="17.5" cy="17.5" r="4" fill="#f3f3f3" stroke="#555" strokeWidth="1" />
      <path d="M17.5 15.3v4.4M15.3 17.5h4.4" stroke="#555" strokeWidth="1.2" />
    </>
  ),
  scan: (
    <>
      <rect x="2.5" y="9" width="19" height="9" rx="2" fill="#5a5a5a" />
      <rect x="2.5" y="7" width="19" height="3" rx="1" fill="#8a8a8a" />
      <rect x="4.5" y="12" width="15" height="1.6" rx=".8" fill="#4fc3f7" />
      <rect x="6" y="3.5" width="12" height="5" fill="#fff" stroke="#bbb" strokeWidth=".8" />
    </>
  ),
};

export function AppIcon({ id, s = 24 }: { id: string; s?: number }) {
  if (id.startsWith("webapp:")) {
    const letter = id.slice(7).replace(/^www\./, "").charAt(0).toUpperCase();
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#4b5d73" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="Segoe UI, Arial">
          {letter}
        </text>
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      {APP_ART[id] ?? tile("#6b7280", (id[0] ?? "?").toUpperCase())}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* File and place icons                                                */
/* ------------------------------------------------------------------ */

const page = (color: string, mark?: ReactNode) => (
  <>
    <path d="M6 2.5h8.5L19 7v14.5H6z" fill="#fff" stroke="#c8c8c8" strokeWidth=".8" />
    <path d="M14.5 2.5V7H19" fill="#ececec" stroke="#c8c8c8" strokeWidth=".8" />
    {mark ?? <rect x="3.5" y="11" width="11" height="8" rx="1.2" fill={color} />}
  </>
);

const letterOn = (color: string, l: string) => (
  <>
    <path d="M6 2.5h8.5L19 7v14.5H6z" fill="#fff" stroke="#c8c8c8" strokeWidth=".8" />
    <path d="M14.5 2.5V7H19" fill="#ececec" stroke="#c8c8c8" strokeWidth=".8" />
    <rect x="3" y="10.5" width="11" height="9" rx="1.5" fill={color} />
    <text x="8.5" y="17.6" textAnchor="middle" fontSize="7.2" fontWeight="700" fill="#fff" fontFamily="Segoe UI, Arial">
      {l}
    </text>
  </>
);

export const FOLDER = (
  <>
    <path d="M2 6.5A1.5 1.5 0 0 1 3.5 5h5.6l2 2H20.5A1.5 1.5 0 0 1 22 8.5V18a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18z" fill="#e8a522" />
    <path d="M2 9.5h20V18a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18z" fill="#ffc94d" />
  </>
);

const FILE_ART: Record<string, ReactNode> = {
  folder: FOLDER,
  zip: (
    <>
      {FOLDER}
      <rect x="11" y="9.5" width="2.5" height="10" fill="#7a5a10" opacity=".6" />
      <path d="M11 11h2.5M11 13h2.5M11 15h2.5" stroke="#fff" strokeWidth=".8" />
    </>
  ),
  docx: letterOn("#185abd", "W"),
  xlsx: letterOn("#107c41", "X"),
  pptx: letterOn("#c43e1c", "P"),
  pdf: letterOn("#d13438", "PDF"),
  txt: page("#777", <path d="M8.5 10.5h7M8.5 13h7M8.5 15.5h7M8.5 18h4" stroke="#7a7a7a" strokeWidth="1" />),
  image: page("#0f78d4", <><rect x="7.5" y="10" width="10" height="8" rx="1" fill="#7fc4ff" /><path d="M7.5 18l3-3.5l2 2l2.5-3l2.5 4.5z" fill="#0f78d4" /></>),
  exe: <><rect x="3" y="4" width="18" height="16" rx="2" fill="#eaeaea" stroke="#9a9a9a" strokeWidth=".8" /><rect x="3" y="4" width="18" height="3.5" rx="1.5" fill="#0f6cbd" /></>,
  msi: <><rect x="4" y="4" width="16" height="16" rx="2" fill="#eaeaea" stroke="#9a9a9a" strokeWidth=".8" /><rect x="7" y="8" width="10" height="8" fill="#ffb900" /></>,
  audio: page("#8764b8", <path d="M10 17.5a1.5 1.5 0 1 1 0-.01V10.5l6-1.5v7a1.5 1.5 0 1 1 0-.01" fill="none" stroke="#8764b8" strokeWidth="1.2" />),
  video: page("#8764b8", <path d="M9.5 10.5v7l6-3.5z" fill="#8764b8" />),
  file: page("#999", <path d="M8.5 12h7M8.5 14.5h7M8.5 17h5" stroke="#bbb" strokeWidth="1" />),
  html: letterOn("#0c59a4", "</>"),
  drive: (
    <>
      <rect x="2.5" y="7" width="19" height="10" rx="1.6" fill="#d8dde3" stroke="#8e98a3" strokeWidth=".8" />
      <rect x="5" y="9.5" width="2.2" height="2.2" fill="#00a4ef" />
      <rect x="7.6" y="9.5" width="2.2" height="2.2" fill="#00a4ef" />
      <rect x="5" y="12.1" width="2.2" height="2.2" fill="#00a4ef" />
      <rect x="7.6" y="12.1" width="2.2" height="2.2" fill="#00a4ef" />
      <circle cx="18" cy="14.3" r=".9" fill="#16c60c" />
    </>
  ),
  usb: (
    <>
      <rect x="4" y="7" width="13" height="10" rx="1.5" fill="#d8dde3" stroke="#8e98a3" strokeWidth=".8" />
      <rect x="17" y="9" width="4" height="6" fill="#a8b0b8" />
      <path d="M8 12h5" stroke="#0f6cbd" strokeWidth="1.4" />
    </>
  ),
  network: (
    <>
      <rect x="2.5" y="6" width="19" height="9" rx="1.6" fill="#d8dde3" stroke="#8e98a3" strokeWidth=".8" />
      <path d="M12 15v3M6 19h12" stroke="#5a6573" strokeWidth="1.4" />
      <circle cx="18" cy="12.3" r=".9" fill="#16c60c" />
    </>
  ),
  thispc: (
    <>
      <rect x="2.5" y="4" width="19" height="12.5" rx="1.5" fill="#2b88d8" />
      <rect x="4" y="5.5" width="16" height="9.5" fill="#9ad4ff" />
      <path d="M9 20h6M12 16.5V20" stroke="#5a6573" strokeWidth="1.6" />
    </>
  ),
  home: (
    <>
      <path d="M3 11L12 3.5l9 7.5v9.5H3z" fill="#e8a522" />
      <rect x="9.5" y="14" width="5" height="6.5" fill="#fff" opacity=".85" />
    </>
  ),
  recycle: (
    <>
      <path d="M5 7h14l-1.3 14H6.3z" fill="#e3f1fb" stroke="#6f8aa3" strokeWidth=".9" />
      <path d="M4 6.5h16" stroke="#6f8aa3" strokeWidth="1.2" />
      <path d="M9 10v8M12 10v8M15 10v8" stroke="#9db4c8" strokeWidth=".9" />
    </>
  ),
  recycleFull: (
    <>
      <path d="M5 7h14l-1.3 14H6.3z" fill="#e3f1fb" stroke="#6f8aa3" strokeWidth=".9" />
      <path d="M4 6.5h16" stroke="#6f8aa3" strokeWidth="1.2" />
      <path d="M7 6.5c1-3 3-3.5 5-2s3 .5 5 2" fill="#fff" stroke="#9db4c8" strokeWidth=".8" />
      <rect x="8" y="3.2" width="5" height="3.5" fill="#fff" stroke="#c8c8c8" strokeWidth=".6" transform="rotate(-12 10 5)" />
    </>
  ),
  onedrive: <path d="M6.5 18.5a4 4 0 0 1-.6-8a5.6 5.6 0 0 1 10.6 1a3.6 3.6 0 0 1 .7 7z" fill="#0f78d4" />,
  gdrive: (
    <>
      <path d="M8.5 4h7l6 10.5h-7z" fill="#ffba00" />
      <path d="M8.5 4L2.5 14.5L6 20.5l6-10.5z" fill="#0f9d58" />
      <path d="M6 20.5h12l3.5-6h-12z" fill="#4285f4" />
    </>
  ),
  desktop: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="1.5" fill="#0f6cbd" />
      <rect x="4" y="5.5" width="16" height="10" fill="#4cc2ff" />
      <path d="M9 20h6M12 17v3" stroke="#5a6573" strokeWidth="1.6" />
    </>
  ),
  downloads: (
    <>
      <circle cx="12" cy="12" r="9.5" fill="#16a34a" />
      <path d="M12 6.5v8M8.5 11.5L12 15l3.5-3.5M8 17.5h8" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
  documents: (
    <>
      <path d="M6 2.5h8.5L19 7v14.5H6z" fill="#e1ecf7" stroke="#6b8cb3" strokeWidth=".8" />
      <path d="M8.5 11h7M8.5 13.5h7M8.5 16h5" stroke="#6b8cb3" strokeWidth="1" />
    </>
  ),
  pictures: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" fill="#2b88d8" />
      <circle cx="8" cy="9.5" r="1.8" fill="#ffe08a" />
      <path d="M3.5 18l5.5-5.5l3 3l3.5-4l5 6.5z" fill="#9ad4ff" />
    </>
  ),
  music: (
    <>
      <circle cx="12" cy="12" r="9.5" fill="#e3008c" />
      <path d="M10 16.5a1.6 1.6 0 1 1 0-.01V8.5l5.5-1.3v7.3a1.6 1.6 0 1 1 0-.01" fill="none" stroke="#fff" strokeWidth="1.3" />
    </>
  ),
  videos: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" fill="#8764b8" />
      <path d="M10 9v6l5-3z" fill="#fff" />
    </>
  ),
  shortcut: <path d="M3 21h6v-6H3z" fill="#fff" stroke="#555" strokeWidth=".7" />,
};

export function FileArt({ kind, s = 20 }: { kind: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      {FILE_ART[kind] ?? FILE_ART.file}
    </svg>
  );
}

export function kindForName(name: string, folder: boolean): string {
  if (folder) return "folder";
  const e = (/\.([A-Za-z0-9]+)$/.exec(name)?.[1] ?? "").toLowerCase();
  if (["docx", "doc", "rtf"].includes(e)) return "docx";
  if (["xlsx", "xls", "csv"].includes(e)) return "xlsx";
  if (["pptx", "ppt"].includes(e)) return "pptx";
  if (e === "pdf") return "pdf";
  if (["txt", "log", "md"].includes(e)) return "txt";
  if (["png", "jpg", "jpeg", "gif", "bmp", "heic"].includes(e)) return "image";
  if (e === "zip") return "zip";
  if (e === "exe") return "exe";
  if (e === "msi") return "msi";
  if (["mp3", "wav", "m4a"].includes(e)) return "audio";
  if (["mp4", "mov", "avi"].includes(e)) return "video";
  if (["html", "htm"].includes(e)) return "html";
  return "file";
}
