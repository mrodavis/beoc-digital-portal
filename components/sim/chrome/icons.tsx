import type { ReactNode } from "react";

/**
 * Small Office-style ribbon icons drawn as inline SVG (24×24 grid).
 * Blue = Word-ish action color, the app accent is passed through
 * `currentColor` where an icon should take it.
 */

const B = "#2b579a"; // structural blue
const G = "#5f6368"; // grey line work
const Y = "#f2c811";
const R = "#d13438";
const GR = "#107c41";
const O = "#c43e1c";

const lines = (ys: number[], x1: number[], x2: number[], color = G) =>
  ys.map((y, i) => <line key={i} x1={x1[i]} y1={y} x2={x2[i]} y2={y} stroke={color} strokeWidth="1.8" strokeLinecap="round" />);

const ICONS: Record<string, ReactNode> = {
  bold: <text x="12" y="18" textAnchor="middle" fontSize="16" fontWeight="800" fontFamily="Segoe UI, Arial" fill="#222">B</text>,
  italic: <text x="12" y="18" textAnchor="middle" fontSize="16" fontStyle="italic" fontFamily="Georgia, serif" fill="#222">I</text>,
  underline: (
    <>
      <text x="12" y="16" textAnchor="middle" fontSize="15" fontFamily="Segoe UI, Arial" fill="#222">U</text>
      <line x1="6" y1="20" x2="18" y2="20" stroke="#222" strokeWidth="1.6" />
    </>
  ),
  strike: (
    <>
      <text x="12" y="17" textAnchor="middle" fontSize="13" fontFamily="Segoe UI, Arial" fill="#222">ab</text>
      <line x1="4" y1="12.5" x2="20" y2="12.5" stroke={R} strokeWidth="1.5" />
    </>
  ),
  subscript: <text x="12" y="17" textAnchor="middle" fontSize="12" fill="#222">x₂</text>,
  superscript: <text x="12" y="17" textAnchor="middle" fontSize="12" fill="#222">x²</text>,
  fontColor: (
    <>
      <text x="12" y="15" textAnchor="middle" fontSize="15" fontFamily="Segoe UI, Arial" fill="#222">A</text>
      <rect x="4" y="18" width="16" height="3.5" fill={R} />
    </>
  ),
  highlight: (
    <>
      <path d="M7 14l6-9 4 3-6 9H7z" fill="#fff" stroke={G} strokeWidth="1.4" />
      <rect x="4" y="18" width="16" height="3.5" fill="#ffff00" />
    </>
  ),
  fill: (
    <>
      <path d="M6 12l6-6 6 6-6 6z" fill="#fff" stroke={G} strokeWidth="1.4" />
      <rect x="4" y="19" width="16" height="3" fill="#ffff00" />
    </>
  ),
  growFont: <text x="12" y="17" textAnchor="middle" fontSize="14" fill="#222">A↑</text>,
  shrinkFont: <text x="12" y="17" textAnchor="middle" fontSize="12" fill="#222">A↓</text>,
  clearFormat: (
    <>
      <text x="10" y="16" textAnchor="middle" fontSize="14" fill="#222">A</text>
      <path d="M14 13l6 6M20 13l-6 6" stroke={R} strokeWidth="1.8" />
    </>
  ),
  changeCase: <text x="12" y="17" textAnchor="middle" fontSize="13" fill="#222">Aa</text>,
  alignLeft: <>{lines([6, 10, 14, 18], [4, 4, 4, 4], [20, 14, 20, 12])}</>,
  alignCenter: <>{lines([6, 10, 14, 18], [4, 7, 4, 8], [20, 17, 20, 16])}</>,
  alignRight: <>{lines([6, 10, 14, 18], [4, 10, 4, 12], [20, 20, 20, 20])}</>,
  justify: <>{lines([6, 10, 14, 18], [4, 4, 4, 4], [20, 20, 20, 20])}</>,
  bullets: (
    <>
      {[6, 12, 18].map((y) => <circle key={y} cx="5" cy={y} r="1.8" fill={B} />)}
      {lines([6, 12, 18], [9, 9, 9], [20, 20, 20])}
    </>
  ),
  numbering: (
    <>
      {[["1", 8], ["2", 14], ["3", 20]].map(([t, y]) => (
        <text key={t} x="5" y={y as number} textAnchor="middle" fontSize="7" fill={B} fontWeight="700">{t}</text>
      ))}
      {lines([6, 12, 18], [9, 9, 9], [20, 20, 20])}
    </>
  ),
  multilevel: (
    <>
      <text x="4" y="8" fontSize="6" fill={B} fontWeight="700">1</text>
      <text x="8" y="14" fontSize="6" fill={B} fontWeight="700">a</text>
      <text x="12" y="20" fontSize="6" fill={B} fontWeight="700">i</text>
      {lines([6, 12, 18], [8, 12, 16], [20, 20, 20])}
    </>
  ),
  indentInc: (
    <>
      {lines([5, 9, 13, 17, 21], [4, 11, 11, 11, 4], [20, 20, 20, 20, 20])}
      <path d="M4 10l4 3-4 3z" fill={B} />
    </>
  ),
  indentDec: (
    <>
      {lines([5, 9, 13, 17, 21], [4, 11, 11, 11, 4], [20, 20, 20, 20, 20])}
      <path d="M8 10l-4 3 4 3z" fill={B} />
    </>
  ),
  lineSpacing: (
    <>
      {lines([6, 10, 14, 18], [11, 11, 11, 11], [20, 20, 20, 20])}
      <path d="M5 4v16M3 7l2-3 2 3M3 17l2 3 2-3" stroke={B} strokeWidth="1.4" fill="none" />
    </>
  ),
  sort: (
    <>
      <text x="4" y="10" fontSize="7" fill={B} fontWeight="700">A</text>
      <text x="4" y="20" fontSize="7" fill={B} fontWeight="700">Z</text>
      <path d="M16 4v15M13 16l3 4 3-4" stroke={G} strokeWidth="1.5" fill="none" />
    </>
  ),
  sortAsc: (
    <>
      <text x="4" y="10" fontSize="7" fill={B} fontWeight="700">A</text>
      <text x="4" y="20" fontSize="7" fill={B} fontWeight="700">Z</text>
      <path d="M16 4v15M13 16l3 4 3-4" stroke={G} strokeWidth="1.5" fill="none" />
    </>
  ),
  sortDesc: (
    <>
      <text x="4" y="10" fontSize="7" fill={B} fontWeight="700">Z</text>
      <text x="4" y="20" fontSize="7" fill={B} fontWeight="700">A</text>
      <path d="M16 4v15M13 16l3 4 3-4" stroke={G} strokeWidth="1.5" fill="none" />
    </>
  ),
  pilcrow: <text x="12" y="18" textAnchor="middle" fontSize="16" fill={B}>¶</text>,
  shading: (
    <>
      <path d="M5 13l6-7 6 7-6 6z" fill="#fff" stroke={G} strokeWidth="1.3" />
      <rect x="4" y="19" width="16" height="3" fill="#ffd966" />
    </>
  ),
  borders: (
    <>
      <rect x="4" y="4" width="16" height="16" fill="none" stroke={G} strokeWidth="1" strokeDasharray="2 2" />
      <line x1="4" y1="20" x2="20" y2="20" stroke="#222" strokeWidth="2" />
    </>
  ),
  paste: (
    <>
      <rect x="5" y="5" width="13" height="16" rx="1.5" fill="#c8a165" />
      <rect x="9" y="3" width="5" height="4" rx="1" fill={G} />
      <rect x="9" y="9" width="12" height="13" rx="1" fill="#fff" stroke={G} />
      {lines([13, 16, 19], [11, 11, 11], [19, 19, 17])}
    </>
  ),
  cut: (
    <>
      <circle cx="7" cy="17" r="3" fill="none" stroke={G} strokeWidth="1.6" />
      <circle cx="17" cy="17" r="3" fill="none" stroke={G} strokeWidth="1.6" />
      <path d="M9 15L17 4M15 15L7 4" stroke={G} strokeWidth="1.6" />
    </>
  ),
  copy: (
    <>
      <rect x="4" y="4" width="11" height="13" rx="1" fill="#fff" stroke={G} strokeWidth="1.4" />
      <rect x="9" y="8" width="11" height="13" rx="1" fill="#fff" stroke={B} strokeWidth="1.4" />
    </>
  ),
  formatPainter: (
    <>
      <rect x="4" y="3" width="14" height="7" rx="1.5" fill={Y} stroke={G} />
      <path d="M11 10v4h-1v7h3v-7h-1" stroke={G} strokeWidth="1.5" fill="#fff" />
    </>
  ),
  find: (
    <>
      <circle cx="10" cy="10" r="5.5" fill="none" stroke={B} strokeWidth="2" />
      <line x1="14" y1="14" x2="20" y2="20" stroke={B} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  replace: (
    <>
      <text x="3" y="11" fontSize="9" fill={B} fontWeight="700">ab</text>
      <text x="11" y="21" fontSize="9" fill={GR} fontWeight="700">ac</text>
      <path d="M15 5c3 0 4 2 4 4l-2-1M19 8l1-2" stroke={G} strokeWidth="1.2" fill="none" />
    </>
  ),
  select: <path d="M7 4v14l4-4 3 6 2-1-3-6h5z" fill="#fff" stroke="#222" strokeWidth="1.3" />,
  styles: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" fill="#fff" stroke={G} />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill={B} fontWeight="700">Aa</text>
    </>
  ),
  table: (
    <>
      <rect x="3" y="4" width="18" height="16" fill="#fff" stroke={B} strokeWidth="1.4" />
      <rect x="3" y="4" width="18" height="4" fill={B} />
      <path d="M3 12h18M3 16h18M9 8v12M15 8v12" stroke={B} strokeWidth="1" />
    </>
  ),
  picture: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" fill="#e8f1fb" stroke={B} strokeWidth="1.3" />
      <circle cx="8" cy="9.5" r="1.8" fill={Y} />
      <path d="M4 18l5-6 4 4 3-3 4 5z" fill={GR} />
    </>
  ),
  onlinePicture: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" fill="#e8f1fb" stroke={B} strokeWidth="1.3" />
      <circle cx="16" cy="9" r="3" fill="none" stroke={B} />
      <path d="M4 18l5-6 4 4 3-3 4 5z" fill={GR} />
    </>
  ),
  shapes: (
    <>
      <circle cx="9" cy="9" r="5" fill="#9dc3e6" stroke={B} />
      <rect x="11" y="11" width="9" height="9" fill="#f4b183" stroke={O} />
    </>
  ),
  icons: (
    <>
      <circle cx="12" cy="9" r="4" fill="none" stroke={B} strokeWidth="1.6" />
      <path d="M5 21c1-4 4-6 7-6s6 2 7 6" fill="none" stroke={B} strokeWidth="1.6" />
    </>
  ),
  smartart: (
    <>
      <rect x="9" y="3" width="6" height="5" fill="#8fbc8f" stroke={GR} />
      <rect x="3" y="15" width="6" height="5" fill="#8fbc8f" stroke={GR} />
      <rect x="15" y="15" width="6" height="5" fill="#8fbc8f" stroke={GR} />
      <path d="M12 8v4M6 12h12M6 12v3M18 12v3" stroke={G} />
    </>
  ),
  chart: (
    <>
      <rect x="4" y="12" width="4" height="8" fill={B} />
      <rect x="10" y="7" width="4" height="13" fill={O} />
      <rect x="16" y="10" width="4" height="10" fill={GR} />
      <line x1="3" y1="20.5" x2="21" y2="20.5" stroke={G} />
    </>
  ),
  pie: (
    <>
      <circle cx="12" cy="12" r="8" fill="#9dc3e6" />
      <path d="M12 12V4a8 8 0 0 1 7.5 10.5z" fill={O} />
    </>
  ),
  line: <path d="M3 18l5-6 4 3 5-8 4 4" stroke={B} strokeWidth="2" fill="none" />,
  link: (
    <>
      <path d="M10 14l4-4" stroke={B} strokeWidth="1.8" />
      <path d="M8 12l-2 2a3 3 0 0 0 4 4l2-2M16 12l2-2a3 3 0 0 0-4-4l-2 2" stroke={B} strokeWidth="1.8" fill="none" />
    </>
  ),
  comment: (
    <>
      <path d="M4 5h16v11H11l-4 4v-4H4z" fill="#fff" stroke={B} strokeWidth="1.5" />
      {lines([9, 12], [7, 7], [17, 14], B)}
    </>
  ),
  header: (
    <>
      <rect x="4" y="3" width="16" height="18" fill="#fff" stroke={G} />
      <rect x="4" y="3" width="16" height="5" fill="#cfe2f3" />
      {lines([12, 15, 18], [7, 7, 7], [17, 17, 13])}
    </>
  ),
  footer: (
    <>
      <rect x="4" y="3" width="16" height="18" fill="#fff" stroke={G} />
      <rect x="4" y="16" width="16" height="5" fill="#cfe2f3" />
      {lines([6, 9, 12], [7, 7, 7], [17, 17, 13])}
    </>
  ),
  pageNumber: (
    <>
      <rect x="4" y="3" width="16" height="18" fill="#fff" stroke={G} />
      <text x="12" y="19" textAnchor="middle" fontSize="7" fill={B} fontWeight="700">#</text>
    </>
  ),
  textbox: (
    <>
      <rect x="3" y="5" width="18" height="14" fill="#fff" stroke={G} strokeDasharray="2 1.5" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#222">A</text>
    </>
  ),
  wordart: <text x="12" y="17" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" stroke={B} strokeWidth="1">A</text>,
  dropcap: (
    <>
      <text x="3" y="14" fontSize="13" fontWeight="700" fill={B}>A</text>
      {lines([6, 10, 14, 18], [13, 13, 13, 3], [21, 21, 21, 21])}
    </>
  ),
  symbol: <text x="12" y="18" textAnchor="middle" fontSize="16" fill={B}>Ω</text>,
  equation: <text x="12" y="18" textAnchor="middle" fontSize="16" fill={B}>π</text>,
  date: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="1" fill="#fff" stroke={G} />
      <rect x="4" y="5" width="16" height="4" fill={R} />
      <text x="12" y="18" textAnchor="middle" fontSize="7" fill="#222">31</text>
    </>
  ),
  blankPage: <rect x="5" y="3" width="14" height="18" fill="#fff" stroke={G} strokeWidth="1.4" />,
  coverPage: (
    <>
      <rect x="5" y="3" width="14" height="18" fill="#fff" stroke={G} />
      <rect x="5" y="3" width="14" height="8" fill="#5b9bd5" />
    </>
  ),
  pageBreak: (
    <>
      <rect x="5" y="2" width="14" height="8" fill="#fff" stroke={G} />
      <rect x="5" y="14" width="14" height="8" fill="#fff" stroke={G} />
      <line x1="2" y1="12" x2="22" y2="12" stroke={B} strokeDasharray="2 2" />
    </>
  ),
  margins: (
    <>
      <rect x="4" y="3" width="16" height="18" fill="#fff" stroke={G} />
      <rect x="7" y="6" width="10" height="12" fill="none" stroke={B} strokeDasharray="2 1.5" />
    </>
  ),
  orientation: (
    <>
      <rect x="3" y="7" width="14" height="10" fill="#fff" stroke={G} />
      <rect x="10" y="4" width="10" height="16" fill="#fff" stroke={B} />
    </>
  ),
  size: (
    <>
      <rect x="5" y="3" width="14" height="18" fill="#fff" stroke={G} />
      <path d="M8 18l8-12M14 6h2v2" stroke={B} strokeWidth="1.3" fill="none" />
    </>
  ),
  columns: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={G} />
      {lines([7, 10, 13, 16], [5, 5, 5, 5], [11, 11, 11, 11])}
      {lines([7, 10, 13, 16], [13, 13, 13, 13], [19, 19, 19, 19])}
    </>
  ),
  breaks: (
    <>
      <rect x="5" y="3" width="14" height="7" fill="#fff" stroke={G} />
      <rect x="5" y="14" width="14" height="7" fill="#fff" stroke={G} />
      <path d="M3 12h4M10 12h4M17 12h4" stroke={B} />
    </>
  ),
  hyphenation: <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#222">bc-</text>,
  watermark: (
    <>
      <rect x="5" y="3" width="14" height="18" fill="#fff" stroke={G} />
      <text x="12" y="15" textAnchor="middle" fontSize="6" fill="#aaa" transform="rotate(-35 12 12)">DRAFT</text>
    </>
  ),
  pageColor: (
    <>
      <rect x="5" y="3" width="14" height="18" fill="#fde9d9" stroke={G} />
    </>
  ),
  pageBorders: <rect x="4" y="3" width="16" height="18" fill="#fff" stroke={B} strokeWidth="2.2" />,
  themes: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" fill="#fff" stroke={G} />
      <text x="8" y="15" fontSize="9" fill="#222">Aa</text>
      <rect x="15" y="7" width="4" height="3" fill={B} />
      <rect x="15" y="11" width="4" height="3" fill={O} />
      <rect x="15" y="15" width="4" height="3" fill={GR} />
    </>
  ),
  colors: (
    <>
      <rect x="3" y="6" width="5" height="12" fill={B} />
      <rect x="9.5" y="6" width="5" height="12" fill={O} />
      <rect x="16" y="6" width="5" height="12" fill={GR} />
    </>
  ),
  fonts: <text x="12" y="17" textAnchor="middle" fontSize="13" fill="#222" fontFamily="Georgia">Aa</text>,
  effects: <circle cx="12" cy="12" r="7" fill="#9dc3e6" stroke={B} />,
  spacing: (
    <>
      {lines([5, 19], [4, 4], [20, 20], B)}
      {lines([10, 14], [7, 7], [17, 17])}
    </>
  ),
  toc: (
    <>
      <rect x="4" y="3" width="16" height="18" fill="#fff" stroke={G} />
      {lines([7, 11, 15, 19], [7, 9, 9, 7], [17, 17, 17, 17], B)}
    </>
  ),
  footnote: <text x="12" y="17" textAnchor="middle" fontSize="11" fill="#222">ab¹</text>,
  citation: <text x="12" y="17" textAnchor="middle" fontSize="13" fill={B}>“ ”</text>,
  caption: (
    <>
      <rect x="4" y="3" width="16" height="11" fill="#e8f1fb" stroke={B} />
      {lines([18], [6], [18])}
    </>
  ),
  mailMerge: (
    <>
      <rect x="3" y="6" width="18" height="12" fill="#fff" stroke={B} strokeWidth="1.4" />
      <path d="M3 6l9 7 9-7" stroke={B} strokeWidth="1.4" fill="none" />
    </>
  ),
  envelope: (
    <>
      <rect x="3" y="6" width="18" height="12" fill="#fff" stroke={G} strokeWidth="1.4" />
      <path d="M3 6l9 7 9-7" stroke={G} strokeWidth="1.4" fill="none" />
    </>
  ),
  recipients: (
    <>
      <circle cx="9" cy="9" r="3" fill={B} />
      <circle cx="16" cy="10" r="2.5" fill="#9dc3e6" />
      <path d="M3 20c1-4 3-6 6-6s5 2 6 6M13 20c1-3 2-5 4-5s3 2 4 5" fill="#cfe2f3" stroke={B} />
    </>
  ),
  field: <text x="12" y="16" textAnchor="middle" fontSize="9" fill={B} fontWeight="700">«»</text>,
  spelling: (
    <>
      <text x="3" y="13" fontSize="10" fill="#222" fontWeight="700">ABC</text>
      <path d="M6 18l3 3 7-7" stroke={GR} strokeWidth="2" fill="none" />
    </>
  ),
  thesaurus: (
    <>
      <rect x="5" y="3" width="13" height="18" rx="1" fill="#cfe2f3" stroke={B} />
      <line x1="8" y1="3" x2="8" y2="21" stroke={B} />
    </>
  ),
  wordCount: <text x="12" y="16" textAnchor="middle" fontSize="9" fill="#222" fontWeight="700">123</text>,
  readAloud: (
    <>
      <path d="M4 10h4l5-4v12l-5-4H4z" fill={B} />
      <path d="M16 8c2 2 2 6 0 8M18 6c3 3 3 9 0 12" stroke={B} strokeWidth="1.4" fill="none" />
    </>
  ),
  trackChanges: (
    <>
      <rect x="4" y="3" width="13" height="18" fill="#fff" stroke={G} />
      <path d="M12 20l8-8 2 2-8 8h-2z" fill={Y} stroke={G} />
      {lines([8, 11], [7, 7], [14, 12], R)}
    </>
  ),
  accept: (
    <>
      <rect x="4" y="3" width="14" height="18" fill="#fff" stroke={G} />
      <path d="M8 13l3 3 6-7" stroke={GR} strokeWidth="2.2" fill="none" />
    </>
  ),
  reject: (
    <>
      <rect x="4" y="3" width="14" height="18" fill="#fff" stroke={G} />
      <path d="M8 9l7 7M15 9l-7 7" stroke={R} strokeWidth="2.2" />
    </>
  ),
  compare: (
    <>
      <rect x="2" y="5" width="9" height="14" fill="#fff" stroke={G} />
      <rect x="13" y="5" width="9" height="14" fill="#fff" stroke={B} />
    </>
  ),
  protect: (
    <>
      <rect x="6" y="10" width="12" height="10" rx="1.5" fill={Y} stroke={G} />
      <path d="M8.5 10V7a3.5 3.5 0 0 1 7 0v3" stroke={G} strokeWidth="1.6" fill="none" />
    </>
  ),
  readMode: (
    <>
      <path d="M3 5c3-1 6-1 9 1v14c-3-2-6-2-9-1z" fill="#fff" stroke={B} />
      <path d="M21 5c-3-1-6-1-9 1v14c3-2 6-2 9-1z" fill="#fff" stroke={B} />
    </>
  ),
  printLayout: (
    <>
      <rect x="5" y="3" width="14" height="18" fill="#fff" stroke={B} strokeWidth="1.4" />
      {lines([8, 11, 14], [8, 8, 8], [16, 16, 13])}
    </>
  ),
  webLayout: (
    <>
      <circle cx="12" cy="12" r="8" fill="#fff" stroke={B} strokeWidth="1.4" />
      <path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16" stroke={B} fill="none" />
    </>
  ),
  outline: <>{lines([6, 10, 14, 18], [4, 8, 8, 4], [20, 20, 20, 20])}</>,
  ruler: (
    <>
      <rect x="2" y="8" width="20" height="8" fill="#fff" stroke={G} />
      <path d="M5 8v3M8 8v4M11 8v3M14 8v4M17 8v3M20 8v4" stroke={G} />
    </>
  ),
  gridlines: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={G} />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="#bbb" />
    </>
  ),
  navPane: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={G} />
      <rect x="3" y="3" width="6" height="18" fill="#cfe2f3" />
    </>
  ),
  zoom: (
    <>
      <circle cx="10" cy="10" r="6" fill="#fff" stroke={B} strokeWidth="1.8" />
      <path d="M14.5 14.5L20 20" stroke={B} strokeWidth="2.2" />
      <path d="M7 10h6M10 7v6" stroke={B} strokeWidth="1.6" />
    </>
  ),
  onePage: <rect x="7" y="3" width="10" height="18" fill="#fff" stroke={G} strokeWidth="1.4" />,
  multiplePages: (
    <>
      <rect x="2" y="4" width="9" height="16" fill="#fff" stroke={G} />
      <rect x="13" y="4" width="9" height="16" fill="#fff" stroke={G} />
    </>
  ),
  pageWidth: (
    <>
      <rect x="3" y="4" width="18" height="16" fill="#fff" stroke={G} />
      <path d="M5 12h14M5 12l3-2M5 12l3 2M19 12l-3-2M19 12l-3 2" stroke={B} fill="none" />
    </>
  ),
  newWindow: (
    <>
      <rect x="3" y="5" width="13" height="11" fill="#fff" stroke={G} />
      <rect x="8" y="9" width="13" height="11" fill="#fff" stroke={B} />
    </>
  ),
  split: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={G} />
      <line x1="3" y1="12" x2="21" y2="12" stroke={B} strokeWidth="2" />
    </>
  ),
  macros: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" fill="#fff" stroke={G} />
      <circle cx="12" cy="12" r="3" fill={R} />
    </>
  ),
  save: (
    <>
      <path d="M4 4h13l3 3v13H4z" fill="#fff" stroke="#fff" strokeWidth="1.5" />
      <rect x="7" y="4" width="8" height="5" fill="currentColor" />
      <rect x="7" y="13" width="10" height="7" fill="currentColor" />
    </>
  ),
  undo: <path d="M8 6L4 10l4 4M4 10h10a5 5 0 0 1 0 10h-3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />,
  redo: <path d="M16 6l4 4-4 4M20 10H10a5 5 0 0 0 0 10h3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />,
  print: (
    <>
      <rect x="7" y="3" width="10" height="6" fill="#fff" stroke={G} />
      <rect x="3" y="9" width="18" height="8" rx="1.5" fill="#d0d0d0" stroke={G} />
      <rect x="7" y="14" width="10" height="7" fill="#fff" stroke={G} />
    </>
  ),
  share: (
    <>
      <circle cx="17" cy="5" r="2.5" fill={B} />
      <circle cx="17" cy="19" r="2.5" fill={B} />
      <circle cx="6" cy="12" r="2.5" fill={B} />
      <path d="M8 11l7-5M8 13l7 5" stroke={B} strokeWidth="1.5" />
    </>
  ),
  pdf: (
    <>
      <path d="M5 3h10l4 4v14H5z" fill="#fff" stroke={G} />
      <rect x="3" y="11" width="14" height="7" rx="1" fill={R} />
      <text x="10" y="16.5" textAnchor="middle" fontSize="5.5" fill="#fff" fontWeight="700">PDF</text>
    </>
  ),
  folder: <path d="M3 6h7l2 2h9v11H3z" fill="#f8d775" stroke="#c9a227" />,
  cloud: <path d="M7 18h11a4 4 0 0 0 0-8 6 6 0 0 0-11-1 4.5 4.5 0 0 0 0 9z" fill="#2b88d8" />,
  pc: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1" fill="#cfe2f3" stroke={G} />
      <path d="M9 20h6M12 16v4" stroke={G} strokeWidth="1.6" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke={B} strokeWidth="1.6" />
      <path d="M12 10v7M12 7v.5" stroke={B} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="5" r="2" fill={B} />
      <path d="M5 9h14M12 9v6M12 15l-4 6M12 15l4 6" stroke={B} strokeWidth="1.8" fill="none" />
    </>
  ),
  dictate: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" fill={B} />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v4" stroke={B} strokeWidth="1.6" fill="none" />
    </>
  ),
  editor: (
    <>
      <path d="M4 18l10-10 3 3-10 10H4z" fill="#fff" stroke={B} strokeWidth="1.4" />
      <path d="M15 5l2-2 4 4-2 2" fill={B} />
    </>
  ),
  translate: (
    <>
      <text x="3" y="11" fontSize="8" fill={B} fontWeight="700">A</text>
      <text x="13" y="20" fontSize="8" fill={O} fontWeight="700">文</text>
      <path d="M10 6h5v5" stroke={G} fill="none" />
    </>
  ),
  smartLookup: (
    <>
      <circle cx="10" cy="10" r="6" fill="#fff" stroke={B} strokeWidth="1.8" />
      <path d="M14.5 14.5L20 20" stroke={B} strokeWidth="2.2" />
      <text x="10" y="13" textAnchor="middle" fontSize="7" fill={B} fontWeight="700">i</text>
    </>
  ),
  researcher: (
    <>
      <rect x="4" y="3" width="13" height="17" fill="#fff" stroke={G} />
      <circle cx="15" cy="14" r="4" fill="#fff" stroke={B} strokeWidth="1.6" />
      <path d="M18 17l3 3" stroke={B} strokeWidth="2" />
    </>
  ),
  sum: <text x="12" y="19" textAnchor="middle" fontSize="18" fill="#222">Σ</text>,
  fx: <text x="12" y="17" textAnchor="middle" fontSize="13" fontStyle="italic" fill="#222" fontFamily="Georgia">fx</text>,
  fillDown: (
    <>
      <rect x="6" y="3" width="12" height="18" fill="#fff" stroke={G} />
      <path d="M12 6v10M8 13l4 4 4-4" stroke={B} strokeWidth="1.8" fill="none" />
    </>
  ),
  clear: (
    <>
      <path d="M5 16l8-10 6 5-6 8H8z" fill="#f4b6c2" stroke={G} />
      <line x1="4" y1="20" x2="20" y2="20" stroke={G} />
    </>
  ),
  merge: (
    <>
      <rect x="3" y="7" width="18" height="10" fill="#fff" stroke={G} />
      <path d="M7 12h10M7 12l2-2M7 12l2 2M17 12l-2-2M17 12l-2 2" stroke={B} fill="none" />
    </>
  ),
  wrap: (
    <>
      {lines([6, 12, 18], [4, 4, 4], [20, 16, 12])}
      <path d="M16 12h3a2 2 0 0 1 0 4h-5l2-2M14 16l2 2" stroke={B} strokeWidth="1.4" fill="none" />
    </>
  ),
  currency: <text x="12" y="17" textAnchor="middle" fontSize="13" fill={GR} fontWeight="700">$</text>,
  percent: <text x="12" y="17" textAnchor="middle" fontSize="13" fill="#222" fontWeight="700">%</text>,
  comma: <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#222" fontWeight="700">,9</text>,
  decInc: <text x="12" y="16" textAnchor="middle" fontSize="8" fill="#222">.0→.00</text>,
  decDec: <text x="12" y="16" textAnchor="middle" fontSize="8" fill="#222">.00→.0</text>,
  condFormat: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={G} />
      <rect x="5" y="5" width="6" height="4" fill="#f8696b" />
      <rect x="5" y="11" width="10" height="4" fill="#ffeb84" />
      <rect x="5" y="17" width="14" height="3" fill="#63be7b" />
    </>
  ),
  formatTable: (
    <>
      <rect x="3" y="4" width="18" height="16" fill="#fff" stroke={GR} />
      <rect x="3" y="4" width="18" height="4" fill={GR} />
      <rect x="3" y="12" width="18" height="4" fill="#c6e0b4" />
    </>
  ),
  cellStyles: (
    <>
      <rect x="3" y="6" width="18" height="12" fill="#ffeb9c" stroke="#9c6500" />
    </>
  ),
  insertCells: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={G} />
      <path d="M12 8v8M8 12h8" stroke={GR} strokeWidth="2.2" />
    </>
  ),
  deleteCells: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={G} />
      <path d="M8 8l8 8M16 8l-8 8" stroke={R} strokeWidth="2.2" />
    </>
  ),
  format: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={G} />
      <path d="M3 9h18M9 3v18" stroke={G} />
      <path d="M13 13l6 6" stroke={B} strokeWidth="2" />
    </>
  ),
  filter: <path d="M3 4h18l-7 8v7l-4 2v-9z" fill="#fff" stroke={B} strokeWidth="1.6" />,
  freeze: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={G} />
      <rect x="3" y="3" width="18" height="5" fill="#cfe2f3" />
      <rect x="3" y="3" width="5" height="18" fill="#cfe2f3" />
    </>
  ),
  pivot: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={GR} />
      <rect x="3" y="3" width="18" height="5" fill="#c6e0b4" />
      <rect x="3" y="3" width="6" height="18" fill="#c6e0b4" />
      <path d="M13 12l4 0-1.5-1.5M17 12l-1.5 1.5" stroke={GR} fill="none" />
    </>
  ),
  recommendedCharts: (
    <>
      <rect x="4" y="12" width="4" height="8" fill={B} />
      <rect x="10" y="7" width="4" height="13" fill={O} />
      <path d="M17 4l1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L14 6.3l2-.3z" fill={Y} />
    </>
  ),
  whatIf: <text x="12" y="17" textAnchor="middle" fontSize="12" fill={B} fontWeight="700">?=</text>,
  removeDup: (
    <>
      <rect x="3" y="4" width="18" height="16" fill="#fff" stroke={G} />
      <path d="M3 12h18M10 4v16" stroke={G} />
      <path d="M13 14l6 4M19 14l-6 4" stroke={R} strokeWidth="1.6" />
    </>
  ),
  textToColumns: (
    <>
      <rect x="3" y="5" width="8" height="14" fill="#fff" stroke={G} />
      <rect x="13" y="5" width="8" height="14" fill="#fff" stroke={B} />
      <path d="M11 12h2" stroke={B} />
    </>
  ),
  validation: (
    <>
      <rect x="3" y="5" width="18" height="14" fill="#fff" stroke={G} />
      <path d="M7 12l3 3 7-7" stroke={GR} strokeWidth="2" fill="none" />
    </>
  ),
  group: (
    <>
      <path d="M5 4v16M5 4h3M5 20h3" stroke={G} strokeWidth="1.6" fill="none" />
      {lines([8, 12, 16], [10, 10, 10], [20, 20, 20])}
    </>
  ),
  subtotal: <text x="12" y="17" textAnchor="middle" fontSize="11" fill={B} fontWeight="700">Σ+</text>,
  sheet: (
    <>
      <rect x="3" y="3" width="18" height="18" fill="#fff" stroke={GR} />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke={GR} strokeWidth=".8" />
    </>
  ),
  newSlide: (
    <>
      <rect x="3" y="5" width="18" height="12" fill="#fff" stroke={O} strokeWidth="1.4" />
      <rect x="6" y="8" width="12" height="2.5" fill="#f4b183" />
      <path d="M17 17v5M14.5 19.5h5" stroke={GR} strokeWidth="1.8" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="5" width="18" height="14" fill="#fff" stroke={G} />
      <rect x="5" y="7" width="14" height="3" fill="#f4b183" />
      <rect x="5" y="12" width="6" height="5" fill="#ddd" />
      <rect x="13" y="12" width="6" height="5" fill="#ddd" />
    </>
  ),
  reset: <path d="M6 8a7 7 0 1 1-1 7M6 3v5h5" stroke={B} strokeWidth="1.8" fill="none" />,
  section: (
    <>
      <rect x="3" y="4" width="18" height="5" fill="#f4b183" />
      <rect x="3" y="11" width="18" height="4" fill="#fff" stroke={G} />
      <rect x="3" y="17" width="18" height="4" fill="#fff" stroke={G} />
    </>
  ),
  transition: (
    <>
      <rect x="2" y="6" width="11" height="12" fill="#fff" stroke={G} />
      <rect x="11" y="6" width="11" height="12" fill="#f4b183" stroke={O} />
    </>
  ),
  animation: (
    <>
      <path d="M4 12h8" stroke={G} strokeDasharray="2 2" />
      <path d="M14 7l6 5-6 5z" fill={Y} stroke={O} />
    </>
  ),
  preview: <path d="M7 5l12 7-12 7z" fill={GR} />,
  slideShow: (
    <>
      <rect x="3" y="4" width="18" height="12" fill="#fff" stroke={O} strokeWidth="1.4" />
      <path d="M10 7l5 3-5 3z" fill={O} />
      <path d="M12 16v4M8 21l4-1 4 1" stroke={G} />
    </>
  ),
  presenter: (
    <>
      <rect x="2" y="4" width="13" height="10" fill="#fff" stroke={O} />
      <rect x="15" y="8" width="7" height="6" fill="#fff" stroke={G} />
      <path d="M6 18h10" stroke={G} />
    </>
  ),
  rehearse: (
    <>
      <circle cx="12" cy="13" r="7" fill="#fff" stroke={B} strokeWidth="1.6" />
      <path d="M12 9v4l3 2M10 3h4" stroke={B} strokeWidth="1.6" fill="none" />
    </>
  ),
  notes: (
    <>
      <rect x="4" y="3" width="16" height="18" fill="#fff" stroke={G} />
      <rect x="6" y="5" width="12" height="7" fill="#f4b183" />
      {lines([15, 18], [6, 6], [18, 15])}
    </>
  ),
  sorter: (
    <>
      <rect x="3" y="4" width="8" height="6" fill="#fff" stroke={O} />
      <rect x="13" y="4" width="8" height="6" fill="#fff" stroke={O} />
      <rect x="3" y="14" width="8" height="6" fill="#fff" stroke={O} />
      <rect x="13" y="14" width="8" height="6" fill="#fff" stroke={O} />
    </>
  ),
  normalView: (
    <>
      <rect x="3" y="4" width="18" height="16" fill="#fff" stroke={G} />
      <rect x="3" y="4" width="5" height="16" fill="#eee" />
    </>
  ),
  master: (
    <>
      <rect x="3" y="3" width="18" height="13" fill="#fff" stroke={O} strokeWidth="1.4" />
      <rect x="6" y="18" width="5" height="3" fill="#f4b183" />
      <rect x="13" y="18" width="5" height="3" fill="#f4b183" />
    </>
  ),
  designer: (
    <>
      <rect x="3" y="5" width="18" height="14" fill="#fff" stroke={O} />
      <path d="M15 4l1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L12 6.3l2-.3z" fill={Y} />
      <rect x="6" y="11" width="8" height="5" fill="#f4b183" />
    </>
  ),
  slideSize: (
    <>
      <rect x="2" y="6" width="20" height="12" fill="#fff" stroke={G} />
      <rect x="6" y="8" width="12" height="8" fill="none" stroke={O} strokeDasharray="2 1" />
    </>
  ),
  background: (
    <>
      <rect x="3" y="5" width="18" height="14" fill="#fde9d9" stroke={G} />
      <path d="M3 19l7-7 4 4 3-3 4 6z" fill="#f4b183" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="1.5" fill={O} />
      <path d="M16 10l5-3v10l-5-3z" fill={O} />
    </>
  ),
  audio: (
    <>
      <path d="M4 10h4l5-4v12l-5-4H4z" fill={O} />
      <path d="M16 9c1.5 1.5 1.5 4.5 0 6M18.5 7c2.5 2.5 2.5 7.5 0 10" stroke={O} strokeWidth="1.4" fill="none" />
    </>
  ),
  align: (
    <>
      <line x1="4" y1="3" x2="4" y2="21" stroke={B} strokeWidth="1.6" />
      <rect x="5" y="6" width="12" height="4" fill="#9dc3e6" />
      <rect x="5" y="14" width="8" height="4" fill="#9dc3e6" />
    </>
  ),
  bringForward: (
    <>
      <rect x="3" y="8" width="11" height="11" fill="#ddd" stroke={G} />
      <rect x="9" y="3" width="11" height="11" fill="#9dc3e6" stroke={B} />
    </>
  ),
  sendBackward: (
    <>
      <rect x="9" y="3" width="11" height="11" fill="#ddd" stroke={G} />
      <rect x="3" y="8" width="11" height="11" fill="#9dc3e6" stroke={B} />
    </>
  ),
  groupObjects: (
    <>
      <rect x="2" y="2" width="20" height="20" fill="none" stroke={G} strokeDasharray="2 2" />
      <rect x="5" y="5" width="7" height="7" fill="#9dc3e6" />
      <circle cx="16" cy="16" r="4" fill="#f4b183" />
    </>
  ),
  rotate: <path d="M17 7a7 7 0 1 0 2 5M17 3v4h-4" stroke={B} strokeWidth="1.8" fill="none" />,
  crop: <path d="M7 3v14h14M3 7h14v14" stroke="#222" strokeWidth="1.8" fill="none" />,
  pictureStyles: (
    <>
      <rect x="3" y="5" width="18" height="14" fill="#fff" stroke={G} strokeWidth="2" />
      <rect x="6" y="8" width="12" height="8" fill="#9dc3e6" />
    </>
  ),
  removeBg: (
    <>
      <rect x="3" y="5" width="18" height="14" fill="#f4b6c2" stroke={G} />
      <circle cx="12" cy="12" r="4" fill="#9dc3e6" />
    </>
  ),
  corrections: (
    <>
      <circle cx="12" cy="12" r="8" fill="#fff" stroke={G} />
      <path d="M12 4a8 8 0 0 1 0 16z" fill="#222" />
    </>
  ),
  altText: <text x="12" y="16" textAnchor="middle" fontSize="9" fill={B} fontWeight="700">ALT</text>,
  wrapText: (
    <>
      <rect x="8" y="8" width="8" height="8" fill="#9dc3e6" />
      {lines([4, 20], [3, 3], [21, 21])}
      {lines([10, 14], [3, 3], [6, 6])}
      {lines([10, 14], [18, 18], [21, 21])}
    </>
  ),
  position: (
    <>
      <rect x="4" y="3" width="16" height="18" fill="#fff" stroke={G} />
      <rect x="13" y="5" width="5" height="5" fill="#9dc3e6" />
    </>
  ),
  addIns: (
    <>
      <rect x="4" y="4" width="7" height="7" fill={B} />
      <rect x="13" y="4" width="7" height="7" fill="#9dc3e6" />
      <rect x="4" y="13" width="7" height="7" fill="#9dc3e6" />
      <path d="M16.5 13v7M13 16.5h7" stroke={GR} strokeWidth="2" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke={B} strokeWidth="1.6" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="12" fill={B} fontWeight="700">?</text>
    </>
  ),
  dialogLauncher: <path d="M6 6h6M6 6v6M8 8l9 9M17 11v6h-6" stroke={G} strokeWidth="1.4" fill="none" />,
  more: <path d="M6 12h.01M12 12h.01M18 12h.01" stroke={G} strokeWidth="3" strokeLinecap="round" />,
  new: (
    <>
      <path d="M5 3h10l4 4v14H5z" fill="#fff" stroke={G} />
      <path d="M15 3v4h4" fill="none" stroke={G} />
    </>
  ),
  open: <path d="M3 7h7l2 2h9l-2 10H3z" fill="#f8d775" stroke="#c9a227" />,
  export: (
    <>
      <path d="M5 3h10l4 4v14H5z" fill="#fff" stroke={G} />
      <path d="M12 9v8M9 14l3 3 3-3" stroke={B} strokeWidth="1.6" fill="none" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" stroke={G} strokeWidth="2" />,
  options: (
    <>
      <circle cx="12" cy="12" r="3.5" fill="none" stroke={G} strokeWidth="1.8" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" stroke={G} strokeWidth="1.8" />
    </>
  ),
  home: <path d="M4 11l8-7 8 7v9h-5v-5H9v5H4z" fill="none" stroke={G} strokeWidth="1.6" />,
  history: <path d="M12 7v5l3 2M4 12a8 8 0 1 0 2-5.3M4 4v4h4" stroke={G} strokeWidth="1.6" fill="none" />,
  checkIssues: (
    <>
      <rect x="4" y="3" width="16" height="18" fill="#fff" stroke={G} />
      <path d="M8 12l3 3 5-6" stroke={GR} strokeWidth="1.8" fill="none" />
    </>
  ),
  pen: <path d="M4 20l3-1L19 7l-2-2L5 17z" fill={B} />,
  eraser: <path d="M4 17l7-9 7 6-5 6H8z" fill="#f4b6c2" stroke={G} />,
};

export function Icon({ name, size = 20 }: { name?: string; size?: number }) {
  const body = name ? ICONS[name] : undefined;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      {body ?? <rect x="4" y="4" width="16" height="16" rx="3" fill="#e5e7eb" stroke="#9ca3af" />}
    </svg>
  );
}

export const ICON_NAMES = Object.keys(ICONS);
