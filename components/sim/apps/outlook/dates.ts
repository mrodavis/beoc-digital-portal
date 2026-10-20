/** Naive local date math for the Outlook sim. All values are strings: "2026-10-20" or "2026-10-20T09:30". */

export const TODAY = "2026-10-20";
export const NOW = "2026-10-20T09:30";

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const pad = (n: number) => String(n).padStart(2, "0");

function parts(s: string): { y: number; m: number; d: number; h: number; mi: number } {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(s || TODAY);
  if (!m) return { y: 2026, m: 10, d: 20, h: 0, mi: 0 };
  return { y: +m[1], m: +m[2], d: +m[3], h: m[4] ? +m[4] : 0, mi: m[5] ? +m[5] : 0 };
}

export function toMs(s: string): number {
  const p = parts(s);
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi);
}

export function fromMs(ms: number, withTime = true): string {
  const d = new Date(ms);
  const date = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  return withTime ? `${date}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}` : date;
}

export const dateOf = (s: string) => (s || TODAY).slice(0, 10);
export const timeOf = (s: string) => (s && s.length > 10 ? s.slice(11, 16) : "00:00");
export const at = (date: string, time: string) => `${dateOf(date)}T${time}`;

export function addDays(s: string, n: number): string {
  return fromMs(toMs(dateOf(s)) + n * 86400000, false);
}
export function addMinutes(s: string, n: number): string {
  return fromMs(toMs(s) + n * 60000);
}
export function minutesBetween(a: string, b: string): number {
  return Math.round((toMs(b) - toMs(a)) / 60000);
}
export function dow(s: string): number {
  return new Date(toMs(dateOf(s))).getUTCDay();
}
export function weekStart(s: string): string {
  return addDays(s, -dow(s));
}
export function monthStart(s: string): string {
  return `${dateOf(s).slice(0, 8)}01`;
}
export function addMonths(s: string, n: number): string {
  const p = parts(s);
  const total = p.y * 12 + (p.m - 1) + n;
  const y = Math.floor(total / 12), m = (total % 12) + 1;
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return `${y}-${pad(m)}-${pad(Math.min(p.d, last))}`;
}
export function daysInMonth(s: string): number {
  const p = parts(s);
  return new Date(Date.UTC(p.y, p.m, 0)).getUTCDate();
}

/** 10/7/2026 */
export function fmtDate(s: string): string {
  const p = parts(s);
  return `${p.m}/${p.d}/${p.y}`;
}
/** Tue 10/27/2026 */
export function fmtDateDay(s: string): string {
  return `${DAY_SHORT[dow(s)]} ${fmtDate(s)}`;
}
/** 9:30 AM */
export function fmtTime(s: string): string {
  const p = parts(s);
  const h12 = p.h % 12 === 0 ? 12 : p.h % 12;
  return `${h12}:${pad(p.mi)} ${p.h < 12 ? "AM" : "PM"}`;
}
/** 9 AM (calendar hour labels) */
export function fmtHour(h: number): string {
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12} ${h < 12 ? "AM" : "PM"}`;
}
/** Tuesday, October 20, 2026 */
export function fmtLong(s: string): string {
  const p = parts(s);
  return `${DAY_NAMES[dow(s)]}, ${MONTHS[p.m - 1]} ${p.d}, ${p.y}`;
}
/** October 20 */
export function fmtMonthDay(s: string): string {
  const p = parts(s);
  return `${MONTHS[p.m - 1]} ${p.d}`;
}
export function fmtMonthYear(s: string): string {
  const p = parts(s);
  return `${MONTHS[p.m - 1]} ${p.y}`;
}

/** "10/27/2026", "Tue 10/27/2026", "2026-10-27" → "2026-10-27". */
export function parseUsDate(v: string): string | null {
  const t = String(v ?? "").trim();
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t);
  if (iso) return `${iso[1]}-${pad(+iso[2])}-${pad(+iso[3])}`;
  const m = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/.exec(t);
  if (!m) return null;
  const y = m[3].length === 2 ? 2000 + +m[3] : +m[3];
  if (+m[1] < 1 || +m[1] > 12 || +m[2] < 1 || +m[2] > 31) return null;
  return `${y}-${pad(+m[1])}-${pad(+m[2])}`;
}

/** "2:00 PM", "14:00", "2 pm" → "14:00". */
export function parseTime(v: string): string | null {
  const t = String(v ?? "").trim().toLowerCase();
  const m = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm|a|p)?$/.exec(t);
  if (!m) return null;
  let h = +m[1];
  const mi = m[2] ? +m[2] : 0;
  if (m[3]) {
    const pm = m[3].startsWith("p");
    if (h === 12) h = pm ? 12 : 0;
    else if (pm) h += 12;
  }
  if (h > 23 || mi > 59) return null;
  return `${pad(h)}:${pad(mi)}`;
}

/** Every half hour, "12:00 AM" … "11:30 PM". */
export const TIME_OPTIONS: string[] = Array.from({ length: 48 }, (_, i) => fmtTime(`2026-01-01T${pad(Math.floor(i / 2))}:${i % 2 ? "30" : "00"}`));

/** "15 minutes", "1 hour", "2 days" from a minute count. */
export function fmtDuration(min: number): string {
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"}`;
  if (min % 1440 === 0) return `${min / 1440} day${min === 1440 ? "" : "s"}`;
  if (min % 60 === 0) return `${min / 60} hour${min === 60 ? "" : "s"}`;
  return `${(min / 60).toFixed(1)} hours`;
}

/** Relative label for a message date in the list: "9:14 AM", "Mon 4:12 PM", "10/9/2026". */
export function fmtListDate(s: string, today = TODAY): string {
  const d = dateOf(s);
  if (d === today) return fmtTime(s);
  const diff = Math.round((toMs(today) - toMs(d)) / 86400000);
  if (diff > 0 && diff < 7) return `${DAY_SHORT[dow(d)]} ${fmtTime(s)}`;
  return fmtDate(d);
}

/** Message list group header. */
export function dateGroup(s: string, today = TODAY): string {
  const d = dateOf(s);
  const diff = Math.round((toMs(today) - toMs(d)) / 86400000);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  const thisWeek = weekStart(today);
  if (d >= thisWeek) return DAY_NAMES[dow(d)];
  if (d >= addDays(thisWeek, -7)) return "Last Week";
  if (d >= addDays(thisWeek, -14)) return "Two Weeks Ago";
  if (d >= addDays(thisWeek, -21)) return "Three Weeks Ago";
  return "Older";
}

/** Outlook's Quick Click flag dates. */
export function flagDates(label: string, today = TODAY): { start?: string; due?: string } {
  const fri = addDays(today, 5 - dow(today) < 0 ? 5 - dow(today) + 7 : 5 - dow(today));
  switch (label) {
    case "Today":
      return { start: today, due: today };
    case "Tomorrow":
      return { start: addDays(today, 1), due: addDays(today, 1) };
    case "This Week": {
      const s = addDays(today, 2) > fri ? fri : addDays(today, 2);
      return { start: s, due: fri };
    }
    case "Next Week": {
      const mon = addDays(weekStart(today), 8);
      return { start: mon, due: addDays(mon, 4) };
    }
    default:
      return {};
  }
}
